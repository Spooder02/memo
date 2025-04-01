import styled from "styled-components"

const DateBlock: React.FC<{index: number}> = ({ index }) => {
    const Days = ["일", "월", "화", "수", "목", "금", "토"];

    return (
        <Frame>
            <Date i={index}>
                {Days[index]}
            </Date>
        </Frame>
    )
}

const Frame = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2.75em;
    height: 3em;
`;

const Date = styled.p<{i: number}>`
    font-weight: 600;
    color: ${(props) => (props.i == 0)? '#FF3434': (props.i == 6)? '#3287FF': '#292929'};
`;

export default DateBlock;