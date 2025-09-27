import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import apiClient from "../api/client";
import { PageFrame } from "./Mainpage";
import images from "../utils/ImportImages";
import TeamCard from "../components/TeamCard";
import { SimpleTeamInfo } from "../types/TeamFormat";

const TeamPage = () => {
    const navigate = useNavigate();
    const [teams, setTeams] = useState<SimpleTeamInfo[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                setIsLoading(true);
                const response = await apiClient.get('/teams');
                setTeams(response.data);
            } catch (error) {
                console.error("Failed to fetch teams:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchTeams();
    }, []);

    if (isLoading) {
        return <PageFrame><div>로딩 중...</div></PageFrame>;
    }

    return (
        <PageFrame>
            <Header>
                <AlignFlexItemContainer>
                    <PeopleIconImage src={images.Users} />
                    <Title>팀 목록</Title>
                </AlignFlexItemContainer>
                <AddTeamButton onClick={() => navigate('/add-team')}>
                    + 팀 추가
                </AddTeamButton>
            </Header>
            <TeamListContainer>
                {teams.length > 0 ? (
                    teams.map((team) => (
                        <TeamCard key={team.id} teamInfo={team} />
                    ))
                ) : (
                    <NoTeamText>소속된 팀이 없습니다.</NoTeamText>
                )}
            </TeamListContainer>
        </PageFrame>
    );
}

// --- Styled Components ---

const Header = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    flex-shrink: 0;
`;
const AlignFlexItemContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;
const PeopleIconImage = styled.img`
    width: 26px;
    height: 26px;
    margin-right: 0.5em;
    filter: ${props => props.theme.name === 'dark' ? 'invert(1)' : 'none'};
`;
const Title = styled.h1`
    font-size: 16pt;
    font-weight: 700;
    color: ${props => props.theme.text1};
`;
const AddTeamButton = styled.button`
    font-size: 12pt;
    font-weight: 400;
    padding: 0.25em 0.5em;
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
    overflow-y: auto;
    flex: 1;
`;
const NoTeamText = styled.p`
    text-align: center;
    padding-top: 5em;
    color: ${props => props.theme.text4};
`;

export default TeamPage;