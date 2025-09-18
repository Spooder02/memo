import styled from "styled-components";
import { PageFrame } from "./Mainpage";
import images from "../utils/ImportImages";
import TeamCard from "../components/TeamCard";
import { SimpleTeamInfo } from "../types/TeamFormat";

const TeamPage = () => {
    // 예시 팀 정보
    const teamInfo: SimpleTeamInfo = {
        teamImage: images.likelionsch_logo,
        teamName: "멋쟁이사자처럼 13기",
        teamDesc: "순천향대학교 중앙 IT 창업동아리",
        teamScale: 36
    }


    return (
        <PageFrame>
            <Header>
                <AlignFlexItemContainer>
                    <PeopleIconImage
                    src={images.Users}
                    />
                    <Title>팀 목록</Title>
                </AlignFlexItemContainer>
                <AddTeamButton>
                    + 팀 추가
                </AddTeamButton>
            </Header>
            <TeamListContainer>
                <TeamCard
                    teamInfo={teamInfo}
                />
            </TeamListContainer>
        </PageFrame>
    )
}

const Header = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5em 0.25em 0.5em 0.5em;
`;

export const AlignFlexItemContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const PeopleIconImage = styled.img`
    width: 30px;
    height: 30px;
    margin-right: 0.5em;
`;

const Title = styled.h1`
    font-size: 18pt;
    font-weight: 700;
`

export const AddTeamButton = styled.button`
    font-size: 12pt;
    font-weight: 500;
    padding: 0.25em 0.5em 0.25em 0.5em;
    background-color: #3287FF;
    color: #FBFBFB;
    border-radius: 4px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.25);
`;

const TeamListContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1em;
    height: 70vh;
    overflow-y: auto;
    gap: 1em;
`;


export default TeamPage;