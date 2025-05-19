import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import DateBlocks from '../components/DateBlocks';
import DayBlock from '../components/DayBlock';
import { DropdownButtonImage, DropdownContainer, DropdownText, GrayLineDiv } from './Mainpage';

import TimeSelectionButton from '../components/TimeSelectionButton';
import { SmallDropdown } from '../components/SmallDropdown';
import { TimeSelectionObject } from '../types/TimeSelectionObject';
import { TimeSelectionDate } from '../types/DateFormat';
import { formatTime, getThisMonth, getThisWeek, getThisWeekDates, groupAndFormatTimes } from '../utils/TimeUtils';
import images from '../utils/ImportImages';
import { availableChannelOptions, DropdownItemState, priorityOptions, timeDivOptions, timeFilterOptions } from '../types/Dropdown';
import CheckModal from '../components/CheckModal';

const RegisterPlan: React.FC = () => {

    /* -- 변수들 -- **/
    const [TimeObject, setTimeObject] = useState<TimeSelectionObject[]>([]);
    // 12시간 크기의 숫자 배열 (분단위)
    const [allTheTimes, setAllTheTimes] = useState<number[]>(Array.from({ length: 48 }, (_, index) => index * 15));
    // 선택된 시간 처리를 위한 동적 배열
    const [selectedTimes, setSelectedTimes] = useState<number[]>([]);

    const [weekDates, setWeekDates] = useState<number[]>([]);

    useEffect(() => {
        setWeekDates(getThisWeekDates());
    }, []);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const toggleAndCloseModal = () => {
        setIsModalOpen(prev => !prev);
    }


    // 선택된 날짜를 저장하고 데이터를 처리하는 메소드
    const [selectedDates, setSelectedDates] = useState<number|null>();

    // 드롭다운의 열림 여부를 관리하는 변수 및 메소드
    type dropdownOptions = "timeDiv" | "timeFilter" |
                            "selectedTime" | "disclosureRange"
                            | "priority" | "availableChannel";

    type DropdownStatesWithOptions = {
        [key in dropdownOptions]: DropdownItemState;
    };

    const [dropdownStates, setDropdownStates] = useState<DropdownStatesWithOptions>({
        timeDiv: {
            isOpen: false,
            options: timeDivOptions,
            selectedValue: timeDivOptions[0]
        },
        timeFilter: {
            isOpen: false,
            options: timeFilterOptions,
            selectedValue: timeFilterOptions[1]
        },
        selectedTime: {
            isOpen: false,
            options: ["선택된 시간 전체"],
            selectedValue: ["선택된 시간 전체"][0]
        },
        disclosureRange: {
            isOpen: false,
            options: ["임의의 팀"],
            selectedValue: ["임의의 팀"][0]
        },
        priority: {
            isOpen: false,
            options: priorityOptions,
            selectedValue: priorityOptions[0]
        },
        availableChannel: {
            isOpen: false,
            options: availableChannelOptions,
            selectedValue: availableChannelOptions[0]
        }
    });

    const toggleDropdown = (dropdownKey: dropdownOptions) => {
        setDropdownStates(prev => ({
            ...prev,
            [dropdownKey]: {
                ...prev[dropdownKey], 
                isOpen: !prev[dropdownKey].isOpen
            }
        }));
    }

    const selectOption = (dropdownKey: dropdownOptions, value: string) => {
        setDropdownStates(prev => ({
            ...prev,
            [dropdownKey]: {
                ...prev[dropdownKey], 
                selectedValue: value,
                isOpen: false 
            }
        }));
    };

    /* 동적 데이터 처리를 위한 useEffect 메소드들 **/
    useEffect(() => {
        if (selectedDates) {
            const newSelectedDateObject: TimeSelectionDate = {
                year: new Date().getFullYear(),
                month: new Date().getMonth() + 1,
                day: selectedDates!
            };

            const prevIndex = TimeObject.findIndex((obj) => {
                return obj.date.day === selectedDates && obj.date.month == new Date().getMonth() + 1 && obj.date.year == new Date().getFullYear();
            });

            const sortedTimes = [...selectedTimes].sort();
            // 정렬된 배열에서 바로 다음 값의 차이가 timeFilter만큼 난다면 그 시간을 묶어 표기, selectedTime array에 push
            // ex) [0, 15, 30, 45, 90, 120] -> ["12:00 ~ 12:45", "1:30", "2:00"]
            const timeGap = () => {
                if (dropdownStates.timeFilter.selectedValue == "30분마다") return 30;
                else if (dropdownStates.timeFilter.selectedValue == "1시간마다") return 60;
                else return 15;
            }
            const formattedSelectedTimes = groupAndFormatTimes(sortedTimes, timeGap());
            setDropdownStates(prev => ({
                ...prev,
                selectedTime: {
                    ...prev.selectedTime,
                    options: ["선택된 시간 전체"].concat(formattedSelectedTimes),
                    selectedValue: "선택된 시간 전체"
                }
            }));
        
            // 선택된 날짜가 이미 존재하는 경우
            setTimeObject(prevTimeObject => {
                const newTimeObject = [...prevTimeObject];

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
                }

                if (prevIndex === -1) {
                    newTimeObject.push(newObject);
                } else {
                    newTimeObject[prevIndex] = newObject; // 일정이 있으면 업데이트
                }

                return newTimeObject;
            });
        }

    }, [selectedDates, selectedTimes]);

    // allTheTimes 배열과, selectedTime을 업데이트
    useEffect(() => {
        const newTimes: number[] = allTheTimes.map((t) => {
            if (dropdownStates.timeDiv.selectedValue === "오후" && allTheTimes[46] == 690) { // 오전이고, 배열이 정상
                return t + 720;
            } else if (dropdownStates.timeDiv.selectedValue === "오전" && allTheTimes[46] == 1410) { // 오후이고, 배열이 정상
                return t - 720;
            } else {
                return t
            }
        });
        setAllTheTimes(newTimes);
    }, [dropdownStates.timeDiv.selectedValue])

    useEffect(() => { // 선택된 날짜에 따라 시간 상태 업데이트
        const prevIndex = TimeObject.findIndex
        // eslint-disable-next-line no-unexpected-multiline
        ((obj) => { return obj.date.day === selectedDates && obj.date.month == new Date().getMonth() + 1 && obj.date.year == new Date().getFullYear();});

        if (prevIndex === -1) 
        {
            setSelectedTimes([]);
        } else {
            setSelectedTimes(TimeObject[prevIndex].times);
        }
    
    }, [selectedDates]);

    useEffect(() => {
        // 상태 업데이트마다 드롭다운 닫기
        setDropdownStates(prev => {
            return Object.fromEntries(
                Object.keys(prev).map(key => {
                    const typedKey = key as dropdownOptions;
                    return [typedKey, {
                        ...prev[typedKey],
                        isOpen: false
                    }];
                })
            ) as DropdownStatesWithOptions;
        });
        
        
        /*
        // 디버깅 로그
        console.log("Selected Date: ", selectedDates);
        console.log("Selected Time Div Filter: ", selectedTimeDivFilter);
        console.log("Selected Time Filter: ", selectedTimeFilter);
        **/
    }, [selectedDates, selectedTimes, dropdownStates.timeFilter.selectedValue]);

    const submitPlan = () => {
        const prevIndex = TimeObject.findIndex((obj) => {
            return obj.date.day === selectedDates && obj.date.month == new Date().getMonth() + 1 && obj.date.year == new Date().getFullYear();
        });
        if (prevIndex !== -1) {
            console.log(TimeObject[prevIndex]);
            toggleAndCloseModal();
            setTimeout(() => {
                toggleAndCloseModal();
            }, 3000)
        } else {
            alert("[오류] 날짜와 일정을 선택하세요!");
        }
        
    }

    return (
        <PageContainer>
        <CheckModal
            title='저장 완료'
            desc='일정이 저장되었습니다'
            isToggle={isModalOpen}
        />
        <TimeTitle>{getThisMonth()}월 {getThisWeek()}주차 &gt;</TimeTitle>
        <Title>미팅 가능 시간을 선택해주세요!</Title>
        <WeekCalendarContainer>
            <DateBlocks/>
            {   
                weekDates.map((date) => {
                    return (
                        <DayBlock
                            key={date.toString()}
                            date={date}
                            today={(date === selectedDates)}
                            color={undefined}
                            onClick={() => { setSelectedDates(date) }}
                        />
                    )
                })
            }
        </WeekCalendarContainer>
        <TimeDivContainer>
            <DropdownContainer>
                <TimeDivTitle>
                    {dropdownStates.timeDiv.selectedValue}
                    <DropdownButtonImage
                        src={images.dropdownArrow}
                        isOpen={dropdownStates.timeDiv.isOpen}
                        onClick={() => toggleDropdown('timeDiv')}
                    />
                </TimeDivTitle>
                <SmallDropdown
                    arr={dropdownStates.timeDiv.options}
                    isOpen={dropdownStates.timeDiv.isOpen}
                    dropdownKey="timeDiv"
                    clickEvent={selectOption}
                />
            </DropdownContainer>
            <DropdownContainer>
                <DropdownText>
                {dropdownStates.timeFilter.selectedValue}
                <DropdownButtonImage
                    src={images.dropdownArrow}
                    isOpen={dropdownStates.timeFilter.isOpen}
                    onClick={() => toggleDropdown('timeFilter')}
                />
                </DropdownText>
                <SmallDropdown
                arr={dropdownStates.timeFilter.options}
                isOpen={dropdownStates.timeFilter.isOpen}
                dropdownKey="timeFilter"
                clickEvent={selectOption}
                />
            </DropdownContainer>
            
            
        </TimeDivContainer>
        <GrayLineDiv/>
        <TimeSelectionTable selectedGap={30}>
            {
                allTheTimes.map((time) => {
                    // 오전, 오후 구분을 위한 시간 변환
                    // 30분마다로 설정되어 있으면, 30으로 나누어지지 않는 15분은 제외
                    if (dropdownStates.timeFilter.selectedValue == "30분마다" && time % 30 != 0) return null;

                    if (dropdownStates.timeFilter.selectedValue == "1시간마다" && time % 60 != 0) return null;

                    const formattedTime = formatTime(time);
                    return (
                        <TimeSelectionButton
                            setIsSelection={() => {
                                if (selectedDates) {
                                    if (selectedTimes.includes(time)) {
                                        setSelectedTimes(selectedTimes.filter(t => t !== time));
                                    } else {
                                        setSelectedTimes([...selectedTimes, time]);
                                    }
                                } else { 
                                    alert("[경고] 날짜를 먼저 선택해주세요!");
                                }
                                }
                            }
                            key={formattedTime}
                            time={formattedTime}
                            rawTime={time}
                            isSelection={selectedTimes.includes(time)}
                        />
                    )
                })
            }
        </TimeSelectionTable>
        <GrayLineDiv/>
        <OptionContainer>
            <OptionDivider>
                <OptionText>
                    <OptionIconImage src={images.clock}/>
                    선택시간대
                </OptionText>
                <DropdownContainer>
                    <DropdownText>
                        {dropdownStates.selectedTime.selectedValue}
                        <DropdownButtonImage
                            src={images.dropdownArrow}
                            isOpen={dropdownStates.selectedTime.isOpen}
                            onClick={() => toggleDropdown('selectedTime')}
                        />
                    </DropdownText>
                    <SmallDropdown
                        boxWidth="125%"
                        textSize="11pt"
                        arr={dropdownStates.selectedTime.options}
                        isOpen={dropdownStates.selectedTime.isOpen}
                        dropdownKey="selectedTime"
                        clickEvent={selectOption}
                    />
                </DropdownContainer>
            </OptionDivider>

            <OptionDivider>
                <OptionText>
                    <OptionIconImage src={images.thumbsup}/>
                    우선 순위
                </OptionText>
                <DropdownContainer>
                    <DropdownText>
                        {dropdownStates.priority.selectedValue}
                        <DropdownButtonImage
                            src={images.dropdownArrow}
                            isOpen={dropdownStates.priority.isOpen}
                            onClick={() => toggleDropdown('priority')}
                        />
                    </DropdownText>
                    <SmallDropdown
                        boxWidth="130%"
                        textSize="11pt"
                        left="-0.75em"
                        arr={dropdownStates.priority.options}
                        isOpen={dropdownStates.priority.isOpen}
                        dropdownKey="priority"
                        clickEvent={selectOption}
                    />
                </DropdownContainer>
            </OptionDivider>

            <OptionDivider>
                <OptionText>
                    <OptionIconImage src={images.lock}/>
                    공개 범위
                </OptionText>
                <DropdownContainer>
                    <DropdownText>
                        {dropdownStates.disclosureRange.selectedValue}
                        <DropdownButtonImage
                            src={images.dropdownArrow}
                            isOpen={dropdownStates.disclosureRange.isOpen}
                            onClick={() => toggleDropdown('disclosureRange')}
                        />
                    </DropdownText>
                    <SmallDropdown
                        textSize="11pt"
                        boxWidth="125%"
                        left="-0.5em"
                        arr={dropdownStates.disclosureRange.options}
                        isOpen={dropdownStates.disclosureRange.isOpen}
                        dropdownKey="disclosureRange"
                        clickEvent={selectOption}
                    />
                </DropdownContainer>
            </OptionDivider>

            <OptionDivider>
                <OptionText>
                    <OptionIconImage src={images.arrowdown}/>
                    참여가능 채널
                </OptionText>
                <DropdownContainer>
                    <DropdownText>
                        {dropdownStates.availableChannel.selectedValue}
                        <DropdownButtonImage
                            src={images.dropdownArrow}
                            isOpen={dropdownStates.availableChannel.isOpen}
                            onClick={() => toggleDropdown('availableChannel')}
                        />
                    </DropdownText>
                    <SmallDropdown
                        textSize="10pt"
                        boxWidth="125%"
                        arr={dropdownStates.availableChannel.options}
                        isOpen={dropdownStates.availableChannel.isOpen}
                        dropdownKey="availableChannel"
                        clickEvent={selectOption}
                    />
                </DropdownContainer>
            </OptionDivider>

            <OptionDivider>
            <OptionText>
                <OptionIconImage src={images.info}/>
                추가 설명
            </OptionText>
            </OptionDivider>
            <DescriptionTextBox
                onChange={(e) => {
                    const newTimeObject = [...TimeObject];
                    const prevIndex = newTimeObject.findIndex((obj) => {
                        return obj.date.day === selectedDates && obj.date.month == new Date().getMonth() + 1 && obj.date.year == new Date().getFullYear();
                    });
                    if (prevIndex !== -1) {
                        newTimeObject[prevIndex].details.description = e.target.value;
                        setTimeObject(newTimeObject);
                    }
                }
                }
                placeholder="가능한 일정에 대한 부연설명을 써보세요."
            />
            <ButtonContainer>
                <ResetButton>
                    초기화
                </ResetButton>
                <SaveButton onClick={() => {
                    submitPlan();
                }}>
                    저장
                </SaveButton>
            </ButtonContainer>
        </OptionContainer>

        </PageContainer>
    )
};

