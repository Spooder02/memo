import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import images from "../utils/ImportImages";

const NotFound = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    const goHome = () => {
        navigate('/');
    };

    return (
        <PageWrapper>
            <Icon src={images.searchIcon} alt="Not Found Icon" />
            <Title>페이지를 찾을 수 없습니다.</Title>
            <Description>
                요청하신 페이지가 존재하지 않거나, 주소가 변경되었습니다.
                <br />
                입력하신 주소를 다시 한번 확인해주세요.
            </Description>
            <ButtonContainer>
                <SecondaryButton onClick={goBack}>이전 페이지로</SecondaryButton>
                <PrimaryButton onClick={goHome}>홈으로 가기</PrimaryButton>
            </ButtonContainer>
        </PageWrapper>
    );
};

const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    flex: 1; /* height: 100% 대신 flex: 1을 사용하여 부모 공간을 모두 채움 */
    padding: 2em;
    text-align: center;
`;

const Icon = styled.img`
    width: 6em;
    height: 6em;
    margin-bottom: 2em;
    filter: ${props => props.theme.name === 'dark' ? 'invert(1)' : 'none'};
`;

const Title = styled.h1`
    font-size: 18pt;
    font-weight: 700;
    color: ${props => props.theme.text1};
    margin-bottom: 0.75em;
`;

const Description = styled.p`
    font-size: 12pt;
    color: ${props => props.theme.text2};
    line-height: 1.6;
    margin-bottom: 2.5em;
`;

const ButtonContainer = styled.div`
    display: flex;
    gap: 1em;
`;

const baseButton = styled.button`
    font-size: 12pt;
    font-weight: 600;
    padding: 0.75em 1.5em;
    border-radius: 0.75em;
    transition: all 0.2s ease;
`;

const PrimaryButton = styled(baseButton)`
    background-color: ${props => props.theme.accent};
    color: #FFFFFF;

    &:hover {
        filter: brightness(0.9);
    }
`;

const SecondaryButton = styled(baseButton)`
    background-color: ${props => props.theme.bg_element2};
    color: ${props => props.theme.text1};
    border: 1px solid ${props => props.theme.border1};

    &:hover {
        filter: brightness(0.95);
    }
`;

export default NotFound;