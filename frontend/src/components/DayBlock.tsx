import styled from "styled-components";

const DayBlock = (props: {
    date: number,
    today: boolean,
    color: string | undefined
}) => {
    const today = props.today;
    const color = props.color;

    return (
        <Frame today={today}>
            <DateNum today={today}>
                {props.date}
            </DateNum>
            {
                color?
                <DetailCircle color={props.color!}/>:<></>
            }
        </Frame>
    )
}

const Frame = styled.div<{today: boolean}>`
    display: grid;
    justify-content: center;
    padding: 0.2em;
    width: 2.75em;
    height: 3em;
    border-radius: 0.25em;

    background-color:${(props) => props.today? 'rgb(43, 135, 255)':'#ffffff'};
`;

const DateNum = styled.p<{today: boolean}>`
    color: ${(props) => props.today? '#ffffff':'#000000'};
`;

const DetailCircle = styled.div<{color: string}>`
    width: 6px;
    height: 6px;
    border-radius: 3px;
    background-color: ${(props) => props.color};
    z-index: 1;
    margin: auto;
`;

export default DayBlock;