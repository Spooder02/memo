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

export default WeekSelectorModal;

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
    background-color: white;
    padding: 1.5em;
    border-radius: 1em;
    width: 90%;
    max-width: 400px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
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
    background: none;
    border: none;
    font-size: 1.5em;
    cursor: pointer;
    color: #555;
`;

const YearText = styled.span`
    flex-grow: 1;
    text-align: center;
`;

const MonthSelector = styled.select`
    width: 100%;
    padding: 0.5em;
    border-radius: 0.5em;
    border: 1px solid #ccc;
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
    background-color: #f0f0f0;
    border-radius: 0.5em;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: #e0e0e0;
    }
`;

const CloseButton = styled.button`
    padding: 0.75em 1em;
    border: none;
    background-color: #2693FF;
    color: white;
    font-size: 12pt;
    border-radius: 0.5em;
    cursor: pointer;
    margin-top: 0.5em;
`;