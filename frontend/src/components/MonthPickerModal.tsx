import React, { useState } from 'react';
import styled from 'styled-components';
import { CurrentDate } from '../types/DateFormat';
import images from '../utils/ImportImages';

interface ModalProps {
    currentDate: CurrentDate;
    onClose: () => void;
    onSelect: (year: number, month: number) => void;
}

const MonthPickerModal: React.FC<ModalProps> = ({ currentDate, onClose, onSelect }) => {
    // --- 상태 관리 ---
    const [displayYear, setDisplayYear] = useState(currentDate.year);

    // --- 데이터 및 변수 선언 ---
    const months = [
        '1월', '2월', '3월', '4월', '5월', '6월',
        '7월', '8월', '9월', '10월', '11월', '12월'
    ];

    // --- 핸들러 함수 ---
    const handleYearChange = (delta: number) => {
        setDisplayYear(prev => prev + delta);
    };

    const handleMonthClick = (monthIndex: number) => {
        onSelect(displayYear, monthIndex);
    };

    return (
        <ModalOverlay onClick={onClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <HeaderContainer>
                    <CloseButton onClick={onClose}>&times;</CloseButton>
                    <ModalHeader>
                        <ArrowButton onClick={() => handleYearChange(-1)} />
                        <YearText>{displayYear}년</YearText>
                        <ArrowButton right={true} onClick={() => handleYearChange(1)} />
                    </ModalHeader>
                </HeaderContainer>
                <MonthGrid>
                    {months.map((month, index) => (
                        <MonthButton
                            key={month}
                            onClick={() => handleMonthClick(index)}
                            isSelected={displayYear === currentDate.year && index === currentDate.month}
                        >
                            {month}
                        </MonthButton>
                    ))}
                </MonthGrid>
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
    background-color: white;
    padding: 1.5em;
    border-radius: 1em;
    width: 90%;
    max-width: 350px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

const HeaderContainer = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1.5em;
`;

const CloseButton = styled.button`
    position: absolute;
    width: 1em;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    background: none;
    border: none;
    font-size: 1.7rem;
    line-height: 1;
    color: #888;
    cursor: pointer;
    padding: 0;
    
    &:hover {
        color: #000;
    }
`;

const ModalHeader = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16pt;
    font-weight: bold;
`;

const YearText = styled.span`
    text-align: center;
    margin: 0 1em; /* 화살표와의 간격 */
`;

const ArrowButton = styled.button<{right?: boolean}>`
    width: 12px;
    height: 12px;
    transform: rotate(${(props) => props.right? '0':'180'}deg);
    background-size: contain;
    background-image: url(${images.playbutton});
    background-repeat: no-repeat;
    background-position: center;
`;

const MonthGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.75em;
`;

const MonthButton = styled.button<{isSelected: boolean}>`
    padding: 0.75em 0.5em;
    font-size: 11pt;
    border-radius: 0.5em;
    background-color: ${props => props.isSelected ? '#B5DBFF' : '#f0f0f0'};
    color: ${props => props.isSelected ? 'white' : 'black'};
    font-weight: ${props => props.isSelected ? 'bold' : 'normal'};
    transition: background-color 0.2s;

    &:hover {
        background-color: ${props => props.isSelected ? '#9ACFFF' : '#e0e0e0'};
    }
`;

export default MonthPickerModal;