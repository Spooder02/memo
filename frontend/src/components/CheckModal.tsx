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
                    style={{width: "50%"}}
                />
                <Title>
                    {props.title}
                </Title>
                
                {props.desc}
                </ModalContainer>
            </WhiteBackground>
            <HiddenBackground/>
        </Modal>
        
    )
}


const Modal = styled.div<{ isToggle: boolean }>`
    opacity: 0;
    visibility: hidden;

    ${props => props.isToggle ?
    css`
      /* 나타날 때 (페이드 인) */
      opacity: 1;
      visibility: visible;
      /* opacity와 visibility 모두 트랜지션. visibility는 바로 visible로 바뀜. */
      transition: opacity 0.5s ease-in-out, visibility 0s ease-in-out;
    `
    :
    css`
      /* 사라질 때 (페이드 아웃) */
      opacity: 0;
      /* opacity는 0.5초 트랜지션, visibility는 opacity 트랜지션 끝난 후 hidden으로 바뀜 (0초 지속, 0.5초 지연) */
      transition: opacity 0.5s ease-in-out, visibility 0s 0.5s;
      visibility: hidden;
    `
  }
`;

const WhiteBackground = styled.div`
    position: fixed;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    width: 70%;
    height: 35%;
    border-radius: 1em;
    background-color: white;
    z-index: 20;
    display: flex;
    justify-content: center;
    align-items: center;
`

const ModalContainer = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

const HiddenBackground = styled.div`
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 10;
    opacity: 0.5;
`

const Title = styled.p`
    font-size: 20pt;
    font-weight: 600;
    margin: 0 0.5em 0 0.5em;
`

const CheckIconImage = styled.img`
    width: 30vw;
    margin: 0 0 0.5em 0;
`



export default CheckModal;
