import styled from "styled-components";
import Calendar from "../components/Calendar";

const Mainpage = () => {
    return (
        <PageFrame>
            <Title>
                안녕하세요, 미모님!
            </Title>
            <Description>
                2개의 일정이 매치되었습니다!
            </Description>
            <Calendar/>
        </PageFrame>
    )
}

const Title = styled.p`
    font-size: 22pt;
    font-weight: 900;
`;

const Description = styled.p`
    font-size: 14pt;
    font-weight: 400;
`;

const PageFrame = styled.div`
    padding: 0.5em 1em 0.5em 1em;
`;

export default Mainpage;