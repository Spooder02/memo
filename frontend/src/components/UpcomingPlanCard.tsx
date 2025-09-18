import styled from "styled-components"
import { SimplePlan } from "../types/PlanFormat";
import images from "../utils/ImportImages";

const UpcomingPlanCard = (props: {
    plan: SimplePlan
    dday: number
}) => {
    const data: SimplePlan = props.plan;
    const backgroundColor = props.plan.color;

    return (
        <CardContainer
            key={props.plan.id}
            color={backgroundColor}
        >
            <SpaceAroundContainer>
                {/* 좌측 컨텐츠 (div 대신 LeftContainer 사용) */}
                <LeftContainer>
                    <GroupImage src={images.groupicon}/>
                    <TextContainer>
                        <TeamName>{data.teamName}</TeamName>

                        <MeetingName>{data.meetingName}</MeetingName>
                    </TextContainer>
                </LeftContainer>

                {/* 우측 컨텐츠 (D-day, 인원) */}
                <RightContainer>
                    <DayCount>
                       {(Math.floor(props.dday) > 0)? `D-${Math.floor(props.dday)}`: `D-DAY`}
                    </DayCount>
                    
                    <TeamScaleContainer>
                        <PersonIcon src={images.people} alt="person icon" />
                        <TeamScaleText>{data.teamScale}</TeamScaleText>
                    </TeamScaleContainer>
                </RightContainer>
            </SpaceAroundContainer>
        </CardContainer>
    )
}

// --- Styled Components ---

const CardContainer = styled.div<{color: string}>`
    display: flex;
    align-items: center;
    width: 100%;
    min-height: 4.5em;
    padding: 0.5em 0;
    background-color: ${(props) => props.color};
    border-radius: 0.5em;
`;

const SpaceAroundContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.5em; /* 좌우 컨테이너 간 최소 간격 */
`;

const LeftContainer = styled.div`
    display: flex;
    align-items: center;
    flex: 1; /* 남은 공간을 최대한 차지하도록 설정 */
    min-width: 0; /* 컨테이너가 내용보다 작아질 수 있도록 허용 */
`;

const GroupImage = styled.img`
    width: 2.75em;
    margin: 0 0.5em 0 0.75em;
`;

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1; /* LeftContainer 내에서 남은 공간 차지 */
    min-width: 0; /* 이것도 추가 */
`;

const TeamName = styled.p`
    font-size: 12pt;
    font-weight: 600;

    /* --- 말줄임표 스타일 추가 --- */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const MeetingName = styled.p`
    font-size: 11pt;

    /* --- 말줄임표 스타일 추가 --- */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const RightContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin: 0 1em 0 0.5em;
    flex-shrink: 0; /* 공간이 부족해도 이 컴포넌트의 크기는 줄어들지 않음 */
`;

const DayCount = styled.p`
    color: rgba(255, 0, 0, 0.7);
    font-size: 14pt;
    font-weight: 700;
`;

const TeamScaleContainer = styled.div`
    display: flex;
    align-items: center;
    margin-top: 0.25em;
`;

const PersonIcon = styled.img`
    width: 1em;
    height: 1em;
    margin-right: 0.2em;
`;

const TeamScaleText = styled.p`
    font-size: 10pt;
    font-weight: 600;
    color: #787878;
`;

export default UpcomingPlanCard;