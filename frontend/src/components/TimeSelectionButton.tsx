import styled from "styled-components";

const TimeSelectionButton = (props: {
    time: string,
    isSelection: boolean,
    setIsSelection: () => void,
    rawTime: number
}) => {

    return (
        <ButtonContainer
            isSelection={props.isSelection}
            onClick={() => { props.setIsSelection() } }
        >
            {props.time}
        </ButtonContainer>
    )
}

// --- Styled Components ---

const ButtonContainer = styled.button<{isSelection: boolean}>`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12pt;
    width: 5em;
    padding: 0.25em 0 0.25em 0;
    border-radius: 0.5em;
    transition: all 0.2s ease-in-out;

    /* --- 테마 적용 --- */
    border: 1px solid ${props => props.isSelection ? props.theme.accent : props.theme.border1};
    color: ${props => props.isSelection ? '#FFFFFF' : props.theme.text1};
    background-color: ${props => props.isSelection ? props.theme.accent : 'transparent'};

    /* --- 호버 효과 추가 --- */
    &:hover {
        border-color: ${props => props.theme.accent};
        background-color: ${props => props.isSelection ? props.theme.accent : props.theme.bg_element2};
    }
`;

export default TimeSelectionButton;