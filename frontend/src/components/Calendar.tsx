import styled from "styled-components";
import DayBlock from "./DayBlock";

import { CalendarProps } from "../types/DateFormat";
import { SimplePlan } from "../types/PlanFormat";
import simplePlansData from "../assets/SimplePlans.json";
import DateBlocks from "./DateBlocks";
import images from "../utils/ImportImages";

const Calendar:React.FC<CalendarProps> = ({ currentDate, setCurrentDate }) => {
    const planData: SimplePlan[] = simplePlansData;

    // 오늘의 년, 월
    const todayMonth = new Date().getMonth();
    const todayYear = new Date().getFullYear();

    // 캘린더 출력을 위한 변수
    const firstDay = getFirstDayOfMonth(currentDate.month, currentDate.year);
    const totalDays = daysInMonth(currentDate.month, currentDate.year);
    const currentDay = new Date().getDate();

    const isSameDate = (comparedDate: string, currentDay: number): boolean => {
        const scheduleDate = new Date(comparedDate);
        return (
          scheduleDate.getFullYear() === currentDate.year &&
          scheduleDate.getMonth() === currentDate.month &&
          scheduleDate.getDate() === currentDay
        );
      }
      

    const changeMonth = (add: boolean) => {
        setCurrentDate(prev => {
            const newMonth = add ? prev.month + 1 : prev.month - 1;
            let newYear = prev.year;

            if (newMonth > 11) { // 12월 넘어갈 때
                newYear += 1;
                return { year: newYear, month: 0 }; // 1월로 돌아감
            } else if (newMonth < 0) { // 1월 이전으로 갈 때
                newYear -= 1;
                return { year: newYear, month: 11 }; // 12월로 돌아감
            }

            return { year: newYear, month: newMonth };
        });
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
                    {currentDate.year}년 {currentDate.month+1}월
                <ChangeDateButton
                    right={true}
                    onClick={() => changeMonth(true)}
                />
            </MonthTitle>
            <CalendarFrame>
                <DateBlocks/>
                {
                    emptyDays.map((_, index) => (
                        <div key={`empty-${index}`} className="day empty"></div>
                    ))}
                {   
                    daysArray.map((date) => {
                        const planForDay = planData.find(p =>
                            isSameDate(p.dayLeft, date)
                        );

                        return (
                            <DayBlock
                                key={date}
                                date={date}
                                today={(
                                    todayYear == currentDate.year &&
                                    todayMonth == currentDate.month && currentDay == date).valueOf()}
                                color={planForDay? planForDay.color : undefined}
                            />
                        )
                    })
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
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90vw;
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
    background-image: url(${images.playbutton});
    background-repeat: no-repeat;
    margin: 0 0.5em 0 0.5em;
`;

export default Calendar;