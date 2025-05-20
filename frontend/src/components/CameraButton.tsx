import styled from "styled-components";
import images from "../utils/ImportImages";

const CameraButton = () => {
    return (
        <ButtonContainer>
            <CameraImage
                src={images.camera}
            />
        </ButtonContainer>
    )
}

const ButtonContainer = styled.button`
    width: 2em;
    height: 2em;
    border-radius: 1em;
    background-color: #FBFBFB;

    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 1;

    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #444444;
    box-shadow: 0 2px 2px #CCCCCC;
`;

const CameraImage = styled.img`
    width: 1.25em;
    height: 1.25em;
`;

export default CameraButton;