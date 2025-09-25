// src/pages/ProposalStatusPage.tsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ProposalStatusPage = () => {
    const { meetingId } = useParams<{ meetingId: string }>();
    const navigate = useNavigate();
    const [hasRegistered, setHasRegistered] = useState<boolean | null>(null);

    // 실제 앱에서는 이 부분에서 서버 API를 호출하여 등록 여부를 확인합니다.
    useEffect(() => {
        // --- API 호출 시뮬레이션 ---
        const checkRegistrationStatus = async () => {
            console.log(`Checking registration status for meeting ID: ${meetingId}`);
            // 예시: meetingId가 '123'이면 등록했고, '456'이면 등록 안했다고 가정
            const isRegistered = meetingId === '123'; 
            
            if (isRegistered) {
                setHasRegistered(true);
            } else {
                // 등록하지 않았다면, RegisterPlan 페이지로 meetingId와 함께 이동
                navigate(`/registerplan/meeting/${meetingId}`);
            }
        };

        checkRegistrationStatus();
    }, [meetingId, navigate]);

    // 등록 여부 확인 중...
    if (hasRegistered === null) {
        return <PageWrapper>상태를 확인 중입니다...</PageWrapper>;
    }

    // 이미 등록한 경우
    return (
        <PageWrapper>
            <Title>등록 완료</Title>
            <Description>이미 해당 미팅에 대한 가능 시간을 제출했습니다.</Description>
            <HomeButton onClick={() => navigate('/')}>홈으로 돌아가기</HomeButton>
        </PageWrapper>
    );
};

// --- Styled Components ---

const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    flex: 1;
    padding: 2em;
`;

const Title = styled.h1`
    font-size: 18pt;
    font-weight: 700;
    color: ${props => props.theme.text1};
    margin-bottom: 0.75em;
`;

const Description = styled.p`
    font-size: 12pt;
    color: ${props => props.theme.text2};
    margin-bottom: 2.5em;
`;

const HomeButton = styled.button`
    font-size: 12pt;
    font-weight: 600;
    padding: 0.75em 1.5em;
    border-radius: 0.75em;
    background-color: ${props => props.theme.accent};
    color: #FFFFFF;
`;

export default ProposalStatusPage;