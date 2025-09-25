import styled from "styled-components";

const DayBlock = (props: {
    date: number;
    today: boolean;
    color: string | undefined;
    onClick?: () => void;
}) => {
    const today = props.today;
    const color = props.color;

    return (
        <Frame today={today} onClick={props.onClick}>
            <DateNum today={today}>
                {props.date}
            </DateNum>
            {
                color ?
                <DetailCircle color={props.color!}/> : <div />
            }
        </Frame>
    )
}

// --- Styled Components ---

const Frame = styled.button<{today: boolean}>`
    display: grid;
    grid-template-rows: 2fr 1fr;
    align-items: center;
    justify-items: center;
    padding: 0;
    
    /* --- 사이즈 수정 부분 --- */
    width: 100%; /* 부모 grid의 칸을 가득 채움 */
    aspect-ratio: 1 / 1; /* 너비에 맞춰 높이가 1:1 비율을 유지 (정사각형) */
    border-radius: 50%; /* 어떤 크기에서든 원형을 유지 */
    
    background-color: ${(props) => props.today ? props.theme.accent : props.theme.bg_element1};
    transition: background-color 0.2s;

    &:hover {
      background-color: ${(props) => props.today ? props.theme.accent : props.theme.bg_element2};
    }
`;

const DateNum = styled.p<{today: boolean}>`
    margin: 0;
    color: ${(props) => props.today ? '#ffffff' : props.theme.text1};
    font-size: 12pt;
`;

const DetailCircle = styled.div<{color: string}>`
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background-color: ${(props) => props.color};
    border: 1px solid ${props => props.theme.border1};
`;

export default DayBlock;