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

    const filters = ["최신순", "과거순", "인원순"]

    const [selectedFilter, setselectedFilter] = useState<string>(filters[0])
    
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
                    <DropdownContainer>
                    <DropdownText onClick={handleClick} onTouchStart={handleTouchStart}>
                            {selectedFilter}
                            <DropdownButtonImage
                            src={DropdownButton}
                            isOpen={dropdownOpen}
                            />
                        </DropdownText>
                        {dropdownOpen && (
                            <Dropdown>
                            {
                                filters.map((name) =>
                                    <DropdownItem
                                    key={name}
                                    onClick={() => {
                                        setselectedFilter(name)
                                        setTimeout(() => {
                                            toggleDropdown();
                                        }, 100)
                                    }}
                                    >
                                        {name}
                                    </DropdownItem>
                                )
                            }
                            </Dropdown>
                        )}
                    </DropdownContainer>
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

const DropdownText = styled.span`
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

const DropdownButtonImage = styled.img<{isOpen: boolean}>`
    height: 0.75em;
    margin: 0 0 0 0.15em;
    transform: rotate(${(props) => (props.isOpen? '180deg': '0')});
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

const DropdownItem = styled.li`
    list-style-type: none;
    text-align: center;
    width: 100%;
    margin: auto;
    padding: 0.5em 0 0.5em 0;

    /* Non-draggable */
    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10 and IE 11 */
    user-select: none;

    &:hover {
        background-color: #E0E0E0;
        border-radius: 0.5em;
    }
`;

const DropdownContainer = styled.div`
    position: relative;
`;

export default Mainpage;