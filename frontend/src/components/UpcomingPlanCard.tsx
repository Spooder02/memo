import styled from "styled-components";
import { SimplePlan } from "../types/PlanFormat";
import images from "../utils/ImportImages";

// --- 헬퍼 함수: 배경색에 따라 대비되는 텍스트 색상을 반환 ---
const getContrastColor = (hexcolor: string): string => {
    if (hexcolor.startsWith('#')) {
        hexcolor = hexcolor.slice(1);
    }
    const r = parseInt(hexcolor.substr(0, 2), 16);
    const g = parseInt(hexcolor.substr(2, 2), 16);
    const b = parseInt(hexcolor.substr(4, 2), 16);
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    // YIQ 값이 128 이상이면 밝은 배경, 아니면 어두운 배경
    return (yiq >= 128) ? '#1A1A1A' : '#FFFFFF';
};


const UpcomingPlanCard = (props: {
    plan: SimplePlan
    dday: number
}) => {
    const data: SimplePlan = props.plan;
    const backgroundColor = props.plan.color || '#FFFFFF'; // color prop이 없을 경우 대비
    const textColor = getContrastColor(backgroundColor);

    return (
        <CardContainer
            key={props.plan.id}
            color={backgroundColor}
            textColor={textColor}
        >
            <SpaceAroundContainer>
                <LeftContainer>
                    <GroupImage src={images.groupicon}/>
                    <TextContainer>
                        <TeamName>{data.teamName}</TeamName>
                        <MeetingName>{data.meetingName}</MeetingName>
                    </TextContainer>
                </LeftContainer>

                <RightContainer>
                    <DayCount>
                       {(Math.floor(props.dday) > 0)? `D-${Math.floor(props.dday)}`: `D-DAY`}
                    </DayCount>
                    
                    <TeamScaleContainer>
                        <PersonIcon src={images.people} alt="person icon" textColor={textColor} />
                        <TeamScaleText>{data.teamScale}</TeamScaleText>
                    </TeamScaleContainer>
                </RightContainer>
            </SpaceAroundContainer>
        </CardContainer>
    )
}

// --- Styled Components ---

const CardContainer = styled.div<{color: string, textColor: string}>`
    display: flex;
    align-items: center;
    width: 100%;
    min-height: 4.5em;
    padding: 0.5em 0;
    background-color: ${(props) => props.color};
    color: ${(props) => props.textColor};
    border-radius: 0.5em;
    border: 1px solid ${props => props.theme.border1};
`;

const SpaceAroundContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.5em;
`;

const LeftContainer = styled.div`
    display: flex;
    align-items: center;
    flex: 1;
    min-width: 0;
`;

const GroupImage = styled.img`
    width: 2.75em;
    margin: 0 0.5em 0 0.75em;
`;

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    min-width: 0;
`;

const TeamName = styled.p`
    font-size: 12pt;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const MeetingName = styled.p`
    font-size: 11pt;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    opacity: 0.8;
`;

const RightContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin: 0 1em 0 0.5em;
    flex-shrink: 0;
`;

const DayCount = styled.p`
    color: ${props => props.theme.red};
    font-size: 14pt;
    font-weight: 700;
`;

const TeamScaleContainer = styled.div`
    display: flex;
    align-items: center;
    margin-top: 0.25em;
`;

const PersonIcon = styled.img<{textColor: string}>`
    width: 1em;
    height: 1em;
    margin-right: 0.2em;
    filter: ${props => props.textColor === '#FFFFFF' ? 'invert(1)' : 'none'};
`;

const TeamScaleText = styled.p`
    font-size: 10pt;
    font-weight: 600;
    opacity: 0.8;
`;

export default UpcomingPlanCard;