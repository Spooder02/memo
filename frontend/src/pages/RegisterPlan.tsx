import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import DateBlocks from '../components/DateBlocks';
import DayBlock from '../components/DayBlock';
import { DropdownButtonImage, DropdownContainer, DropdownText, GrayLineDiv } from './Mainpage';

import TimeSelectionButton from '../components/TimeSelectionButton';
import { SmallDropdown } from '../components/SmallDropdown';
import { TimeSelectionObject } from '../types/TimeSelectionObject';
import { TimeSelectionDate } from '../types/DateFormat';
import { formatTime, getThisWeekDates } from '../utils/TimeUtils';
import images from '../utils/ImportImages';

const RegisterPlan: React.FC = () => {

    /* -- 변수들 -- **/
    const [TimeObject, setTimeObject] = useState<TimeSelectionObject[]>([]);
    // 12시간 크기의 숫자 배열 (분단위)
    const [allTheTimes, setAllTheTimes] = useState<number[]>(Array.from({ length: 48 }, (_, index) => index * 15));
    // 선택된 시간 처리를 위한 동적 배열
    const [selectedTimes, setSelectedTimes] = useState<number[]>([]);

    const [weekDates, setWeekDates] = useState<number[]>([]);

    // 시간 간격 구분 필터
    const timeFilters = ["15분마다", "30분마다", "1시간마다"];
    const [selectedTimeFilter, setSelectedTimeFilter] = useState<string>(timeFilters[1]);
    const [timeFilterDropdownOpen, setTimeFilterDropdownOpen] = useState(false);

    useEffect(() => {
        setWeekDates(getThisWeekDates());
    }, []);

    // 오전 및 오후 구분 필터
    const timeDivFilter = ["오전", "오후"];
    const [selectedTimeDivFilter, setSelectedTimeDivFilter] = useState<string>(timeDivFilter[0]);

    const [timeDivDropdownOpen, setTimeDivFilterDropdownOpen] = useState(false);

    // 선택된 날짜를 저장하고 데이터를 처리하는 메소드
    const [selectedDates, setSelectedDates] = useState<number|null>();
    const [selectedDateObject, setSelectedDateObject] = useState<TimeSelectionDate | null>(null);


    /* -- 기타 메소드들 -- **/
    const toggleTimeFilterDropdown = () => {
        setTimeFilterDropdownOpen((prev) => !prev);
    };

    const toggleTimeDivDropdown = () => {
        setTimeDivFilterDropdownOpen((prev) => !prev);
    };


    /* 동적 데이터 처리를 위한 useEffect 메소드들 **/
    useEffect(() => {
        if (selectedDates) {
            const newSelectedDateObject: TimeSelectionDate = {
                year: new Date().getFullYear(),
                month: new Date().getMonth() + 1,
                day: selectedDates!
            };

            setSelectedDateObject(newSelectedDateObject);

            const prevIndex = TimeObject.findIndex((obj) => {
                return obj.date.day === selectedDates && obj.date.month == new Date().getMonth() + 1 && obj.date.year == new Date().getFullYear();
            });
        
            // 선택된 날짜가 이미 존재하는 경우
            setTimeObject(prevTimeObject => {
                const newTimeObject = [...prevTimeObject];

                const newObject: TimeSelectionObject = {
                    date: newSelectedDateObject,
                    times: selectedTimes
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
            if (selectedTimeDivFilter === "오후" && allTheTimes[46] == 690) { // 오전이고, 배열이 정상
                return t + 720;
            } else if (selectedTimeDivFilter === "오전" && allTheTimes[46] == 1410) { // 오후이고, 배열이 정상
                return t - 720;
            } else {
                return t
            }
        });
        setAllTheTimes(newTimes);
    }, [selectedTimeDivFilter])

    useEffect(() => {
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
        console.log("Selected Time Object: ", TimeObject);
    }, [TimeObject]);

    useEffect(() => {
        // 상태 업데이트마다 드롭다운 닫기
        setTimeFilterDropdownOpen(false);
        setTimeDivFilterDropdownOpen(false);
        
        /*
        // 디버깅 로그
        console.log("Selected Date: ", selectedDates);
        console.log("Selected Time Div Filter: ", selectedTimeDivFilter);
        console.log("Selected Time Filter: ", selectedTimeFilter);
        **/
    }, [selectedDates, selectedTimeDivFilter, selectedTimeFilter]);

    return (
        <>
        <TimeTitle>4월 4주차 &gt;</TimeTitle>
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
                    {selectedTimeDivFilter}
                    <DropdownButtonImage
                        src={images.dropdownArrow}
                        isOpen={timeDivDropdownOpen}
                        onClick={toggleTimeDivDropdown}
                    />
                </TimeDivTitle>
                <SmallDropdown
                    arr={timeDivFilter}
                    isOpen={timeDivDropdownOpen}
                    clickEvent={setSelectedTimeDivFilter}
                />
            </DropdownContainer>
            <DropdownContainer>
                <DropdownText>
                {selectedTimeFilter}
                <DropdownButtonImage
                    src={images.dropdownArrow}
                    isOpen={timeFilterDropdownOpen}
                    onClick={toggleTimeFilterDropdown}
                />
                </DropdownText>
                <SmallDropdown
                arr={timeFilters}
                isOpen={timeFilterDropdownOpen}
                clickEvent={setSelectedTimeFilter}
                />
            </DropdownContainer>
            
            
        </TimeDivContainer>
        <GrayLineDiv/>
        <TimeSelectionTable selectedGap={30}>
            {
                allTheTimes.map((time) => {
                    // 오전, 오후 구분을 위한 시간 변환
                    // 30분마다로 설정되어 있으면, 30으로 나누어지지 않는 15분은 제외
                    if (selectedTimeFilter == "30분마다" && time % 30 != 0) return null;

                    if (selectedTimeFilter == "1시간마다" && time % 60 != 0) return null;

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
            
        </OptionContainer>
        </>
    )
};

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

const OptionContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 0 0.5em 0.5em 0.5em;
`;

const OptionIconImage = styled.img`
    width: 2em;
    
`;

export default RegisterPlan;