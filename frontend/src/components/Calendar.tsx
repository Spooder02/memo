import styled from "styled-components";
import DayBlock from "./DayBlock";
import DateBlock from "./DateBlock";
import arrow from "../assets/playbutton.png"
import { useState } from "react";

const Calendar = () => {
    // 오늘의 년, 월
    const todayMonth = new Date().getMonth();
    const todayYear = new Date().getFullYear();

    // 현재 가리키는 년. 월
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());

    // 캘린더 출력을 위한 변수
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const totalDays = daysInMonth(currentMonth, currentYear);
    const currentDay = new Date().getDay();

    const changeMonth = (add: boolean) => {
        if (add) { // 더할 때
            if (currentMonth >= 11) { // 12월이라면
                setCurrentYear(prev => prev + 1);
                setCurrentMonth(1);
            } else {
                setCurrentMonth(prev => prev + 1);
            }
        } else { // 뺄 떄
            if (currentMonth <= 0) { // 1월이라면
                setCurrentYear(prev => prev - 1); // 년도를 옮기고
                setCurrentMonth(11); // 12월부터 다시 돌아가도록
            } else {
                setCurrentMonth(prev => prev - 1);
            }
        }
    }

    const daysArray = Array.from({ length: totalDays }, (_, i) => i + 1);
    const emptyDays = Array.from({ length: firstDay }, () => null); 
    return (
        <Frame>
            <MonthTitle>
                <ChangeDateButton
                    right={false}
                    onClick={() => changeMonth(false)}
                />
                    {currentYear}년 {currentMonth+1}월
                <ChangeDateButton
                    right={true}
                    onClick={() => changeMonth(true)}
                />
            </MonthTitle>
            <CalendarFrame>
                {
                    Array.from({ length: 7 }, (_, index) => (
                        <DateBlock key={index} index={index} />
                    ))
                }
                {
                    emptyDays.map((_, index) => (
                        <div key={`empty-${index}`} className="day empty"></div>
                    ))}
                {   
                    daysArray.map((date) => (
                        <DayBlock
                            date={date}
                            today={(
                                todayYear == currentYear &&
                                todayMonth == currentMonth && currentDay-1 == date)? true: false}
                        />
                    ))
                }
            </CalendarFrame>
        </Frame>
    )
}

const daysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
};

const CalendarFrame = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 5px;
`;

const Frame = styled.div`
    width: 90vw;
    height: 40vh;
    padding: 1em 0 1em 0;
    margin: auto;
`;

const MonthTitle = styled.p`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    font-size: 18pt;
`;

const ChangeDateButton = styled.button<{right: boolean}>`
    width: 14px;
    height: 14px;
    transform: rotate(${(props) => props.right? '0':'180'}deg);
    background-size: cover;
    background-image: url(${arrow});
    background-repeat: no-repeat;
    margin: 0 0.5em 0 0.5em;
`;

export default Calendar;