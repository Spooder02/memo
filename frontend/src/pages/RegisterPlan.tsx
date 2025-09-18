import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import DateBlocks from '../components/DateBlocks';
import DayBlock from '../components/DayBlock';
import { DropdownButtonImage, DropdownContainer, DropdownText, GrayLineDiv } from './Mainpage';
import TimeSelectionButton from '../components/TimeSelectionButton';
import { SmallDropdown } from '../components/SmallDropdown';
import { TimeSelectionObject } from '../types/TimeSelectionObject';
import { TimeSelectionDate } from '../types/DateFormat';
import { formatTime, getMonth, getWeekDates, groupAndFormatTimes, getWeekInfo } from '../utils/TimeUtils';
import images from '../utils/ImportImages';
import { availableChannelOptions, DropdownItemState, priorityOptions, timeDivOptions, timeFilterOptions } from '../types/Dropdown';
import CheckModal from '../components/CheckModal';
import WeekSelectorModal from '../components/WeekSelectorModal';

const RegisterPlan: React.FC = () => {
    // --- 상태 관리 ---
    const [currentDate, setCurrentDate] = useState(new Date());
    const [isWeekModalOpen, setIsWeekModalOpen] = useState(false);
    const { week, month } = getWeekInfo(currentDate);

    const [TimeObject, setTimeObject] = useState<TimeSelectionObject[]>([]);
    const [selectedTimes, setSelectedTimes] = useState<number[]>([]);
    const [weekDates, setWeekDates] = useState<number[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDates, setSelectedDates] = useState<number|null>();

    const [dropdownStates, setDropdownStates] = useState<DropdownStatesWithOptions>({
        timeDiv: { isOpen: false, options: timeDivOptions, selectedValue: timeDivOptions[0] },
        timeFilter: { isOpen: false, options: timeFilterOptions, selectedValue: timeFilterOptions[1] },
        selectedTime: { isOpen: false, options: ["선택된 시간 전체"], selectedValue: "선택된 시간 전체" },
        disclosureRange: { isOpen: false, options: ["임의의 팀"], selectedValue: "임의의 팀" },
        priority: { isOpen: false, options: priorityOptions, selectedValue: priorityOptions[0] },
        availableChannel: { isOpen: false, options: availableChannelOptions, selectedValue: availableChannelOptions[0] }
    });

    // --- 핸들러 및 로직 ---
    useEffect(() => {
        setWeekDates(getWeekDates(currentDate));
    }, [currentDate]);

    const toggleAndCloseModal = () => setIsModalOpen(prev => !prev);

    const handleWeekChange = (newDate: Date) => {
        setCurrentDate(newDate);
        setSelectedDates(null);
        setIsWeekModalOpen(false);
    };

    const toggleDropdown = (dropdownKey: dropdownOptions) => {
        setDropdownStates(prev => {
            const isOpening = !prev[dropdownKey].isOpen;
            const closedState = Object.fromEntries(
                Object.keys(prev).map(key => [ key, { ...prev[key as dropdownOptions], isOpen: false }])
            ) as DropdownStatesWithOptions;
            return { ...closedState, [dropdownKey]: { ...prev[dropdownKey], isOpen: isOpening } };
        });
    };

    const selectOption = (dropdownKey: dropdownOptions, value: string) => {
        setDropdownStates(prev => ({ ...prev, [dropdownKey]: { ...prev[dropdownKey], selectedValue: value, isOpen: false } }));
    };

    useEffect(() => {
        if (selectedDates) {
            const newSelectedDateObject: TimeSelectionDate = {
                year: currentDate.getFullYear(),
                month: month,
                day: selectedDates!,
            };

            const sortedTimes = [...selectedTimes].sort((a, b) => a - b);
            const timeGap = () => {
                if (dropdownStates.timeFilter.selectedValue === "30분마다") return 30;
                if (dropdownStates.timeFilter.selectedValue === "1시간마다") return 60;
                return 15;
            };

            const formattedSelectedTimes = groupAndFormatTimes(sortedTimes, timeGap());
            setDropdownStates(prev => ({
                ...prev,
                selectedTime: {
                    ...prev.selectedTime,
                    options: ["선택된 시간 전체"].concat(formattedSelectedTimes),
                    selectedValue: "선택된 시간 전체"
                }
            }));
        
            setTimeObject(prevTimeObject => {
                const newTimeObject = [...prevTimeObject];
                const prevIndex = newTimeObject.findIndex(obj => 
                    obj.date.day === selectedDates && obj.date.month === month && obj.date.year === currentDate.getFullYear()
                );
                const newObject: TimeSelectionObject = {  
                    date: newSelectedDateObject,
                    times: selectedTimes,
                    details: {
                        selectedTime: dropdownStates.selectedTime.selectedValue,
                        priority: dropdownStates.priority.selectedValue,
                        disclosureRange: dropdownStates.disclosureRange.selectedValue,
                        availableChannel: dropdownStates.availableChannel.selectedValue,
                        description: ""
                    }
                };
                if (prevIndex === -1) {
                    newTimeObject.push(newObject);
                } else {
                    newTimeObject[prevIndex] = newObject;
                }
                return newTimeObject;
            });
        }
    }, [selectedDates, selectedTimes, currentDate, dropdownStates.timeFilter.selectedValue, dropdownStates.priority.selectedValue, dropdownStates.disclosureRange.selectedValue, dropdownStates.availableChannel.selectedValue, month, dropdownStates.selectedTime.selectedValue]);

    useEffect(() => {
        const prevIndex = TimeObject.findIndex(obj => 
            obj.date.day === selectedDates && obj.date.month === month && obj.date.year === currentDate.getFullYear()
        );
        setSelectedTimes(prevIndex === -1 ? [] : TimeObject[prevIndex].times);
    }, [selectedDates, currentDate, TimeObject, month]);

    const submitPlan = () => {
        const prevIndex = TimeObject.findIndex(obj => 
            obj.date.day === selectedDates && obj.date.month === month && obj.date.year === currentDate.getFullYear()
        );
        if (prevIndex !== -1) {
            console.log(TimeObject[prevIndex]);
            toggleAndCloseModal();
            setTimeout(() => toggleAndCloseModal(), 3000);
        } else {
            alert("[오류] 날짜와 일정을 선택하세요!");
        }
    };

    // --- 렌더링 로직: 파생 변수 생성 ---
    const baseTimes = Array.from({ length: 48 }, (_, index) => index * 15);
    const displayTimes = dropdownStates.timeDiv.selectedValue === '오후'
        ? baseTimes.map(t => t + 720)
        : baseTimes;

    return (
        <PageContainer>
            <CheckModal title='저장 완료' desc='일정이 저장되었습니다' isToggle={isModalOpen} />
            <WeekSelectorModal
                isOpen={isWeekModalOpen}
                onClose={() => setIsWeekModalOpen(false)}
                currentDate={currentDate}
                onWeekSelect={handleWeekChange}
            />

            <ClickableTimeTitle onClick={() => setIsWeekModalOpen(true)}>
                {`${month}월 ${week}주차 `} &gt;
            </ClickableTimeTitle>

            <Title>미팅 가능 시간을 선택해주세요!</Title>

            <WeekCalendarContainer>
                <DateBlocks/>
                {weekDates.map((date, index) => (
                    <DayBlock
                        key={`${month}-${date}-${index}`}
                        date={date}
                        today={(date === selectedDates)}
                        color={undefined}
                        onClick={() => setSelectedDates(date)}
                    />
                ))}
            </WeekCalendarContainer>

            <TimeDivContainer>
                <DropdownContainer>
                    <TimeDivTitle>
                        {dropdownStates.timeDiv.selectedValue}
                        <DropdownButtonImage src={images.dropdownArrow} isOpen={dropdownStates.timeDiv.isOpen} onClick={() => toggleDropdown('timeDiv')} />
                    </TimeDivTitle>
                    <SmallDropdown arr={dropdownStates.timeDiv.options} isOpen={dropdownStates.timeDiv.isOpen} dropdownKey="timeDiv" clickEvent={selectOption} />
                </DropdownContainer>
                <DropdownContainer>
                    <DropdownText>
                        {dropdownStates.timeFilter.selectedValue}
                        <DropdownButtonImage src={images.dropdownArrow} isOpen={dropdownStates.timeFilter.isOpen} onClick={() => toggleDropdown('timeFilter')} />
                    </DropdownText>
                    <SmallDropdown arr={dropdownStates.timeFilter.options} isOpen={dropdownStates.timeFilter.isOpen} dropdownKey="timeFilter" clickEvent={selectOption} />
                </DropdownContainer>
            </TimeDivContainer>

            <GrayLineDiv/>
            
            <TimeSelectionTable selectedGap={30}>
                {displayTimes.map(time => {
                    if ((dropdownStates.timeFilter.selectedValue === "30분마다" && time % 30 !== 0) ||
                        (dropdownStates.timeFilter.selectedValue === "1시간마다" && time % 60 !== 0)) {
                        return null;
                    }
                    const formattedTime = formatTime(time);
                    return (
                        <TimeSelectionButton
                            key={formattedTime}
                            time={formattedTime}
                            rawTime={time}
                            isSelection={selectedTimes.includes(time)}
                            setIsSelection={() => {
                                if (selectedDates) {
                                    setSelectedTimes(prev => 
                                        prev.includes(time) ? prev.filter(t => t !== time) : [...prev, time]
                                    );
                                } else {
                                    alert("[경고] 날짜를 먼저 선택해주세요!");
                                }
                            }}
                        />
                    );
                })}
            </TimeSelectionTable>

            <GrayLineDiv/>

            <OptionContainer>
                {Object.entries({
                    selectedTime: { icon: images.clock, text: "선택시간대" },
                    priority: { icon: images.thumbsup, text: "우선 순위" },
                    disclosureRange: { icon: images.lock, text: "공개 범위" },
                    availableChannel: { icon: images.arrowdown, text: "참여가능 채널" },
                }).map(([key, value]) => (
                    <OptionDivider key={key}>
                        <OptionText>
                            <OptionIconImage src={value.icon} />
                            {value.text}
                        </OptionText>
                        <DropdownContainer>
                            <DropdownText onClick={() => toggleDropdown(key as dropdownOptions)}>
                                {dropdownStates[key as dropdownOptions].selectedValue}
                                <DropdownButtonImage src={images.dropdownArrow} isOpen={dropdownStates[key as dropdownOptions].isOpen} />
                            </DropdownText>
                            <SmallDropdown
                                arr={dropdownStates[key as dropdownOptions].options}
                                isOpen={dropdownStates[key as dropdownOptions].isOpen}
                                dropdownKey={key as dropdownOptions}
                                clickEvent={selectOption}
                            />
                        </DropdownContainer>
                    </OptionDivider>
                ))}

                <OptionDivider>
                    <OptionText>
                        <OptionIconImage src={images.info}/>
                        추가 설명
                    </OptionText>
                </OptionDivider>
                <DescriptionTextBox
                    onChange={(e) => {
                        const newTimeObject = [...TimeObject];
                        const prevIndex = newTimeObject.findIndex(obj => 
                            obj.date.day === selectedDates && obj.date.month === month && obj.date.year === currentDate.getFullYear()
                        );
                        if (prevIndex !== -1) {
                            newTimeObject[prevIndex].details.description = e.target.value;
                            setTimeObject(newTimeObject);
                        }
                    }}
                    placeholder="가능한 일정에 대한 부연설명을 써보세요."
                />
                <ButtonContainer>
                    <ResetButton>초기화</ResetButton>
                    <SaveButton onClick={submitPlan}>저장</SaveButton>
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
    &:hover {
        color: #2693FF;
    }
`;

const Title = styled.h1`
    font-size: 18pt;
    font-weight: 700;
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
`;

const TimeSelectionTable = styled.div<{selectedGap: number}>`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.5em;
    border-radius: 0.5em;
    justify-items: center;
    margin: 1em 0.5em 1em 0.5em;
`;

const OptionContainer = styled.section`
    display: grid;
    margin: 0.75em;
    gap: 0.75em;
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
`;

const OptionText = styled.p`
    display: flex;
    align-items: center;
    font-size: 13pt;
    font-weight: 400;
`;

const DescriptionTextBox = styled.textarea`
    border: none;
    border-bottom: 1px solid #BCBCBC;
    transition: border-bottom ease 0.5s;
    padding: 0.5em 0;
    font-family: inherit;
    font-size: 11pt;
    resize: vertical;
    min-height: 3em;

    &:focus {
        border-bottom: 1px solid #2693FF;
        outline: none;
    }
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
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
    padding: 0.5em 1em;
    cursor: pointer;
    transition: all 0.2s ease;
`;

const ResetButton = styled(baseButton)`
    border: 1px solid #C2C2C2;
    background-color: #FFFFFF;
    &:hover {
        background-color: #f5f5f5;
    }
`;

const SaveButton = styled(baseButton)`
    color: white;
    background-color: #2693FF; 
    border: 1px solid #2693FF;
    &:hover {
        background-color: #1a83e6;
    }
`;

export default RegisterPlan;