import styled from "styled-components"
import groupedimage from "../assets/user_icon_007.png";

const UpcomingPlanCard = () => {

    return (
        <CardContainer>
            <SpaceAroundContainer>
                <div style={{"display": "flex"}}>
                <GroupImage src={groupedimage}/>
                <TextContainer>
                    <TeamName>언젠간만날팀이름</TeamName>
                    <MeetingName>미팅이름~</MeetingName>
                </TextContainer>
                </div>
                <TextContainer>
                    <DayCount>D-DAY</DayCount>
                </TextContainer>
            </SpaceAroundContainer>
        </CardContainer>
    )
}

const CardContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 4em;
    background-color:rgba(50, 156, 255, 0.4);
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