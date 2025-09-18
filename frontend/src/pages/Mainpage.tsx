import styled from "styled-components";
import Calendar from "../components/Calendar";
import { useEffect, useState } from "react";
import { CurrentDate } from "../types/DateFormat";
import UpcomingPlanCard from "../components/UpcomingPlanCard";
import simplePlansData from "../assets/SimplePlans.json";
import { SimplePlan } from "../types/PlanFormat";
import images from "../utils/ImportImages";
import { DropdownItem } from "../components/SmallDropdown";

const Mainpage = () => {
    // --- 상태 관리 ---
    const [plans, setPlans] = useState<SimplePlan[]>(simplePlansData);
    const [sortedPlans, setSortedPlans] = useState<SimplePlan[]>([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState<string>("임박순");
    const [currentDate, setCurrentDate] = useState<CurrentDate>({
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
    });

    // --- 남은 일정 개수 계산 ---
    const futurePlans = plans.filter(p => new Date(p.dayLeft) >= new Date());

    // --- D-day 계산 함수 ---
    const getDday = (timeLeft: string) => {
        const today = new Date();
        const targetDate = new Date(timeLeft);
        today.setHours(0, 0, 0, 0);
        targetDate.setHours(0, 0, 0, 0);
        return (targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
    }

    // --- 정렬 로직 ---
    useEffect(() => {
        let newSortedData = [...plans];
        if (selectedFilter === "임박순") {
            newSortedData.sort((a, b) => new Date(a.dayLeft).getTime() - new Date(b.dayLeft).getTime());
        } else if (selectedFilter === "먼 날짜순") {
            newSortedData.sort((a, b) => new Date(b.dayLeft).getTime() - new Date(a.dayLeft).getTime());
        } else if (selectedFilter === "팀 규모순") {
            newSortedData.sort((a, b) => b.teamScale - a.teamScale);
        }
        setSortedPlans(newSortedData);
    }, [selectedFilter, plans]);

    const filteredPlans = sortedPlans.filter(data => getDday(data.dayLeft) >= 0);

    return (
        <PageFrame>
            {/* 상단 컨텐츠 영역 (달력까지) */}
            <div>
                <Title>안녕하세요, 미모님!</Title>
                <Description>{futurePlans.length}개의 일정이 매치되었습니다!</Description>
                <Calendar currentDate={currentDate} setCurrentDate={setCurrentDate} />
                <GrayLineDiv/>
            </div>

            {/* 하단 컨텐츠 영역 (다가오는 일정) */}
            <PlanContainer>
                <PlanTitleContainer>
                    <PlanText>다가오는 일정</PlanText>
                    <DropdownContainer>
                        <DropdownText onClick={() => setDropdownOpen(prev => !prev)}>
                            {selectedFilter}
                            <DropdownButtonImage src={images.dropdownArrow} isOpen={dropdownOpen} />
                        </DropdownText>
                        {dropdownOpen && (
                            <Dropdown>
                                {["임박순", "먼 날짜순", "팀 규모순"].map((name) => (
                                    <DropdownItem
                                        key={name}
                                        onClick={() => {
                                            setSelectedFilter(name);
                                            setDropdownOpen(false);
                                        }}
                                    >
                                        {name}
                                    </DropdownItem>
                                ))}
                            </Dropdown>
                        )}
                    </DropdownContainer>
                </PlanTitleContainer>

                <UpcomingPlanContainer>
                    {filteredPlans.filter(data => getDday(data.dayLeft) > 0).length > 0 ? (
                        filteredPlans
                            .filter(data => getDday(data.dayLeft) > 0) 
                            .map((data) => (
                                <UpcomingPlanCard key={data.id} plan={data} dday={getDday(data.dayLeft)} />
                            ))
                    ) : (
                        <NoPlanText>예정된 계획이 없습니다.</NoPlanText>
                    )}
                </UpcomingPlanContainer>
            </PlanContainer>
        </PageFrame>
    );
}

// --- Styled Components ---

export const PageFrame = styled.div`
    display: flex;
    flex-direction: column;
    height: calc(100% - 3.5em);
`;

const Title = styled.p`
    font-size: 22pt;
    font-weight: 900;
`;

const Description = styled.p`
    font-size: 14pt;
    font-weight: 400;
`;

export const GrayLineDiv = styled.div`
    width: 100%; 
    height: 1px;
    background-color: #DCDCDC;
    border-radius: 1px;
`;

const PlanContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const PlanTitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75em;
`;

const PlanText = styled.p`
    font-size: 12pt;
    font-weight: 500;
`;

const UpcomingPlanContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0 0.75em 0.75em 0.75em;
    overflow-y: auto;
    margin: 0 0 1em 0;
    gap: 0.5em;
    border-radius: 0.25em;
`;

export const DropdownContainer = styled.div`
    position: relative;
`;

export const DropdownText = styled.span`
    display: flex;
    align-items: center;
    font-size: 10pt;
    font-weight: 400;
    color: #595959;
    cursor: pointer;
`;

export const DropdownButtonImage = styled.img<{isOpen: boolean}>`
    height: 0.75em;
    margin: 0 0 0 0.15em;
    transform: rotate(${(props) => (props.isOpen ? '180deg' : '0')});
    transition: transform 0.2s ease-in-out;
`;

const Dropdown = styled.div`
    display: block;
    position: absolute;
    width: 6em;
    padding: 0.5em 0 0.5em 0;
    z-index: 1;
    right: 0;
    background-color: #FAFAFA;
    border-radius: 0.25em;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const NoPlanText = styled.p`
    width: 100%;
    padding: 2em;
    text-align: center;
    font-size: 16pt;
    font-weight: 700;
    color: #888;
`;

export default Mainpage;