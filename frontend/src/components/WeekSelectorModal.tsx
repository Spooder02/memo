import React, { useState } from 'react';
import styled from 'styled-components';
import { getWeeksForMonth, getWeekInfo } from '../utils/TimeUtils';

interface WeekSelectorModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentDate: Date;
    onWeekSelect: (date: Date) => void;
}

const months = Array.from({ length: 12 }, (_, i) => i + 1);

const WeekSelectorModal: React.FC<WeekSelectorModalProps> = ({ isOpen, onClose, currentDate, onWeekSelect }) => {
    const [displayYear, setDisplayYear] = useState(currentDate.getFullYear());
    const [displayMonth, setDisplayMonth] = useState(currentDate.getMonth());

    if (!isOpen) return null;

    const weeks = getWeeksForMonth(displayYear, displayMonth);

    const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setDisplayMonth(parseInt(e.target.value, 10));
    };

    const handleYearChange = (delta: number) => {
        setDisplayYear(prev => prev + delta);
    };

    const handleSelectWeek = (startDate: Date) => {
        onWeekSelect(startDate);
    };

    return (
        <ModalOverlay onClick={onClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <ModalHeader>
                    <ArrowButton onClick={() => handleYearChange(-1)}>&lt;</ArrowButton>
                    <YearText>{displayYear}년</YearText>
                    <ArrowButton onClick={() => handleYearChange(1)}>&gt;</ArrowButton>
                </ModalHeader>
                <MonthSelector value={displayMonth} onChange={handleMonthChange}>
                    {months.map(m => (
                        <option key={m} value={m - 1}>{m}월</option>
                    ))}
                </MonthSelector>
                <WeekGrid>
                    {weeks.map((weekStartDate, index) => {
                        const { month, week } = getWeekInfo(weekStartDate);

                        if (month !== displayMonth + 1) return null;

                        return (
                           <WeekItem key={index} onClick={() => handleSelectWeek(weekStartDate)}>
                                {month}월 {week}주차
                                ({weekStartDate.getMonth() + 1}/{weekStartDate.getDate()} ~)
                           </WeekItem>
                        )
                    })}
                </WeekGrid>
                <CloseButton onClick={onClose}>닫기</CloseButton>
            </ModalContent>
        </ModalOverlay>
    );
};

// --- Styled Components ---

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalContent = styled.div`
    background-color: ${props => props.theme.bg_element1};
    color: ${props => props.theme.text1};
    padding: 1.5em;
    border-radius: 1em;
    width: 90%;
    max-width: 400px;
    box-shadow: 0 4px 8px ${props => props.theme.shadow1};
    display: flex;
    flex-direction: column;
    gap: 1em;
`;

const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16pt;
    font-weight: bold;
`;

const ArrowButton = styled.button`
    font-size: 1.5em;
    cursor: pointer;
    color: ${props => props.theme.text2};
`;

const YearText = styled.span`
    flex-grow: 1;
    text-align: center;
`;

const MonthSelector = styled.select`
    width: 100%;
    padding: 0.5em;
    border-radius: 0.5em;
    background-color: ${props => props.theme.bg_element2};
    color: ${props => props.theme.text1};
    border: 1px solid ${props => props.theme.border1};
    font-size: 12pt;
`;

const WeekGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.5em;
`;

const WeekItem = styled.div`
    padding: 0.75em;
    text-align: center;
    background-color: ${props => props.theme.bg_element2};
    color: ${props => props.theme.text1};
    border-radius: 0.5em;
    cursor: pointer;
    transition: filter 0.2s;

    &:hover {
        filter: brightness(0.95);
    }
`;

const CloseButton = styled.button`
    padding: 0.75em 1em;
    background-color: ${props => props.theme.accent};
    color: white;
    font-size: 12pt;
    font-weight: 500;
    border-radius: 0.5em;
    cursor: pointer;
    margin-top: 0.5em;
    transition: filter 0.2s;

    &:hover {
        filter: brightness(0.9);
    }
`;

export default WeekSelectorModal;