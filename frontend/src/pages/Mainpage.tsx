import styled from "styled-components";
import Calendar from "../components/Calendar";
import { useState } from "react";
import { CurrentDate } from "../types/DateFormat";
import UpcomingPlanCard from "../components/UpcomingPlanCard";
import DropdownButton from "../assets/drop-down-arrow (1).png";

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
            <GrayLineDiv/>
            <PlanContainer>
                <PlanTitleContainer>
                    <PlanText>다가오는 일정</PlanText>
                    <DropdownText>
                        최신순
                        <DropdownButtonImage src={DropdownButton}/>
                    </DropdownText>
                </PlanTitleContainer>
                <UpcomingPlanContainer>
                    <UpcomingPlanCard/>
                </UpcomingPlanContainer>
            </PlanContainer>
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

const DropdownText = styled.p`
    display: flex;
    align-items: center;
    font-size: 10pt;
    font-weight: 400;
    color: #595959;
    
`;

const PlanText = styled.p`
    font-size: 12pt;
    font-weight: 500;
`;

const PageFrame = styled.div`
    padding: 0.5em 1em 0.5em 1em;
`;

const GrayLineDiv = styled.div`
    width: 100%; 
    height: 1px;
    background-color: #DCDCDC;
    border-radius: 1px;
`;

const PlanContainer = styled.div`

`;

const PlanTitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75em;
`;

const UpcomingPlanContainer = styled.div`
    width: 100%;
    padding: 0 0.75em 0 0.75em;
    overflow: scroll-y;
`;

const DropdownButtonImage = styled.img`
    height: 0.75em;
    margin: 0 0 0 0.15em;
`;

export default Mainpage;