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
    max-width: 350px;
    box-shadow: 0 4px 12px ${props => props.theme.shadow1};
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
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    background: none;
    border: none;
    font-size: 1.7rem;
    line-height: 1;
    color: ${props => props.theme.text4};
    cursor: pointer;
    padding: 0;
    
    &:hover {
        color: ${props => props.theme.text1};
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
    margin: 0 1em;
`;

const ArrowButton = styled.button<{right?: boolean}>`
    width: 12px;
    height: 12px;
    transform: rotate(${(props) => props.right? '0':'180'}deg);
    background-size: contain;
    background-image: url(${images.playbutton});
    background-repeat: no-repeat;
    background-position: center;
    filter: ${props => props.theme.name === 'dark' ? 'invert(1)' : 'none'};
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
    font-weight: ${props => props.isSelected ? 'bold' : 'normal'};
    transition: filter 0.2s, background-color 0.2s, color 0.2s;
    
    background-color: ${props => props.isSelected ? props.theme.accent : props.theme.bg_element2};
    color: ${props => props.isSelected ? '#FFFFFF' : props.theme.text1};

    &:hover {
        filter: brightness(0.95);
    }
`;

export default MonthPickerModal;