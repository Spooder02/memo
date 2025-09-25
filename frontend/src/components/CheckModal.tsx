import styled, { css } from "styled-components";
import images from "../utils/ImportImages";

const CheckModal = (props: {
    title: string; 
    desc: string;
    isToggle: boolean;
}) => {
    const isToggle = props.isToggle;
    return (
        <Modal isToggle={isToggle}>
            <WhiteBackground>
                <ModalContainer>
                <CheckIconImage
                    src={images.checkIcon}
                    alt="check icon"
                />
                <Title>
                    {props.title}
                </Title>
                
                <Description>
                    {props.desc}
                </Description>
                </ModalContainer>
            </WhiteBackground>
            <HiddenBackground onClick={(e) => e.stopPropagation()}/>
        </Modal>
        
    )
}

// --- Styled Components ---

const Modal = styled.div<{ isToggle: boolean }>`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease-in-out, visibility 0s 0.3s;

    ${props => props.isToggle &&
    css`
      opacity: 1;
      visibility: visible;
      transition: opacity 0.3s ease-in-out, visibility 0s;
    `}
`;

const WhiteBackground = styled.div`
    position: fixed;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    width: 70%;
    max-width: 350px;
    padding: 2em 1em;
    border-radius: 1em;
    background-color: ${props => props.theme.bg_element1};
    color: ${props => props.theme.text1};
    z-index: 20;
    display: flex;
    justify-content: center;
    align-items: center;
`

const ModalContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
`

const HiddenBackground = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 10;
`

const Title = styled.p`
    font-size: 18pt;
    font-weight: 700;
    margin: 0;
`

const Description = styled.p`
    font-size: 12pt;
    color: ${props => props.theme.text2};
    margin-top: 0.5em;
`;

const CheckIconImage = styled.img`
    width: 5em;
    margin-bottom: 1em;
    transition: filter 0.2s;
    filter: brightness(${props => props.theme.name === 'dark' ? 1.2 : 1});
`

export default CheckModal;