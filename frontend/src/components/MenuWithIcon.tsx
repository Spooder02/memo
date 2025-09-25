// src/components/MenuWithIcon.tsx
import { Link } from "react-router-dom";
import styled from "styled-components";
import images from "../utils/ImportImages";

interface MenuWithIconProps {
    logoSrc: string;
    menuTitle: string;
    menuDescription: string;
    toLink: string;
}

const MenuWithIcon = ({ logoSrc, menuTitle, menuDescription, toLink }: MenuWithIconProps) => {
    return (
        <MenuWrapper to={toLink}>
            <Icon src={logoSrc} />
            <TextWrapper>
                <Title>{menuTitle}</Title>
                <Description>{menuDescription}</Description>
            </TextWrapper>
            <ArrowIcon src={images.playbutton} />
        </MenuWrapper>
    );
};

// --- Styled Components ---

const MenuWrapper = styled(Link)`
    display: flex;
    align-items: center;
    padding: 0.75em 0.5em;
    border-radius: 0.5em;
    transition: background-color 0.2s;

    &:hover {
        background-color: ${props => props.theme.bg_element2};
    }
`;

const Icon = styled.img`
    width: 1.5em;
    height: 1.5em;
    margin-right: 1em;
    filter: ${props => props.theme.name === 'dark' ? 'invert(1)' : 'none'};
`;

const TextWrapper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`;

const Title = styled.p`
    font-size: 13pt;
    font-weight: 500;
    color: ${props => props.theme.text1};
    margin-bottom: 0.1em;
`;

const Description = styled.p`
    font-size: 10pt;
    color: ${props => props.theme.text2};
`;

const ArrowIcon = styled.img`
    width: 1em;
    height: 1em;
    filter: ${props => props.theme.name === 'dark' ? 'invert(1)' : 'none'};
`;

export default MenuWithIcon;