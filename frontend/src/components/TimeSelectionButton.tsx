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

const ButtonContainer = styled.button<{isSelection: boolean}>`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12pt;
    width: 5em;
    padding: 0.25em 0 0.25em 0;
    border-radius: 0.5em;
    border: 1px solid #ECECEC;
    color: #383838;

    // 선택 시, 배경색을 연두색으로 변경
    background-color: ${props => props.isSelection ? "#93FF93" : ""};
`;

export default TimeSelectionButton;