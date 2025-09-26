import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../api/client';
import DateBlocks from '../components/DateBlocks';
import DayBlock from '../components/DayBlock';
import TimeSelectionButton from '../components/TimeSelectionButton';
import { SmallDropdown } from '../components/SmallDropdown';
import { DropdownButtonImage, DropdownContainer, DropdownText, GrayLineDiv } from './Mainpage';
import { RegisterPlanDetails } from '../types/PlanFormat';
import { formatTime, getWeekDates, groupAndFormatTimes, getWeekInfo } from '../utils/TimeUtils';
import images from '../utils/ImportImages';
import { availableChannelOptions, DropdownItemState, priorityOptions, timeDivOptions, timeFilterOptions } from '../types/Dropdown';
import CheckModal from '../components/CheckModal';
import WeekSelectorModal from '../components/WeekSelectorModal';
import ConfirmationModal from '../components/ConfirmationModalProps';

type Availability = {
    [dateKey: string]: {
        times: number[];
        details: Partial<RegisterPlanDetails>;
    }
}
type DropdownOptionsType = "timeDiv" | "timeFilter" | "selectedTime" | "priority" | "disclosureRange" | "availableChannel";

const RegisterPlan: React.FC = () => {
    const { meetingId } = useParams<{ meetingId: string }>();
    const navigate = useNavigate();
    const isProposalMode = !!meetingId;

    // --- 상태 관리 ---
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<number | null>(null);
    const [availability, setAvailability] = useState<Availability>({});
    const [isLoading, setIsLoading] = useState(true);
    const [isWeekModalOpen, setIsWeekModalOpen] = useState(false);
    const [isCheckModalOpen, setIsCheckModalOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [confirmData, setConfirmData] = useState<Availability | null>(null);
    
    const [dropdownStates, setDropdownStates] = useState<{[key in DropdownOptionsType]: DropdownItemState}>({
        timeDiv: { isOpen: false, options: timeDivOptions, selectedValue: timeDivOptions[0] },
        timeFilter: { isOpen: false, options: timeFilterOptions, selectedValue: timeFilterOptions[1] },
        selectedTime: { isOpen: false, options: ["선택된 시간 전체"], selectedValue: "선택된 시간 전체" },
        disclosureRange: { isOpen: false, options: ["전체 공개"], selectedValue: "전체 공개" },
        priority: { isOpen: false, options: priorityOptions, selectedValue: priorityOptions[0] },
        availableChannel: { isOpen: false, options: availableChannelOptions, selectedValue: availableChannelOptions[0] }
    });
    
    const { week, month } = getWeekInfo(currentDate);
    const weekDates = getWeekDates(currentDate);

    // --- 데이터 로딩 및 동적 옵션 생성 ---
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const [availRes, teamsRes] = await Promise.all([
                    apiClient.get('/availability'),
                    apiClient.get('/teams')
                ]);
                
                setAvailability(availRes.data);
                const myTeamNames = teamsRes.data.map((team: any) => team.teamName);
                setDropdownStates(prev => ({
                    ...prev,
                    disclosureRange: { ...prev.disclosureRange, options: ["전체 공개", ...myTeamNames] }
                }));

            } catch (error) {
                console.error("Failed to fetch initial data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (!selectedDate) return;
        const dateKey = `${currentDate.getFullYear()}-${String(month).padStart(2, '0')}-${String(selectedDate).padStart(2, '0')}`;
        const currentTimes = availability[dateKey]?.times || [];
        const sortedTimes = [...currentTimes].sort((a, b) => a - b);

        const formattedSelectedTimes = groupAndFormatTimes(sortedTimes);
        setDropdownStates(prev => ({
            ...prev,
            selectedTime: { ...prev.selectedTime, options: ["선택된 시간 전체", ...formattedSelectedTimes], selectedValue: "선택된 시간 전체" }
        }));
    }, [availability, selectedDate, currentDate, month, dropdownStates.timeFilter.selectedValue]);


    // --- 핸들러 함수 ---
    const handleDateSelect = (date: number) => {
        setSelectedDate(date);
        const dateKey = `${currentDate.getFullYear()}-${String(month).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
        const existingData = availability[dateKey];
        if (existingData?.details) {
            setDropdownStates(prev => ({
                ...prev,
                priority: { ...prev.priority, selectedValue: existingData.details.priority || priorityOptions[0] },
                disclosureRange: { ...prev.disclosureRange, selectedValue: existingData.details.disclosureRange || "전체 공개" },
                availableChannel: { ...prev.availableChannel, selectedValue: existingData.details.availableChannel || availableChannelOptions[0] },
                selectedTime: { ...prev.selectedTime, selectedValue: existingData.details.selectedTime || "선택된 시간 전체" }
            }));
        }
    };
    
    const handleTimeChange = (time: number) => {
        if (!selectedDate) { alert("[경고] 날짜를 먼저 선택해주세요!"); return; }
        const dateKey = `${currentDate.getFullYear()}-${String(month).padStart(2, '0')}-${String(selectedDate).padStart(2, '0')}`;
        
        const currentTimes = new Set(availability[dateKey]?.times || []);
        const timeFilter = dropdownStates.timeFilter.selectedValue;
        const step = timeFilter === '1시간마다' ? 4 : (timeFilter === '30분마다' ? 2 : 1);
        const isAdding = !currentTimes.has(time);

        for (let i = 0; i < step; i++) {
            const targetTime = time + (i * 15);
            if (isAdding) {
                currentTimes.add(targetTime);
            } else {
                currentTimes.delete(targetTime);
            }
        }
        
        const newTimesArray = Array.from(currentTimes).sort((a,b) => a-b);
        
        setAvailability(prev => ({
            ...prev,
            [dateKey]: { ...prev[dateKey], times: newTimesArray, details: prev[dateKey]?.details || {} }
        }));
    };

    const handleDetailChange = (key: keyof RegisterPlanDetails, value: string) => {
        if (!selectedDate) return;
        const dateKey = `${currentDate.getFullYear()}-${String(month).padStart(2, '0')}-${String(selectedDate).padStart(2, '0')}`;
        setDropdownStates(prev => ({ ...prev, [key as DropdownOptionsType]: { ...prev[key as DropdownOptionsType], selectedValue: value, isOpen: false } }));
        setAvailability(prev => ({
            ...prev,
            [dateKey]: { times: prev[dateKey]?.times || [], details: { ...prev[dateKey]?.details, [key]: value } }
        }));
    };

    const handleReset = async () => {
        if (window.confirm("정말로 모든 날짜의 가능 시간을 초기화하시겠습니까?")) {
            try {
                // 1. 서버에 빈 객체를 보내 데이터를 초기화합니다.
                await apiClient.post('/availability', {});
                // 2. 서버 요청 성공 시, 로컬 상태도 초기화합니다.
                setAvailability({});
                setSelectedDate(null);
                alert("초기화되었습니다.");
            } catch (error) {
                console.error("Failed to reset availability:", error);
                alert("초기화에 실패했습니다. 다시 시도해주세요.");
            }
        }
    };

    const toggleDropdown = (dropdownKey: DropdownOptionsType) => {
        setDropdownStates(prev => {
            const isOpening = !prev[dropdownKey].isOpen;
            const closedState = Object.fromEntries(Object.keys(prev).map(key => [ key, { ...prev[key as DropdownOptionsType], isOpen: false }])) as {[key in DropdownOptionsType]: DropdownItemState};
            return { ...closedState, [dropdownKey]: { ...prev[dropdownKey], isOpen: isOpening } };
        });
    };

    const handleSubmitClick = () => {
        if (!selectedDate) {
            alert("[오류] 저장할 날짜를 선택해주세요!");
            return;
        }
        
        const dateKey = `${currentDate.getFullYear()}-${String(month).padStart(2, '0')}-${String(selectedDate).padStart(2, '0')}`;
        const currentDayData = availability[dateKey];

        if (!currentDayData || currentDayData.times.length === 0) {
            alert("[오류] 선택된 날짜에 등록할 시간이 없습니다!");
            return;
        }

        const dataForConfirmation = { [dateKey]: currentDayData };
        setConfirmData(dataForConfirmation); // 필터링된 데이터를 상태에 저장하여 모달을 엽니다.

    };


    const saveToServer = async () => {
        if (Object.keys(availability).length === 0) {
            alert("[오류] 등록할 일정을 선택하세요!");
            return;
        }

        // 서버에는 전체 availability 객체를 전송
        try {
            if (isProposalMode) {
                await apiClient.post(`/meetings/${meetingId}/proposals`, { availability });
                alert("미팅 가능 시간이 제출되었습니다.");
                navigate(`/myteam`);
            } else {
                await apiClient.post('/availability', availability);
                setIsCheckModalOpen(true);
                setTimeout(() => setIsCheckModalOpen(false), 3000);
            }
        } catch (error) {
            console.error("Failed to save data:", error);
            alert("저장에 실패했습니다. 다시 시도해주세요.");
        } finally {
            setConfirmData(null); // 모달 닫기
        }
    };
    
    const baseTimes = Array.from({ length: 48 }, (_, index) => index * 15);
    const displayTimes = dropdownStates.timeDiv.selectedValue === '오후' ? baseTimes.map(t => t + 720) : baseTimes;

    if (isLoading) {
        return <PageContainer>로딩 중...</PageContainer>;
    }

    return (
        <PageContainer>
            <ConfirmationModal 
                isOpen={confirmData !== null}
                onClose={() => setConfirmData(null)}
                onConfirm={saveToServer}
                availability={confirmData || {}}
            />
            <CheckModal title={isProposalMode ? '제출 완료' : '저장 완료'} desc={isProposalMode ? '미팅 가능 시간이 제출되었습니다.' : '일정이 저장되었습니다.'} isToggle={isCheckModalOpen} />
            <WeekSelectorModal isOpen={isWeekModalOpen} onClose={() => setIsWeekModalOpen(false)} currentDate={currentDate} onWeekSelect={(newDate) => {setCurrentDate(newDate); setIsWeekModalOpen(false);}} />

            {!isProposalMode && (
                <ClickableTimeTitle onClick={() => setIsWeekModalOpen(true)}>
                    {`${month}월 ${week}주차 `} &gt;
                </ClickableTimeTitle>
            )}

            <Title>{isProposalMode ? '미팅 가능 시간 등록' : '내 시간 등록하기'}</Title>

            <WeekCalendarContainer>
                <DateBlocks/>
                {weekDates.map((date) => {
                    const dateKey = `${currentDate.getFullYear()}-${String(month).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
                    return (
                        <DayBlock
                            key={dateKey}
                            date={date}
                            today={(date === selectedDate)}
                            color={availability[dateKey]?.times.length > 0 ? '#B5DBFF' : undefined}
                            onClick={() => handleDateSelect(date)}
                        />
                    )
                })}
            </WeekCalendarContainer>

            <TimeDivContainer>
                 <DropdownContainer>
                    <TimeDivTitle onClick={() => toggleDropdown('timeDiv')}>
                        {dropdownStates.timeDiv.selectedValue}
                        <DropdownButtonImage src={images.dropdownArrow} isOpen={dropdownStates.timeDiv.isOpen} />
                    </TimeDivTitle>
                    <SmallDropdown arr={dropdownStates.timeDiv.options} isOpen={dropdownStates.timeDiv.isOpen} dropdownKey="timeDiv" clickEvent={(k, v) => setDropdownStates(p => ({...p, [k]: {...p[k], selectedValue: v, isOpen: false}}))} />
                </DropdownContainer>
                <DropdownContainer>
                    <DropdownText onClick={() => toggleDropdown('timeFilter')}>
                        {dropdownStates.timeFilter.selectedValue}
                        <DropdownButtonImage src={images.dropdownArrow} isOpen={dropdownStates.timeFilter.isOpen} />
                    </DropdownText>
                    <SmallDropdown arr={dropdownStates.timeFilter.options} isOpen={dropdownStates.timeFilter.isOpen} dropdownKey="timeFilter" clickEvent={(k, v) => setDropdownStates(p => ({...p, [k]: {...p[k], selectedValue: v, isOpen: false}}))} />
                </DropdownContainer>
            </TimeDivContainer>

            <GrayLineDiv/>
            
            <TimeSelectionTable>
                {displayTimes
                    .filter(time => {
                        if (dropdownStates.timeFilter.selectedValue === "30분마다") return time % 30 === 0;
                        if (dropdownStates.timeFilter.selectedValue === "1시간마다") return time % 60 === 0;
                        return true;
                    })
                    .map(time => {
                        const dateKey = `${currentDate.getFullYear()}-${String(month).padStart(2, '0')}-${String(selectedDate).padStart(2, '0')}`;
                        const isSelected = selectedDate ? availability[dateKey]?.times.includes(time) : false;
                        return (
                            <TimeSelectionButton
                                key={time}
                                time={formatTime(time)}
                                rawTime={time}
                                isSelection={isSelected || false}
                                setIsSelection={() => handleTimeChange(time)}
                            />
                        );
                    })}
            </TimeSelectionTable>

            <GrayLineDiv/>

            <OptionContainer>
                 {Object.entries({
                    selectedTime: { icon: images.clock, text: "선택시간대" },
                    priority: { icon: images.thumbsup, text: "선호도" },
                    disclosureRange: { icon: images.lock, text: "공개 범위" },
                    availableChannel: { icon: images.arrowdown, text: "참여가능 채널" },
                }).map(([key, value]) => {
                    const typedKey = key as DropdownOptionsType;
                    return (
                        <OptionDivider key={key}>
                            <OptionText>
                                <OptionIconImage src={value.icon} />
                                {value.text}
                            </OptionText>
                            <DropdownContainer>
                                <DropdownText onClick={() => toggleDropdown(typedKey)}>
                                    {dropdownStates[typedKey].selectedValue}
                                    <DropdownButtonImage src={images.dropdownArrow} isOpen={dropdownStates[typedKey].isOpen} />
                                </DropdownText>
                                <SmallDropdown
                                    arr={dropdownStates[typedKey].options}
                                    isOpen={dropdownStates[typedKey].isOpen}
                                    dropdownKey={typedKey}
                                    clickEvent={handleDetailChange}
                                />
                            </DropdownContainer>
                        </OptionDivider>
                    )
                })}

                <ButtonContainer>
                    <ResetButton onClick={handleReset}>전체 초기화</ResetButton>
                    <SaveButton onClick={handleSubmitClick}>{isProposalMode ? '제출하기' : '저장'}</SaveButton>
                </ButtonContainer>
            </OptionContainer>
        </PageContainer>
    );
};

