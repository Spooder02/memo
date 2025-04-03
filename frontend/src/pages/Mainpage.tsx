import styled from "styled-components";
import Calendar from "../components/Calendar";
import { useState } from "react";
import { CurrentDate } from "../types/DateFormat";

const Mainpage = () => {
    // 오늘의 년, 월
    const todayMonth = new Date().getMonth();
    const todayYear = new Date().getFullYear();
    
    const [currentDate, setCurrentDate] = useState<CurrentDate>({
        year: todayYear,
        month: todayMonth,
    });
    

    return (
        <PageFrame>
            <Title>
                안녕하세요, 미모님!
            </Title>
            <Description>
                2개의 일정이 매치되었습니다!
            </Description>
            <Calendar
                currentDate={currentDate}
                setCurrentDate={setCurrentDate}
            />
        </PageFrame>
    )
}

const Title = styled.p`
    font-size: 22pt;
    font-weight: 900;
`;

const Description = styled.p`
    font-size: 14pt;
    font-weight: 400;
`;

const PageFrame = styled.div`
    padding: 0.5em 1em 0.5em 1em;
`;

export default Mainpage;