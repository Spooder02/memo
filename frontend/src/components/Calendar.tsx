import React, { useState } from 'react';
import styled from "styled-components";
import DayBlock from "./DayBlock";
import { CalendarProps } from "../types/DateFormat";
import { SimplePlan } from "../types/PlanFormat";
import simplePlansData from "../assets/SimplePlans.json";
import DateBlocks from "./DateBlocks";
import images from "../utils/ImportImages";
import MonthPickerModal from './MonthPickerModal';

const Calendar:React.FC<CalendarProps> = ({ currentDate, setCurrentDate }) => {
    // --- 상태 관리 ---
    const [isModalOpen, setIsModalOpen] = useState(false);

    // --- 데이터 및 변수 선언 ---
    const planData: SimplePlan[] = simplePlansData;
    const todayMonth = new Date().getMonth();
    const todayYear = new Date().getFullYear();
    const firstDay = getFirstDayOfMonth(currentDate.month, currentDate.year);
    const totalDays = daysInMonth(currentDate.month, currentDate.year);
    const currentDay = new Date().getDate();
    const daysArray = Array.from({ length: totalDays }, (_, i) => i + 1);
    const emptyDays = Array.from({ length: firstDay }, () => null); 

    // --- 핸들러 함수 ---
    const isSameDate = (comparedDate: string, currentDay: number): boolean => {
        const scheduleDate = new Date(comparedDate);
        return (
          scheduleDate.getFullYear() === currentDate.year &&
          scheduleDate.getMonth() === currentDate.month &&
          scheduleDate.getDate() === currentDay
        );
    };
      
    const changeMonth = (add: boolean) => {
        setCurrentDate(prev => {
            const newMonth = add ? prev.month + 1 : prev.month - 1;
            let newYear = prev.year;

            if (newMonth > 11) {
                newYear += 1;
                return { year: newYear, month: 0 };
            } else if (newMonth < 0) {
                newYear -= 1;
                return { year: newYear, month: 11 };
            }
            return { year: newYear, month: newMonth };
        });
    };

    const handleMonthSelect = (year: number, month: number) => {
        setCurrentDate({ year, month });
        setIsModalOpen(false);
    };

    return (
        <Container>
            {isModalOpen && (
                <MonthPickerModal
                    currentDate={currentDate}
                    onClose={() => setIsModalOpen(false)}
                    onSelect={handleMonthSelect}
                />
            )}

            <MonthTitle>
                <ChangeDateButton
                    right={false}
                    onClick={() => changeMonth(false)}
                />
                <ClickableMonth onClick={() => setIsModalOpen(true)}>
                    {currentDate.year}년 {currentDate.month+1}월
                </ClickableMonth>
                <ChangeDateButton
                    right={true}
                    onClick={() => changeMonth(true)}
                />
            </MonthTitle>
            <CalendarFrame>
                <DateBlocks/>
                {emptyDays.map((_, index) => <div key={`empty-${index}`} />)}
                {daysArray.map((date) => {
                    const planForDay = planData.find(p => isSameDate(p.dayLeft, date));
                    return (
                        <DayBlock
                            key={date}
                            date={date}
                            today={(todayYear === currentDate.year && todayMonth === currentDate.month && currentDay === date)}
                            color={planForDay? planForDay.color : undefined}
                        />
                    )
                })}
            </CalendarFrame>
        </Container>
    )
}

// --- 헬퍼 함수 ---
const daysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (month: number, year: number) => new Date(year, month, 1).getDay();

// --- Styled Components ---
const Container = styled.div`
    margin: 1em 0 1em 0;
`;

const MonthTitle = styled.p`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    font-size: 18pt;
    color: ${props => props.theme.text1};
`;

const ClickableMonth = styled.span`
    cursor: pointer;
    padding: 0.25em 0.5em;
    border-radius: 0.5em;
    transition: background-color 0.2s ease-in-out;

    &:hover {
        background-color: ${props => props.theme.bg_element2};
    }
`;

const ChangeDateButton = styled.button<{right: boolean}>`
    width: 14px;
    height: 14px;
    transform: rotate(${(props) => props.right? '0':'180'}deg);
    background-size: cover;
    background-image: url(${images.playbutton});
    background-repeat: no-repeat;
    margin: 0 0.5em 0 0.5em;
    transition: filter 0.2s;

    /* 다크모드일 때 아이콘 색상을 반전시킴 */
    filter: ${props => props.theme.name === 'dark' ? 'invert(1)' : 'none'};
`;

const CalendarFrame = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 5px;
`;

export default Calendar;