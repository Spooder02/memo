import React, { useState } from 'react';
import styled from 'styled-components';
import { SimpleTeamInfo } from '../types/TeamFormat';
import images from '../utils/ImportImages';
import TeamCard from '../components/TeamCard';
import { getWeekInfo, getWeekDates, formatTime } from '../utils/TimeUtils';
import DateBlocks from '../components/DateBlocks';
import DayBlock from '../components/DayBlock';
import TimeSelectionButton from '../components/TimeSelectionButton';
import { GrayLineDiv } from './Mainpage';

// --- 예시 데이터 ---
const mockTeam: SimpleTeamInfo = { id: 1, teamImage: images.likelionsch_logo, teamName: "멋쟁이사자처럼 13기", teamDesc: "순천향대학교 중앙 IT 창업동아리", teamScale: 36 };
type Duration = '30분' | '1시간' | '1시간 30분';

const ProposeMeetingPage: React.FC = () => {
    // --- 상태 관리 ---
    const [duration, setDuration] = useState<Duration>('1시간');
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDates, setSelectedDates] = useState<number|null>(null);
    const [selectedTimes, setSelectedTimes] = useState<number[]>([]);

    const { week, month } = getWeekInfo(currentDate);
    const weekDates = getWeekDates(currentDate);

    // --- 렌더링 로직 ---
    const baseTimes = Array.from({ length: 48 }, (_, index) => index * 15);

    return (
        <PageWrapper>
            <Header>
                <Title>미팅 제안하기</Title>
            </Header>

            <Section>
                <TeamCard teamInfo={mockTeam} />
            </Section>

            <Section>
                <SectionTitle>미팅 정보 설정</SectionTitle>
                <FormGrid>
                    <InputLabel>시작일</InputLabel>
                    <DateInput type="date" />
                    <InputLabel>종료일</InputLabel>
                    <DateInput type="date" />
                </FormGrid>
                <DurationContainer>
                    {(['30분', '1시간', '1시간 30분'] as Duration[]).map(d => (
                        <DurationButton key={d} isActive={duration === d} onClick={() => setDuration(d)}>
                            {d}
                        </DurationButton>
                    ))}
                </DurationContainer>
            </Section>

            <GrayLineDiv />

            <Section>
                <SectionTitle>가능한 시간 선택</SectionTitle>
                <WeekCalendarContainer>
                    <DateBlocks/>
                    {weekDates.map((date) => (
                        <DayBlock
                            key={`${month}-${date}`}
                            date={date}
                            today={(date === selectedDates)}
                            color={undefined}
                            onClick={() => setSelectedDates(date)}
                        />
                    ))}
                </WeekCalendarContainer>
                <TimeSelectionTable>
                    {baseTimes.map(time => (
                        <TimeSelectionButton
                            key={time}
                            time={formatTime(time)}
                            rawTime={time}
                            isSelection={selectedTimes.includes(time)}
                            setIsSelection={() => {
                                if (!selectedDates) {
                                    alert("날짜를 먼저 선택해주세요!");
                                    return;
                                }
                                setSelectedTimes(prev => 
                                    prev.includes(time) ? prev.filter(t => t !== time) : [...prev, time]
                                );
                            }}
                        />
                    ))}
                </TimeSelectionTable>
            </Section>

            <Spacer />

            <SubmitButton>이 내용으로 제안</SubmitButton>
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
    margin-bottom: 1.5em;
`;

const Title = styled.h1`
    font-size: 18pt;
    font-weight: 700;
    color: ${props => props.theme.text1};
`;

const Section = styled.section`
    margin-bottom: 1.5em;
`;

const SectionTitle = styled.h2`
    font-size: 14pt;
    font-weight: 600;
    color: ${props => props.theme.text1};
    margin-bottom: 1em;
`;

const FormGrid = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: 0.75em 1em;
    margin-bottom: 1em;
`;

const InputLabel = styled.label`
    font-size: 12pt;
    font-weight: 500;
    color: ${props => props.theme.text2};
`;

const DateInput = styled.input`
    width: 100%;
    padding: 0.5em 0.75em;
    font-size: 12pt;
    border-radius: 0.5em;
    background-color: ${props => props.theme.bg_element2};
    color: ${props => props.theme.text1};
    border: 1px solid ${props => props.theme.border1};
`;

const DurationContainer = styled.div`
    display: flex;
    gap: 0.5em;
`;

const DurationButton = styled.button<{isActive: boolean}>`
    padding: 0.5em 1em;
    font-size: 11pt;
    font-weight: 500;
    border-radius: 1.5em;
    transition: all 0.2s;
    background-color: ${props => props.isActive ? props.theme.accent : props.theme.bg_element2};
    color: ${props => props.isActive ? 'white' : props.theme.text2};
`;

const WeekCalendarContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    justify-items: center;
    gap: 0.25em;
    margin-bottom: 1.5em;
`;

const TimeSelectionTable = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
    gap: 0.75em;
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
    &:hover {
        filter: brightness(0.9);
    }
`;

export default ProposeMeetingPage;