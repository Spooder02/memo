import React, { useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import userAvailabilityData from '../assets/userAvailability.json';
import usersData from '../assets/users.json';
import { formatTime } from '../utils/TimeUtils';

const findContiguousSlots = (times: number[], duration: number): number[][] => {
    if (times.length === 0) return [];
    const slotsNeeded = duration / 15;
    const contiguousBlocks: number[][] = [];
    for (let i = 0; i <= times.length - slotsNeeded; i++) {
        let isContiguous = true;
        for (let j = 0; j < slotsNeeded - 1; j++) {
            if (times[i + j + 1] - times[i + j] !== 15) {
                isContiguous = false;
                break;
            }
        }
        if (isContiguous) {
            contiguousBlocks.push(times.slice(i, i + slotsNeeded));
        }
    }
    return contiguousBlocks;
};

const ConfirmMeetingPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    if (!location.state) {
        return <PageWrapper><NoTimeText>잘못된 접근입니다.</NoTimeText></PageWrapper>;
    }
    const { meetingName, date, duration, memberIds } = location.state;

    const [selectedSlot, setSelectedSlot] = useState<number[] | null>(null);

    const commonContiguousSlots = useMemo(() => {
        const selectedDate = new Date(date);
        const year = selectedDate.getFullYear();
        const month = selectedDate.getMonth() + 1;
        const day = selectedDate.getDate();

        const availabilityArrays = memberIds.map((id: string) => {
            const userAvail = userAvailabilityData.find(u => u.userId === id);
            const dayAvail = userAvail?.availability.find(a => 
                a.date.year === year && a.date.month === month && a.date.day === day
            );
            return new Set(dayAvail?.times.map(t => t.time) || []);
        });

        if (availabilityArrays.length < 2) return [];

        let commonTimes = new Set(availabilityArrays[0]);
        for (let i = 1; i < availabilityArrays.length; i++) {
            commonTimes.forEach(time => {
                if (!availabilityArrays[i].has(time)) commonTimes.delete(time);
            });
        }
        const sortedCommonTimes = Array.from(commonTimes).sort((a, b) => a - b);
        return findContiguousSlots(sortedCommonTimes, duration);
    }, [date, duration, memberIds]);

    const selectedMembers = usersData.filter(u => memberIds.includes(u.id));

    const goBackToCreate = () => {
        navigate('/create-meeting', { state: location.state });
    };

    return (
        <PageWrapper>
            <Header>
                <Title>미팅 시간 확정</Title>
                <MeetingTopic>"{meetingName}" 미팅</MeetingTopic>
                <DateInfo>{new Date(date).toLocaleDateString('ko-KR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</DateInfo>
            </Header>

            <Section>
                <SectionTitle>참여자 ({selectedMembers.length}명)</SectionTitle>
                <MembersContainer>
                    {selectedMembers.map(m => <MemberChip key={m.id}>{m.nickname}</MemberChip>)}
                </MembersContainer>
            </Section>

            <Section>
                <SectionTitle>공통 가능 시간</SectionTitle>
                <TimeGrid>
                    {commonContiguousSlots.length > 0 ? (
                        commonContiguousSlots.map(slot => (
                            <TimeSlotButton 
                                key={slot[0]}
                                isSelected={selectedSlot?.[0] === slot[0]}
                                onClick={() => setSelectedSlot(slot)}
                            >
                                {formatTime(slot[0])} - {formatTime(slot[slot.length - 1] + 15)}
                            </TimeSlotButton>
                        ))
                    ) : (
                        <NoTimeContainer>
                            <NoTimeText>조건을 만족하는 공통 시간이 없습니다.</NoTimeText>
                            <BackButton onClick={goBackToCreate}>조건 변경하러 가기</BackButton>
                        </NoTimeContainer>
                    )}
                </TimeGrid>
            </Section>
            
            <Spacer />
            {commonContiguousSlots.length > 0 && (
                <ConfirmButton disabled={!selectedSlot}>이 시간으로 확정</ConfirmButton>
            )}
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
const Header = styled.header`
    margin-bottom: 2em;
`;
const Title = styled.h1`
    font-size: 18pt;
    font-weight: 700;
    color: ${props => props.theme.text1};
    margin-bottom: 0.5em;
`;
const MeetingTopic = styled.p`
    font-size: 13pt;
    font-weight: 500;
    color: ${props => props.theme.text2};
    margin-bottom: 0.25em;
`;
const DateInfo = styled.p`
    font-size: 12pt;
    color: ${props => props.theme.text2};
`;
const Section = styled.section`
    margin-bottom: 2em;
`;
const SectionTitle = styled.h2`
    font-size: 14pt;
    font-weight: 600;
    color: ${props => props.theme.text1};
    margin-bottom: 1em;
`;
const MembersContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.5em;
`;
const MemberChip = styled.div`
    padding: 0.5em 1em;
    font-size: 11pt;
    font-weight: 500;
    border-radius: 1.5em;
    border: 1px solid ${props => props.theme.accent};
    background-color: ${props => props.theme.accent};
    color: white;
`;
const TimeGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 0.75em;
`;
const TimeSlotButton = styled.button<{isSelected: boolean}>`
    padding: 0.75em;
    font-size: 12pt;
    font-weight: 500;
    border-radius: 0.5em;
    transition: all 0.2s;
    border: 1px solid ${props => props.isSelected ? props.theme.accent : props.theme.border1};
    background-color: ${props => props.isSelected ? props.theme.accent : props.theme.bg_element1};
    color: ${props => props.isSelected ? 'white' : props.theme.text1};
    &:hover {
        border-color: ${props => props.theme.accent};
    }
`;
const NoTimeContainer = styled.div`
    grid-column: 1 / -1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2em;
    gap: 1.5em;
`;
const NoTimeText = styled.p`
    text-align: center;
    color: ${props => props.theme.text4};
`;
const BackButton = styled.button`
    font-size: 12pt;
    font-weight: 600;
    padding: 0.75em 1.5em;
    border-radius: 0.75em;
    background-color: ${props => props.theme.bg_element2};
    color: ${props => props.theme.text1};
    border: 1px solid ${props => props.theme.border1};
    &:hover {
        filter: brightness(0.95);
    }
`;
const Spacer = styled.div`
    flex-grow: 1;
`;
const ConfirmButton = styled.button`
    width: 100%;
    padding: 1em;
    font-size: 13pt;
    font-weight: 600;
    border-radius: 0.75em;
    transition: all 0.2s;
    background-color: ${props => props.theme.accent};
    color: white;
    &:disabled {
        background-color: ${props => props.theme.bg_element2};
        color: ${props => props.theme.text4};
        cursor: not-allowed;
    }
    &:not(:disabled):hover {
        filter: brightness(0.9);
    }
`;

export default ConfirmMeetingPage;