// --- Styled Components ---
const PageContainer = styled.section`
    height: 100%;
    overflow-y: auto;
    padding-bottom: 1.5em;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar { display: none; }
`;
const ClickableTimeTitle = styled.h3`
    font-size: 15pt;
    font-weight: 400;
    cursor: pointer;
    transition: color 0.2s ease-in-out;
    color: ${props => props.theme.text1};
    &:hover {
        color: ${props => props.theme.accent};
    }
`;
const Title = styled.h1`
    font-size: 18pt;
    font-weight: 700;
    color: ${props => props.theme.text1};
`;
const WeekCalendarContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    justify-items: center;
    gap: 0.25em;
    margin-bottom: 1em;
`;
const TimeDivContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 0.5em 0.5em 0.5em;
`;
const TimeDivTitle = styled.p`
    display: flex;
    align-items: center;
    font-size: 14pt;
    font-weight: 600;
    margin: 0;
    color: ${props => props.theme.text1};
    cursor: pointer;
`;
const TimeSelectionTable = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
    gap: 0.5em;
    border-radius: 0.5em;
    justify-items: center;
    margin: 1em 0.5em 1em 0.5em;
`;
const OptionContainer = styled.section`
    display: grid;
    margin: 0.75em;
    gap: 1em;
`;
const OptionDivider = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const OptionIconImage = styled.img`
    width: 1em;
    height: 100%;
    margin: 0 0.5em 0 0;
    filter: ${props => props.theme.name === 'dark' ? 'invert(1)' : 'none'};
`;
const OptionText = styled.p`
    display: flex;
    align-items: center;
    font-size: 13pt;
    font-weight: 400;
    color: ${props => props.theme.text1};
`;
const ButtonContainer = styled.div`
    display: flex;
    gap: 0.5em;
    margin-top: 1em;
`;
const baseButton = styled.button`
    font-size: 12pt;
    width: 100%;
    border-radius: 0.5em;
    box-shadow: 0 1px 2px ${props => props.theme.shadow1};
    padding: 0.5em 1em;
    cursor: pointer;
    transition: all 0.2s ease;
`;
const ResetButton = styled(baseButton)`
    border: 1px solid ${props => props.theme.border1};
    background-color: ${props => props.theme.bg_element1};
    color: ${props => props.theme.text1};
    &:hover {
        background-color: ${props => props.theme.bg_element2};
    }
`;
const SaveButton = styled(baseButton)`
    color: white;
    background-color: ${props => props.theme.accent}; 
    border: 1px solid ${props => props.theme.accent};
    &:hover {
        filter: brightness(0.9);
    }
`;

export default RegisterPlan;