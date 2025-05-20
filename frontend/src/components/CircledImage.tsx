import styled from "styled-components";

const CircledImage = (props: {
    src: string;
    width: string;
    margin: string;
}) => {
    return (
        <ImageContainer
            src={props.src}
            width={props.width}
            margin={props.margin}
        >
        </ImageContainer>
    )
}

const ImageContainer = styled.img<{width: string, margin: string}>`
    width: ${props => props.width};
    margin: ${props => props.margin};
    aspect-ratio: 1 / 1;
    border-radius: 50%;
`;

export default CircledImage;