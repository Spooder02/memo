import styled from "styled-components";
import { SimpleTeamInfo } from "../types/TeamFormat";
import images from "../utils/ImportImages";

const TeamCard = (props: {
    teamInfo: SimpleTeamInfo;
}) => {
    return (
        <Card>
            <TeamImage src={props.teamInfo.teamImage}/>
            <TeamInfoContainer>
                <div> {/* 팀 이름과 설명을 묶는 div */}
                    <TeamName>
                        {props.teamInfo.teamName}
                    </TeamName>
                    <Description>
                        {props.teamInfo.teamDesc}
                    </Description>
                </div>
                <TeamScale>
                    <MemberImage src={images.Users}/>
                    {props.teamInfo.teamScale}
                </TeamScale>
            </TeamInfoContainer>
        </Card>
    )
}

// --- Styled Components ---

const Card = styled.div`
    display: flex;
    flex-shrink: 0;
    align-items: center;
    width: 100%;
    min-height: 7em; /* 카드 최소 높이 조정 (2:1 비율에 가깝게) */
    padding: 0.75em 1em; /* 패딩 조정 */
    background-color: ${props => props.theme.bg_element1};
    border: 1px solid ${props => props.theme.border1};
    box-shadow: 0 2px 3px ${props => props.theme.shadow1};
    border-radius: 0.75em;
    gap: 0.75em; /* 이미지와 정보 컨테이너 사이 간격 조정 */
`;

const TeamImage = styled.img`
    width: 4.5em; /* 팀 이미지 크기 조정 */
    height: 4.5em;
    border-radius: 50%;
    flex-shrink: 0;
`;

const TeamInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start; /* 콘텐츠가 위에서부터 시작하도록 */
    flex: 1;
    min-height: 100%;
    overflow: hidden;
`;

const TeamName = styled.h2`
    font-size: 14pt;
    font-weight: 600;
    color: ${props => props.theme.text1};
    margin: 0 0 0.1em 0; /* 마진 조정 */
    line-height: 1.3; /* 라인 높이 조정 */

    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
`;

const Description = styled.p`
    font-size: 12pt;
    color: ${props => props.theme.text2};
    margin: 0; /* 마진 제거 */
    line-height: 1.3; /* 라인 높이 조정 */

    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
`;

const TeamScale = styled.p`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: 11pt;
    color: ${props => props.theme.text4};
    margin-top: auto; /* 남은 공간을 밀고 항상 하단에 위치 */
    padding-top: 0.25em; /* 텍스트와의 상단 간격 */
`;

const MemberImage = styled.img`
    width: 1em;
    height: 1em;
    margin-right: 0.25em;
    filter: ${props => props.theme.name === 'dark' ? 'invert(1)' : 'none'};
`;

export default TeamCard;