import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import teamsData from '../assets/teams.json';
import usersData from '../assets/users.json';
import { DetailedTeamInfo } from '../types/TeamFormat';

const CreateMeetingPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const initialState = location.state || {}; // 뒤로가기를 통해 전달받은 상태

    const currentUserId = "mimo";
    const myTeams: DetailedTeamInfo[] = teamsData.filter(team => team.teammates.includes(currentUserId));

    // --- 상태 관리: 전달받은 상태가 있으면 그것으로, 없으면 기본값으로 초기화 ---
    const [selectedTeam, setSelectedTeam] = useState<DetailedTeamInfo | null>(
        () => myTeams.find(team => team.id === initialState.teamId) || null
    );
    const [selectedMembers, setSelectedMembers] = useState<string[]>(initialState.memberIds || [currentUserId]);
    const [meetingName, setMeetingName] = useState(initialState.meetingName || '');
    const [date, setDate] = useState(initialState.date || new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString().substring(0, 10));
    const [duration, setDuration] = useState(initialState.duration || 60);

    const teamMembers = selectedTeam ? usersData.filter(u => selectedTeam.teammates.includes(u.id)) : [];

    const handleMemberToggle = (userId: string) => {
        if (userId === currentUserId) return;
        setSelectedMembers(prev => prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]);
    };
    
    const handleSelectTeam = (team: DetailedTeamInfo) => {
        setSelectedTeam(team);
        setSelectedMembers([currentUserId, ...team.teammates.filter(id => id !== currentUserId)]);
    };

    const findCommonTimes = () => {
        if (!meetingName || selectedMembers.length < 2) {
            alert('미팅 주제를 입력하고, 2명 이상의 참여자를 선택해주세요.');
            return;
        }
        navigate('/confirm-meeting', { 
            state: { 
                meetingName,
                date,
                duration,
                memberIds: selectedMembers,
                teamId: selectedTeam?.id // teamId도 함께 전달
            } 
        });
    };

    return (
        <PageWrapper>
            <Title>새로운 미팅 만들기</Title>

            <Section>
                <Label>1. 어느 팀에서 만드시나요?</Label>
                <OptionsContainer>
                    {myTeams.map(team => (
                        <OptionButton key={team.id} isSelected={selectedTeam?.id === team.id} onClick={() => handleSelectTeam(team)}>
                            {team.teamName}
                        </OptionButton>
                    ))}
                </OptionsContainer>
            </Section>

            {selectedTeam && (
                <>
                    <Section>
                        <Label>2. 누가 참여하나요?</Label>
                        <MembersContainer>
                            {teamMembers.map(member => (
                                <MemberChip key={member.id} isSelected={selectedMembers.includes(member.id)} onClick={() => handleMemberToggle(member.id)} disabled={member.id === currentUserId}>
                                    {member.nickname}
                                </MemberChip>
                            ))}
                        </MembersContainer>
                    </Section>
                    
                    <Section>
                        <Label>3. 미팅 정보를 입력하세요.</Label>
                        <Input type="text" value={meetingName} onChange={e => setMeetingName(e.target.value)} placeholder="미팅 주제 (예: 3분기 실적 리뷰)" />
                    </Section>

                    <FormGrid>
                        <Section>
                            <Label>날짜</Label>
                            <Input type="date" value={date} onChange={e => setDate(e.target.value)} />
                        </Section>
                        <Section>
                            <Label>소요 시간 (분)</Label>
                            <Input type="number" step="15" value={duration} onChange={e => setDuration(parseInt(e.target.value))} />
                        </Section>
                    </FormGrid>
                </>
            )}

            <Spacer />
            <SubmitButton disabled={!selectedTeam || !meetingName || selectedMembers.length < 2} onClick={findCommonTimes}>
                공통 시간 찾기
            </SubmitButton>
        </PageWrapper>
    );
};

// --- Styled Components ---
const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: 1em;
`;
const Title = styled.h1`
    font-size: 18pt;
    font-weight: 700;
    color: ${props => props.theme.text1};
    margin-bottom: 2em;
`;
const Section = styled.section`
    margin-bottom: 2em;
    display: flex;
    flex-direction: column;
`;
const Label = styled.label`
    font-size: 12pt;
    font-weight: 600;
    color: ${props => props.theme.text1};
    margin-bottom: 0.75em;
`;
const Input = styled.input`
    width: 100%;
    padding: 0.75em 1em;
    font-size: 12pt;
    border-radius: 0.5em;
    background-color: ${props => props.theme.bg_element2};
    color: ${props => props.theme.text1};
    border: 1px solid ${props => props.theme.border1};
    &:focus {
        outline: none;
        border-color: ${props => props.theme.accent};
    }
`;
const FormGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1em;
`;
const OptionsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.5em;
`;
const OptionButton = styled.button<{isSelected: boolean}>`
    padding: 0.5em 1em;
    font-size: 11pt;
    font-weight: 500;
    border-radius: 1.5em;
    transition: all 0.2s;
    border: 1px solid ${props => props.isSelected ? props.theme.accent : props.theme.border1};
    background-color: ${props => props.isSelected ? props.theme.accent : "transparent"};
    color: ${props => props.isSelected ? 'white' : props.theme.text2};
`;
const MembersContainer = styled(OptionsContainer)``;
const MemberChip = styled(OptionButton)``;
const Spacer = styled.div`
    flex-grow: 1;
`;
const SubmitButton = styled.button`
    width: 100%;
    padding: 1em;
    font-size: 13pt;
    font-weight: 600;
    border-radius: 0.75em;
    background-color: ${props => props.theme.accent};
    color: white;
    transition: all 0.2s;
    &:disabled {
        background-color: ${props => props.theme.bg_element2};
        color: ${props => props.theme.text4};
        cursor: not-allowed;
    }
    &:not(:disabled):hover { filter: brightness(0.9); }
`;

export default CreateMeetingPage;