const PageContainer = styled.section`
    height: calc(100vh - 4em);
    overflow: scroll;
    padding-bottom: 1.5em;
    scroll: none;

    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */

    &::-webkit-scrollbar {
        display: none;
    }
`;

const TimeTitle = styled.h3`
    font-size: 15pt;
    font-weight: 400;
`;

const Title = styled.h1`
    font-size: 18pt;
    font-weight: 700;
`;

const WeekCalendarContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 2fr);
    justify-items: center;
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
    grid-template-rows: repeat(${props => ({
        15: 12,
        30: 6,
        60: 3
    }[props.selectedGap] || 6)}, 1fr);
    gap: 0.5em;
    border-radius: 0.5em;
    justify-items: center;
    margin: 1em 0.5em 1em 0.5em;
`
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
    border-bottom: 1px solid #BCBCBC;
    box-radius: 0.25em;
    transition: border-bottom ease 0.5s;

    &:focus {
        border-bottom: 1px solid #2693FF;
        outline: none;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    flex: 1;
    gap: 0.5em;
`;

const ResetButton = styled.button`
    font-size: 12pt;
    width: 100%;
    border-radius: 0.5em;
    border: 1px solid #C2C2C2;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
    padding: 0.25em 1em 0.25em 1em;
`;

const SaveButton = styled.button`
    font-size: 12pt;
    color: white;
    width: 100%;
    background-color: #2693FF; 
    border-radius: 0.5em;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
    padding: 0.25em 1em 0.25em 1em;
`;

export default RegisterPlan;