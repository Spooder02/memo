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

// --- Styled Components ---

const Header = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
`;

export const AlignFlexItemContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const PeopleIconImage = styled.img`
    width: 26px;
    height: 26px;
    margin-right: 0.5em;
    transition: filter 0.2s;

    /* 다크 모드일 때 아이콘 색상 반전 */
    filter: ${props => props.theme.name === 'dark' ? 'invert(1)' : 'none'};
`;

const Title = styled.h1`
    font-size: 16pt;
    font-weight: 700;
    color: ${props => props.theme.text1};
`

export const AddTeamButton = styled.button`
    font-size: 12pt;
    font-weight: 400;
    padding: 0.25em 0.5em 0.25em 0.5em;
    background-color: ${props => props.theme.accent};
    color: #FBFBFB;
    border-radius: 4px;
    box-shadow: 0 2px 3px ${props => props.theme.shadow1};
`;

const TeamListContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1em;
    gap: 1em;
    /* height와 overflow 속성을 제거하여 부모인 Layout이 스크롤을 담당하도록 함 */
`;

export default TeamPage;