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
                <TeamName>
                    {props.teamInfo.teamName}
                </TeamName>
                <Description>
                    {props.teamInfo.teamDesc}
                </Description>
                <TeamScale>
                    {props.teamInfo.teamScale}
                    <MemberImage src={images.Users}/>
                </TeamScale>
            </TeamInfoContainer>

        </Card>
    )
}

const Card = styled.div`
    display: flex;
    flex-shrink: 0;
    align-items: center;
    width: 100%;
    height: 6em;
    border: 1px solid #898989;
    box-shadow: 0 3px 3px #BBBBBB;
    border-radius: 0.5em;
`;

const TeamImage = styled.img`
    width: 4em;
    height: 4em;
    margin: 1em;
`;

const TeamInfoContainer = styled.div`
    display: block;
`;

const TeamName = styled.h2`
    font-size: 14pt;
    font-weight: 600;
`;

const Description = styled.p`
    font-size: 12pt;
`;

const TeamScale = styled.p`
    display: flex;
    font-size: 11pt;
    align-items: center;
    color: #AAAAAA;
    flex-direction: row-reverse;
`;

const MemberImage = styled.img`
    width: 1em;
    height: 1em;
    margin: 0 0.25em 0 0;
`;

export default TeamCard;