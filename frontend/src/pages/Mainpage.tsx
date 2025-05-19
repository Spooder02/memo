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
    const planData: SimplePlan[] = simplePlansData;
    // 오늘의 년, 월
    const todayMonth = new Date().getMonth();
    const todayYear = new Date().getFullYear();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isTouch, setIsTouch] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen((prev) => !prev);
    };

    const handleTouchStart = () => {
        setIsTouch(true);
        toggleDropdown();
    };

    const handleClick = () => {
        if (!isTouch) {
            toggleDropdown();
        }
        setIsTouch(false); // 클릭 후 플래그 초기화
    };

    // 일정 컴포넌트 색상
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const colors: string[] = [
        "#B5DBFF",
        "#B5FFC8",
        "#FFC1CC",
        "#FFF5BA",
        "#E6D0FF"
    ];

    const today = new Date();

    const getDday = (timeLeft: string) => {
        return (new Date(timeLeft).getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
    }

    const [leftPlans, setLeftPlans] = useState(0);
   
    useEffect(() => {
        setLeftPlans(0);
        planData.forEach((p) => {
            if (new Date(p.dayLeft) > new Date()) {
                setLeftPlans(prev => prev+1);
            } 
        })
    }, [])

    // 일정 필터 로직
    const filters = ["최신순", "미래순", "인원 많은순"];
    const [selectedFilter, setselectedFilter] = useState<string>(filters[0]);
    const [currentDate, setCurrentDate] = useState<CurrentDate>({
        year: todayYear,
        month: todayMonth,
    });

    const doFilter = (filterName: string) => {
        if (filterName == "최신순") {
            planData.sort((a, b) => {
                if (a.dayLeft < b.dayLeft) return -1;
                if (a.dayLeft > b.dayLeft) return 1;

                return 0;
            })
            setselectedFilter(filterName);
        } else if (filterName == "미래순") {
            planData.sort((a, b) => {
                if (a.dayLeft < b.dayLeft) return 1;
                if (a.dayLeft > b.dayLeft) return -1;

                return 0;
            })
            setselectedFilter(filterName);
        } else if (filterName == "인원 많은순") {
            planData.sort((a, b) => {
                if (a.teamScale < b.teamScale) return 1;
                if (a.teamScale > b.teamScale) return -1;

                return 0;
            })
            setselectedFilter(filterName);
        }

    }

    useEffect(() => {

    }, [selectedFilter])

    const filteredPlans = planData.filter(data => getDday(data.dayLeft) >= 0);

    return (
        <PageFrame>
            <div>
                <Title>
                    안녕하세요, 미모님!
                </Title>
                <Description> 
                    {leftPlans}개의 일정이 매치되었습니다!
                </Description>
                <Calendar
                    currentDate={currentDate}
                    setCurrentDate={setCurrentDate}
                />
                <GrayLineDiv/>
            </div>
            <PlanContainer>
                <PlanTitleContainer>
                    <PlanText>다가오는 일정</PlanText>
                    <DropdownContainer>
                        <DropdownText onClick={handleClick} onTouchStart={handleTouchStart}>
                            {selectedFilter}
                            <DropdownButtonImage
                                src={images.dropdownArrow}
                                isOpen={dropdownOpen}
                            />
                        </DropdownText>
                        {dropdownOpen && (
                            <Dropdown>
                                {filters.map((name) => (
                                    <DropdownItem
                                        key={name}
                                        onClick={() => {
                                            doFilter(name);
                                            setTimeout(() => {
                                                toggleDropdown();
                                            }, 100);
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
                    {filteredPlans.length > 0 ? (
                    
                    filteredPlans.map((data) => (
                        <UpcomingPlanCard
                        key={data.id}
                        plan={data}
                        dday={getDday(data.dayLeft)}
                        />
                    ))
                    ) : (
                    <NoPlanText>
                        예정된 계획이 없습니다.
                    </NoPlanText>
                    )}
                </UpcomingPlanContainer>
            </PlanContainer>
        </PageFrame>
    );
}

const Title = styled.p`
    font-size: 22pt;
    font-weight: 900;
`;

const Description = styled.p`
    font-size: 14pt;
    font-weight: 400;
`;

export const DropdownText = styled.span`
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
    position: relative;
    height: calc(100vh - 5em);
    overflow: hidden;
`;

export const GrayLineDiv = styled.div`
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
    display: flex;
    flex-direction: column;
    width: 100%;
    height: calc(100vh - (510px + 5em));
    min-height: 5em;
    padding: 0 0.75em 0.75em 0.75em;
    overflow: scroll;
    margin: 0 0 2em 0;
    gap: 0.5em;
    border-radius: 0.25em;
    overflow: hideen;
`;

export const DropdownButtonImage = styled.img<{isOpen: boolean}>`
    height: 0.75em;
    margin: 0 0 0 0.15em;
    transform: rotate(${(props) => (props.isOpen ? '180deg' : '0')});
`;

const Dropdown = styled.div`
    display: block;
    position: absolute;
    width: 6em;
    padding: 0.5em 0 0.5em 0;
    z-index: 1;
    left: -1.5em;
    background-color: #FAFAFA;
    border-radius: 0.25em;
`;

export const DropdownContainer = styled.div`
    position: relative;
`;

const NoPlanText = styled.p`
    width: 100%;
    padding: 2em;
    text-align: center;
    font-size: 16pt;
    font-weight: 700;
`;

export default Mainpage;
