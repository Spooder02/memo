import jwt
from functools import wraps
from datetime import datetime, timedelta
from flask import Flask, jsonify, request
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash

# --- 앱 초기화, CORS, 시크릿 키 설정 ---
app = Flask(__name__)
app.config['SECRET_KEY'] = 'your-very-secret-key-for-jwt'
CORS(app, resources={r"*": {"origins": "*"}}, supports_credentials=True, allow_headers=["Content-Type", "Authorization"])


# --- Mock Database ---
USERS = {
    "mimo": {"id": "mimo", "nickname": "미모", "password": generate_password_hash("password123"), "birthday": "2025-05-20", "profileImg": "images/testProfile.png", "phoneNumber": "010-1234-5678"},
    "user2": {"id": "user2", "nickname": "동료A", "password": generate_password_hash("password123"), "birthday": "1998-10-10", "profileImg": "images/groupicon.png", "phoneNumber": "010-1111-2222"},
}

TEAMS = {
    "team-likelion": {"id": "team-likelion", "teamImage": "/src/assets/images/likelionsch_logo.png", "teamName": "멋쟁이사자처럼 13기", "teamDesc": "순천향대학교 중앙 IT 창업동아리", "teamScale": 36, "teammates": ["mimo", "user2"]},
}

USER_AVAILABILITY = {
    "mimo": {
        "2025-09-25": {
            "times": [540, 555, 570],
            "details": {"priority": "선호", "availableChannel": "온라인"}
        },
        "2025-10-25": {
            "times": [1080, 1095, 1110],
            "details": {"priority": "보통", "availableChannel": "오프라인"}
        }
    }
}

MEETINGS = {
    "mt-123": {"meetingId": "mt-123", "teamId": "team-likelion", "meetingName": "10월 정기 전체 회의", "status": "CONFIRMING", "proposals": [{"userId": "mimo", "times": [540, 780]}]},
    "mt-789": {"meetingId": "mt-789", "teamId": "team-likelion", "meetingName": "프로젝트 중간 발표", "status": "CONFIRMED", "dayLeft": "2025-09-29T14:00:00Z", "color": "#B5DBFF", "teamScale": 2, "participants": ["mimo", "user2"]},
}

# --- JWT 인증 데코레이터 ---
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split(" ")[1]
        if not token:
            return jsonify({'message': 'Token is missing!'}), 401
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
            current_user = USERS.get(data['user_id'])
            if not current_user:
                 return jsonify({'message': 'User not found!'}), 401
        except:
            return jsonify({'message': 'Token is invalid!'}), 401
        return f(current_user, *args, **kwargs)
    return decorated

# --- API Endpoints ---
@app.route("/login", methods=["POST"])
def login():
    auth = request.get_json()
    if not auth or not auth.get('id') or not auth.get('password'):
        return jsonify({'message': 'Could not verify'}), 401

    user = USERS.get(auth['id'])
    if not user or not check_password_hash(user['password'], auth['password']):
        return jsonify({'message': 'Could not verify'}), 401
    
    token = jwt.encode({
        'user_id': user['id'],
        'exp': datetime.utcnow() + timedelta(hours=24)
    }, app.config['SECRET_KEY'], algorithm="HS256")
    
    return jsonify({'token': token})

@app.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    if not data or not data.get('id') or not data.get('password') or not data.get('nickname'):
        return jsonify({'message': '필수 정보가 누락되었습니다.'}), 400
    
    # 아이디 및 닉네임 중복 확인
    if data['id'] in USERS:
        return jsonify({'message': '이미 존재하는 아이디입니다.'}), 409 # 409 Conflict
    
    existing_nicknames = [user['nickname'] for user in USERS.values()]
    if data['nickname'] in existing_nicknames:
        return jsonify({'message': '이미 존재하는 닉네임입니다.'}), 409

    hashed_password = generate_password_hash(data['password'], method='pbkdf2:sha256')
    new_user = {
        "id": data['id'],
        "nickname": data['nickname'],
        "password": hashed_password,
        "birthday": "",
        "profileImg": "",
        "phoneNumber": ""
    }
    USERS[data['id']] = new_user

    return jsonify({'message': '회원가입이 성공적으로 완료되었습니다.'}), 201 # 201 Created


