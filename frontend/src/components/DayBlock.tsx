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
                <DetailCircle color={props.color!}/> : <div /> // 원이 없을 때도 grid 구조 유지를 위해 빈 div 추가
            }
        </Frame>
    )
}

// --- Styled Components ---

const Frame = styled.button<{today: boolean}>`
    display: grid;
    /* 세로 공간을 2:1 비율로 분할하여 숫자와 원의 공간을 명확히 분리 */
    grid-template-rows: 2fr 1fr;
    align-items: center;     /* 각 행의 아이템을 세로 중앙 정렬 */
    justify-items: center;   /* 각 행의 아이템을 가로 중앙 정렬 */
    
    width: 3em;
    height: 3em;
    padding: 0; /* 내부에서 정렬하므로 패딩 제거 */
    border-radius: 1.5em;
    background-color:${(props) => props.today? 'rgb(43, 135, 255)':'#ffffff'};
`;

const DateNum = styled.p<{today: boolean}>`
    margin: 0; /* p 태그의 기본 마진 제거 */
    color: ${(props) => props.today? '#ffffff':'#000000'};
    font-size: 12pt;
`;

const DetailCircle = styled.div<{color: string}>`
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background-color: ${(props) => props.color};
    
    /* 흰색 배경에서 잘 보이도록 어두운 테두리 추가 */
    box-shadow: 0 0 4px #cacaca;
`;

export default DayBlock;