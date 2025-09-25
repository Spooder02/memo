import styled from "styled-components"

const DateBlock: React.FC<{index: number}> = ({ index }) => {
    const Days = ["일", "월", "화", "수", "목", "금", "토"];

    return (
        <Frame>
            <DateText i={index}>
                {Days[index]}
            </DateText>
        </Frame>
    )
}


const Frame = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-end;
    width: 2.75em;
    height: 3em;
`;

const DateText = styled.p<{i: number}>`
    font-weight: 600;
    color: ${(props) => {
        if (props.i === 0) return props.theme.red;
        if (props.i === 6) return props.theme.accent;
        return props.theme.text1;
    }};
`;

export default DateBlock;