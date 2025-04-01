import styled from "styled-components";

const DayBlock = (props: {
    date: number,
    today: boolean,
    details?: string[]
}) => {
    const today = props.today;
    const details = props.details;

    return (
        <Frame today={today}>
            <DateNum today={today}>
                {props.date}
            </DateNum>
            {
                details?
                <DetailCircle today={today}/>:<></>
            }
        </Frame>
    )
}

const Frame = styled.div<{today: boolean}>`
    display: grid;
    justify-content: center;
    padding: 0.2em;
    width: 3em;
    height: 3em;
    border-radius: 0.25em;

    background-color:${(props) => props.today? 'rgb(43, 135, 255)':'#ffffff'};
`;

const DateNum = styled.p<{today: boolean}>`
    color: ${(props) => props.today? '#ffffff':'#000000'};
`;

const DetailCircle = styled.div<{today: boolean}>`
    width: 6px;
    height: 6px;
    border-radius: 3px;
    background-color: ${(props) => props.today? '#ffffff':'#000000'};
    z-index: 1;
    margin: auto;
`;

export default DayBlock;