@app.route("/profile", methods=["GET"])
@token_required
def get_profile(current_user):
    return jsonify(current_user)

@app.route("/teams", methods=["GET"])
@token_required
def get_my_teams(current_user):
    my_teams = [team for team in TEAMS.values() if current_user["id"] in team["teammates"]]
    return jsonify(my_teams)

@app.route("/availability", methods=["POST"])
@token_required
def save_availability(current_user):
    availability_data = request.get_json()
    USER_AVAILABILITY[current_user["id"]] = availability_data
    return jsonify({"message": "Availability saved!"})

@app.route("/meetings", methods=["POST"])
@token_required
def create_meeting(current_user):
    data = request.get_json()
    # ... (데이터 검증)
    new_meeting_id = f"mt-{datetime.now().timestamp()}"
    new_meeting = {
        "meetingId": new_meeting_id,
        "teamId": data["teamId"],
        "meetingName": data["meetingName"],
        "status": "PROPOSING",
        "proposals": [],
        "creator": current_user["id"],
        "participants": data["memberIds"]
    }
    MEETINGS[new_meeting_id] = new_meeting
    return jsonify({"message": "Meeting created!", "meeting": new_meeting}), 201

@app.route("/meetings/<meeting_id>/proposals", methods=["POST"])
@token_required
def submit_proposal(current_user, meeting_id):
    meeting = MEETINGS.get(meeting_id)
    if not meeting:
        return jsonify({"message": "Meeting not found"}), 404
    if current_user["id"] not in meeting["participants"]:
        return jsonify({"message": "Not a participant"}), 403
    
    proposal = request.get_json() # { "availability": [...] }
    # ... (데이터 검증)
    
    # 이미 제출했는지 확인 후 업데이트 또는 추가
    existing_proposal = next((p for p in meeting["proposals"] if p["userId"] == current_user["id"]), None)
    if existing_proposal:
        existing_proposal["times"] = proposal["availability"]
    else:
        meeting["proposals"].append({"userId": current_user["id"], "times": proposal["availability"]})

    # 모든 참여자가 제출했는지 확인
    if len(meeting["proposals"]) == len(meeting["participants"]):
        meeting["status"] = "CONFIRMING"

    return jsonify({"message": "Proposal submitted successfully"})

# 확정된 미팅 조회 엔드포인트
@app.route("/meetings/confirmed", methods=["GET"])
@token_required
def get_confirmed_meetings(current_user):
    # 'participants' 키가 없는 경우를 대비하여 .get() 사용
    confirmed_meetings = [
        meeting for meeting in MEETINGS.values() 
        if meeting.get('status') == 'CONFIRMED' and current_user['id'] in meeting.get('participants', [])
    ]
    return jsonify(confirmed_meetings)

@app.route("/availability", methods=["GET", "POST"])
@token_required
def handle_availability(current_user):
    user_id = current_user["id"]

    if request.method == "POST":
        # 클라이언트가 보낸 전체 availability 객체로 데이터를 덮어씀
        new_availability = request.get_json()
        USER_AVAILABILITY[user_id] = new_availability
        print(f"Updated availability for {user_id}: {USER_AVAILABILITY[user_id]}")
        return jsonify({"message": "Availability updated successfully"})
    
    # GET 요청: 저장된 사용자의 availability 객체를 반환 (없으면 빈 객체)
    return jsonify(USER_AVAILABILITY.get(user_id, {}))

# ... (다른 엔드포인트: 확정, 목록 조회 등)

# --- 서버 실행 ---
if __name__ == '__main__':
    app.run(debug=True, port=5001)