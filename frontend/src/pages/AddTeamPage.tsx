// src/pages/AddTeamPage.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/client';
import CheckModal from '../components/CheckModal';

const AddTeamPage = () => {
    const navigate = useNavigate();
    const [teamName, setTeamName] = useState('');
    const [teamDesc, setTeamDesc] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCreateTeam = async () => {
        if (!teamName) {
            alert("팀 이름은 필수 항목입니다.");
            return;
        }
        try {
            await apiClient.post('/teams', {
                name: teamName,
                description: teamDesc
            });
            setIsModalOpen(true);
            setTimeout(() => {
                setIsModalOpen(false);
                navigate('/myteam'); // 3초 후 팀 목록 페이지로 이동
            }, 3000);
        } catch (error) {
            console.error("Failed to create team:", error);
            alert("팀 생성에 실패했습니다.");
        }
    };

    return (
        <PageWrapper>
            <CheckModal 
                title="생성 완료"
                desc="팀이 성공적으로 생성되었습니다."
                isToggle={isModalOpen}
            />
            <Title>새로운 팀 생성</Title>

            <FormContainer>
                <Section>
                    <Label>팀 이름</Label>
                    <Input 
                        type="text" 
                        value={teamName} 
                        onChange={e => setTeamName(e.target.value)} 
                        placeholder="팀 이름을 입력하세요" 
                    />
                </Section>
                <Section>
                    <Label>팀 설명 (선택)</Label>
                    <TextArea 
                        value={teamDesc} 
                        onChange={e => setTeamDesc(e.target.value)} 
                        placeholder="팀에 대한 간단한 설명을 입력하세요"
                        rows={4}
                    />
                </Section>
            </FormContainer>

            <Spacer />
            <SubmitButton onClick={handleCreateTeam}>팀 생성하기</SubmitButton>
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
const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5em;
`;
const Section = styled.section`
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
`;
const TextArea = styled.textarea`
    width: 100%;
    padding: 0.75em 1em;
    font-size: 12pt;
    border-radius: 0.5em;
    background-color: ${props => props.theme.bg_element2};
    color: ${props => props.theme.text1};
    border: 1px solid ${props => props.theme.border1};
    resize: vertical;
`;
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
    &:hover { filter: brightness(0.9); }
`;

export default AddTeamPage;