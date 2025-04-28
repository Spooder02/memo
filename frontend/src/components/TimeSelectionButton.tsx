import styled from "styled-components";

const TimeSelectionButton = (props: {time: string, isSelection: boolean}) => {

    return (
        <ButtonContainer>
            {props.time}
        </ButtonContainer>
    )
}

const ButtonContainer = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12pt;
    width: 5em;
    padding: 0.25em 0 0.25em 0;
    border-radius: 0.5em;
    border: 1px solid #ECECEC;
    color: #383838;
`;

export default TimeSelectionButton;