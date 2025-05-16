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
                <div style={{"display": "flex"}}>
                <GroupImage src={images.groupicon}/>
                <TextContainer>
                    <TeamName>{data.teamName}</TeamName>
                    <MeetingName>{data.meetingName}</MeetingName>
                </TextContainer>
                </div>
                <TextContainer>
                    <DayCount>
                       {(Math.floor(props.dday) > 0)? `D-${Math.floor(props.dday)}`: `D-DAY`}
                    </DayCount>
                </TextContainer>
            </SpaceAroundContainer>
        </CardContainer>
    )
}

const CardContainer = styled.div<{color: string}>`
    display: flex;
    align-items: center;
    width: 100%;
    height: 4em;
    padding: 0.5em 0 0.5em 0;
    background-color: ${(props) => props.color};
    border-radius: 0.5em;
`;

const SpaceAroundContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const GroupImage = styled.img`
    width: 2.75em;
    margin: 0 0.5em 0 0.75em;
`;

const TextContainer = styled.div`
    display: block;
    margin: 0 0.5em 0 0;
`;

const TeamName = styled.p`
    font-weight: 600;
`;

const MeetingName = styled.p`
    font-size: 12pt;
`;

const DayCount = styled.p`
    color: rgba(255, 0, 0, 0.7);
    font-size: 14pt;
    font-weight: 600;
    margin: 0 0.5em 0 0;
`;

export default UpcomingPlanCard;