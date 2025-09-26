// src/components/ConfirmationModal.tsx

import React from 'react';
import styled from 'styled-components';
import { groupAndFormatTimes } from '../utils/TimeUtils';
import { RegisterPlanDetails } from '../types/PlanFormat';

type Availability = {
    [dateKey: string]: {
        times: number[];
        details: Partial<RegisterPlanDetails>;
    }
}

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    availability: Availability;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, onConfirm, availability }) => {
    if (!isOpen) return null;

    return (
        <ModalOverlay onClick={onClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <ModalTitle>저장할 일정을 확인해주세요</ModalTitle>
                <ScheduleList>
                    {Object.entries(availability)
                        .filter(([_, data]) => data.times.length > 0)
                        .map(([dateKey, data]) => {
                        const formattedTimes = groupAndFormatTimes(data.times);
                        return (
                            <ScheduleItem key={dateKey}>
                                <DateTitle>{dateKey}</DateTitle>
                                <TimeText>{formattedTimes.join(', ')}</TimeText>
                            </ScheduleItem>
                        )
})}
                </ScheduleList>
                <ModalButtonContainer>
                    <SecondaryButton onClick={onClose}>아니요,<br/>더 수정할게요</SecondaryButton>
                    <PrimaryButton onClick={onConfirm}>네, 저장합니다</PrimaryButton>
                </ModalButtonContainer>
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
    background-color: rgba(0, 0, 0, 0.6);
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
    box-shadow: 0 4px 12px ${props => props.theme.shadow1};
`;
const ModalTitle = styled.h2`
    font-size: 16pt;
    font-weight: 600;
    margin-bottom: 1em;
    text-align: center;
`;
const ScheduleList = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 0 0 1.5em 0;
    max-height: 40vh;
    overflow-y: auto;
    background-color: ${props => props.theme.bg_element2};
    border-radius: 0.5em;
    padding: 1em;
`;
const ScheduleItem = styled.li`
    margin-bottom: 0.75em;
    &:last-child {
        margin-bottom: 0;
    }
`;
const DateTitle = styled.strong`
    display: block;
    font-size: 11pt;
    font-weight: 600;
    margin-bottom: 0.25em;
`;
const TimeText = styled.p`
    font-size: 11pt;
    color: ${props => props.theme.text2};
    line-height: 1.5;
`;
const ModalButtonContainer = styled.div`
    display: flex;
    gap: 0.75em;
`;
const baseButton = styled.button`
    font-size: 12pt;
    width: 100%;
    border-radius: 0.5em;
    box-shadow: 0 1px 2px ${props => props.theme.shadow1};
    padding: 0.75em 1em;
    cursor: pointer;
    transition: all 0.2s ease;
    font-weight: 500;
`;
const PrimaryButton = styled(baseButton)`
    color: white;
    background-color: ${props => props.theme.accent}; 
    border: 1px solid ${props => props.theme.accent};
    &:hover {
        filter: brightness(0.9);
    }
`;
const SecondaryButton = styled(baseButton)`
    border: 1px solid ${props => props.theme.border1};
    background-color: ${props => props.theme.bg_element1};
    color: ${props => props.theme.text1};
    &:hover {
        background-color: ${props => props.theme.bg_element2};
    }
`;


export default ConfirmationModal;