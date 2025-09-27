import os
import jwt
from functools import wraps
from datetime import datetime, timedelta, date
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

# --- 1. 기본 설정 ---
app = Flask(__name__)
CORS(app, resources={r"*": {"origins": "*"}}, supports_credentials=True, allow_headers=["Content-Type", "Authorization"])
app.config['SECRET_KEY'] = 'your-very-secret-key-for-jwt-!@#$'

basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'database.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


# --- 2. 데이터베이스 모델 정의 ---
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    nickname = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(256), nullable=False)
    profile_img = db.Column(db.String(200), nullable=False, default='https://placehold.co/100x100')


class Team(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(200))
    image = db.Column(db.String(200), nullable=False, default='https://placehold.co/100x100/3287FF/FFFFFF?text=Team')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class TeamMember(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    team_id = db.Column(db.Integer, db.ForeignKey('team.id'), nullable=False)
    role = db.Column(db.String(50), nullable=False, default='Member')
    user = db.relationship('User', backref=db.backref('teams_associated', lazy=True))
    team = db.relationship('Team', backref=db.backref('members', lazy=True))

class UserAvailability(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    available_date = db.Column(db.Date, nullable=False)
    times = db.Column(db.JSON, nullable=False)
    priority = db.Column(db.String(50))

class Meeting(db.Model):
    id = db.Column(db.Integer, primary_key=True) # 이 id를 meetingId로 사용
    team_id = db.Column(db.Integer, db.ForeignKey('team.id'), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    status = db.Column(db.String(50))
    start_time = db.Column(db.DateTime)
    color = db.Column(db.String(20))
    proposals = db.Column(db.JSON)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class MeetingParticipant(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    meeting_id = db.Column(db.Integer, db.ForeignKey('meeting.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    status = db.Column(db.String(50), nullable=False, default='대기중')
    __table_args__ = (db.UniqueConstraint('meeting_id', 'user_id', name='_meeting_user_uc'),)



# --- 3. JWT 인증 데코레이터 ---
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
            current_user = User.query.filter_by(id=data['user_id']).first()
            if not current_user:
                 return jsonify({'message': 'User not found!'}), 401
        except Exception as e:
            return jsonify({'message': 'Token is invalid!', 'error': str(e)}), 401
        return f(current_user, *args, **kwargs)
    return decorated

# --- 4. API Endpoints ---

# --- 인증 API ---
@app.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    if User.query.filter_by(username=data['username']).first():
        return jsonify({'message': '이미 존재하는 아이디입니다.'}), 409
    if User.query.filter_by(nickname=data['nickname']).first():
        return jsonify({'message': '이미 존재하는 닉네임입니다.'}), 409

    hashed_password = generate_password_hash(data['password'], method='pbkdf2:sha256')
    new_user = User(username=data['username'], nickname=data['nickname'], password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': '회원가입이 완료되었습니다.'}), 201

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data['id']).first()
    if not user or not check_password_hash(user.password, data['password']):
        return jsonify({'message': '아이디 또는 비밀번호가 잘못되었습니다.'}), 401
    
    token = jwt.encode({
        'user_id': user.id,
        'exp': datetime.utcnow() + timedelta(days=1)
    }, app.config['SECRET_KEY'], algorithm="HS256")
    
    return jsonify({'token': token})

# --- 팀 관리 API ---
@app.route("/teams", methods=["GET"])
@token_required
def get_my_teams(current_user):
    user_teams_assoc = TeamMember.query.filter_by(user_id=current_user.id).all()
    teams = [Team.query.get(assoc.team_id) for assoc in user_teams_assoc]
    teams_data = [{
        "id": team.id,
        "teamName": team.name,
        "teamDesc": team.description,
        "teamImage": team.image,
        "teamScale": len(team.members),
        "teammates": [member.user.nickname for member in team.members]
    } for team in teams]
    return jsonify(teams_data)


@app.route("/teams", methods=["POST"])
@token_required
def create_team(current_user):
    data = request.get_json()
    if not data or not data.get('name'):
        return jsonify({'message': '팀 이름은 필수입니다.'}), 400

    # 1. 새로운 팀 생성
    new_team = Team(
        name=data['name'], 
        description=data.get('description', ''),
        image=data.get('image', '')
    )
    db.session.add(new_team)
    # DB에 먼저 커밋하여 new_team에 id를 할당받음
    db.session.commit()

    # 2. 팀을 생성한 사용자를 해당 팀의 'Admin'으로 자동 추가
    new_member = TeamMember(
        user_id=current_user.id, 
        team_id=new_team.id, 
        role='Admin'
    )
    db.session.add(new_member)
    db.session.commit()

    return jsonify({
        'message': '팀이 성공적으로 생성되었습니다.', 
        'team_id': new_team.id
    }), 201


@app.route("/teams/<int:team_id>/members", methods=["POST"])
@token_required
def add_team_member(current_user, team_id):
    # TODO: current_user가 해당 팀의 Admin인지 권한 검사 필요
    data = request.get_json()
    user_to_add = User.query.filter_by(nickname=data['nickname']).first()
    if not user_to_add:
        return jsonify({'message': '초대할 유저를 찾을 수 없습니다.'}), 404
    
    existing_member = TeamMember.query.filter_by(user_id=user_to_add.id, team_id=team_id).first()
    if existing_member:
        return jsonify({'message': '이미 팀에 속해있는 멤버입니다.'}), 409

    new_member = TeamMember(user_id=user_to_add.id, team_id=team_id)
    db.session.add(new_member)
    db.session.commit()
    return jsonify({'message': f"'{user_to_add.nickname}'님을 팀에 추가했습니다."})


@app.route("/teams/<int:team_id>/members/<int:user_id>", methods=["DELETE"])
@token_required
def remove_team_member(current_user, team_id, user_id):
    # TODO: 권한 검사 필요
    member_to_remove = TeamMember.query.filter_by(user_id=user_id, team_id=team_id).first()
    if not member_to_remove:
        return jsonify({'message': '팀원을 찾을 수 없습니다.'}), 404

    db.session.delete(member_to_remove)
    db.session.commit()
    return jsonify({'message': '팀에서 멤버를 삭제했습니다.'})


# 로그인 프로필 불러오기 API
@app.route("/profile", methods=["GET"])
@token_required
def get_profile(current_user):
    # --- profileImg 키 이름 수정 및 필드 접근 수정 ---
    user_data = {
        "id": current_user.id,
        "username": current_user.username,
        "nickname": current_user.nickname,
        "profileImg": current_user.profile_img 
    }
    return jsonify(user_data)

@app.route("/meetings/confirmed", methods=["GET"])
@token_required
def get_confirmed_meetings(current_user):
    # 1. 현재 유저가 참여하는 모든 미팅 ID를 찾음
    participant_entries = MeetingParticipant.query.filter_by(user_id=current_user.id).all()
    meeting_ids = [entry.meeting_id for entry in participant_entries]
    
    if not meeting_ids:
        return jsonify([])

    # 2. 해당 미팅들 중 확정 상태이고, 아직 지나지 않은 미팅만 필터링
    confirmed_meetings = Meeting.query.filter(
        Meeting.id.in_(meeting_ids), 
        Meeting.status == 'CONFIRMED',
        Meeting.start_time >= datetime.utcnow()
    ).order_by(Meeting.start_time).all()
    
    # 3. 프론트엔드 형식에 맞게 데이터 가공
    result = []
    for meeting in confirmed_meetings:
        team = Team.query.get(meeting.team_id)
        participants_count = MeetingParticipant.query.filter_by(meeting_id=meeting.id).count()
        result.append({
            "id": meeting.id,
            "meetingName": meeting.name,
            "teamName": team.name if team else "알 수 없는 팀",
            "teamScale": participants_count,
            "dayLeft": meeting.start_time.isoformat() + 'Z', # ISO 형식으로 변환
            "color": meeting.color or "#B5DBFF" # DB에 색이 없으면 기본값
        })
    
    return jsonify(result)

# --- 가능 시간 관리 API ---
@app.route("/availability", methods=["GET"])
@token_required
def get_availability(current_user):
    availabilities = UserAvailability.query.filter_by(user_id=current_user.id).all()
    result = {}
    for avail in availabilities:
        date_key = avail.available_date.strftime('%Y-%m-%d')
        result[date_key] = {
            "times": avail.times,
            "details": {
                "priority": avail.priority,
                "disclosureRange": avail.disclosure_range,
                "availableChannel": avail.available_channel
            }
        }
    return jsonify(result)

@app.route("/availability", methods=["POST"])
@token_required
def save_availability(current_user):
    data = request.get_json()
    # 기존 데이터 삭제
    UserAvailability.query.filter_by(user_id=current_user.id).delete()
    
    # 새 데이터 추가
    for date_str, avail_data in data.items():
        date_obj = datetime.strptime(date_str, '%Y-%m-%d').date()
        new_avail = UserAvailability(
            user_id=current_user.id,
            available_date=date_obj,
            times=avail_data.get('times', []),
            priority=avail_data.get('details', {}).get('priority'),
            disclosure_range=avail_data.get('details', {}).get('disclosureRange'),
            available_channel=avail_data.get('details', {}).get('availableChannel')
        )
        db.session.add(new_avail)
            
    db.session.commit()
    return jsonify({'message': '가능 시간이 저장되었습니다.'})

# --- 서버 최초 실행 시 기본 데이터 생성 ---
def init_db():
    with app.app_context():
        mimo_user = User.query.filter_by(username='mimo').first()
        if not mimo_user:
            print("Creating initial data...")
            # 유저 생성
            users_to_create = {"mimo": "미모", "user2": "동료A", "user3": "친구B"}
            for username, nickname in users_to_create.items():
                user = User(username=username, nickname=nickname, password=generate_password_hash('password123', method='pbkdf2:sha256'))
                db.session.add(user)
            db.session.commit()
            
            # 팀 생성 및 멤버 추가
            team = Team(name='멋쟁이사자처럼 13기', description='테스트용 팀')
            db.session.add(team)
            db.session.commit()
            mimo_user = User.query.filter_by(username='mimo').first()
            user2 = User.query.filter_by(username='user2').first()
            default_team = Team(
                name='기본 팀',
                description='mimo 유저를 위한 기본 팀입니다.',
                image='https://placehold.co/100x100/3287FF/FFFFFF?text=Team' # image 필드 추가
            )
            db.session.add(default_team)
            db.session.add(TeamMember(user_id=mimo_user.id, team_id=team.id, role='Admin'))
            db.session.add(TeamMember(user_id=user2.id, team_id=team.id, role='Member'))
            db.session.commit()

            # 미팅 데이터 생성
            if not Meeting.query.filter_by(name='10월 정기 전체 회의').first():
                meeting1 = Meeting(team_id=team.id, name='10월 정기 전체 회의', status='CONFIRMING', proposals=[{"userId": "mimo", "times": [540, 555, 600, 780, 795, 810]}, {"userId": "user2", "times": [540, 600, 630, 780, 810, 840, 1080]}])
                db.session.add(meeting1)
                meeting2 = Meeting(team_id=team.id, name='프로젝트 중간 발표', status='CONFIRMED', start_time=datetime.fromisoformat("2025-09-29T14:00:00Z"), color="#B5DBFF")
                db.session.add(meeting2)
                db.session.commit()
                db.session.add(MeetingParticipant(meeting_id=meeting1.id, user_id=mimo_user.id, status='대기중'))
                db.session.add(MeetingParticipant(meeting_id=meeting1.id, user_id=user2.id, status='대기중'))
                db.session.add(MeetingParticipant(meeting_id=meeting2.id, user_id=mimo_user.id, status='참여'))
                db.session.add(MeetingParticipant(meeting_id=meeting2.id, user_id=user2.id, status='참여'))
                db.session.commit()
                print("Initial data created.")

# --- 서버 실행 ---
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        init_db() 
    app.run(debug=True, port=5001)