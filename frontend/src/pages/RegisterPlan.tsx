import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import DateBlocks from '../components/DateBlocks';
import DayBlock from '../components/DayBlock';
import { DropdownButtonImage, DropdownText, GrayLineDiv } from './Mainpage';
import DropdownButton from "../assets/drop-down-arrow (1).png";

const RegisterPlan: React.FC = () => {

    const getThisWeekDates = () => {
        const today = new Date();
        const day = today.getDay(); // 0(일) ~ 6(토)
        const sundayOffset = -day;
        
        return Array.from({ length: 7 }, (_, i) => {
            const d = new Date(today);
            d.setDate(today.getDate() + sundayOffset + i);
            return d.getDate();  // 날짜(1~31)만 반환
        });
    }


    const [weekDates, setWeekDates] = useState<number[]>([]);

    useEffect(() => {
        setWeekDates(getThisWeekDates());
    }, []);

    const [selectedDates, setSelectedDates] = useState<number|null>();

    // 오전 및 오후 구분 필터
    const timeDivFilter = ["오전", "오후"];
    const [selectTimeDivFilter, setSelectedTimeDivFilter] = useState<string>(timeDivFilter[0]);

    const [timeDivDropdownOpen, setTimeDivFilterDropdownOpen] = useState(false);

    const toggleTimeDivDropdown = () => {
        setTimeDivFilterDropdownOpen((prev) => !prev);
    };

    // 시간 간격 구분 필터
    const timeFilters = ["15분마다", "30분마다", "1시간마다"];
    const [selectTimeFilter, setSelectedTimeFilter] = useState<string>(timeFilters[1]);
    const [timeFilterDropdownOpen, setTimeFilterDropdownOpen] = useState(false);

    const toggleTimeFilterDropdown = () => {
        setTimeFilterDropdownOpen((prev) => !prev);
    };

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
                            today={(date == selectedDates)}
                            color={undefined}
                            onClick={() => { setSelectedDates(date) }}
                        />
                    )
                })
            }
        </WeekCalendarContainer>
        <TimeDivContainer>
            <TimeDivTitle>
                {selectTimeDivFilter}
                <DropdownButtonImage
                    src={DropdownButton}
                    isOpen={timeDivDropdownOpen}
                    onClick={toggleTimeDivDropdown}
                />
            </TimeDivTitle>
            <DropdownText>
                {selectTimeFilter}
                <DropdownButtonImage
                    src={DropdownButton}
                    isOpen={timeFilterDropdownOpen}
                    onClick={toggleTimeFilterDropdown}
                />
            </DropdownText>
        </TimeDivContainer>
        <GrayLineDiv/>
        
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

export default RegisterPlan;