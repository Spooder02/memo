import { Link } from "react-router-dom";
import styled from "styled-components";

const MenuWithIcon = (props: {
    logoSrc: string;
    menuTitle: string;
    toLink: string;
    menuDescription: string;
}) => {
    return (
        <MenuContainer to={props.toLink}>
            <MenuLeftContainer>
                <IconImage src={props.logoSrc}/>
                <TitleContainer>
                    <MenuTitle> {props.menuTitle} </MenuTitle>
                    <MenuDescription> {props.menuDescription} </MenuDescription>
                </TitleContainer>

            </MenuLeftContainer>
            <RightArrow>
                &gt;
            </RightArrow>
        </MenuContainer>
    )
}

const MenuContainer = styled(Link)`
    width: 100%;
    height: 3em;
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-decoration: none;
    margin: auto;
`;

const MenuLeftContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 1em;
`;

const TitleContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const IconImage = styled.img`
    width: 2em;
    height: 2em;
`;

const MenuTitle = styled.p`
    font-size: 14pt;
    font-weight: 500;
`;

const MenuDescription = styled.p`
    font-size: 12pt;
    font-weight: 400;
`;

const RightArrow = styled.p`
    font-size: 14pt;
    font-weight: 400;
    color: ${props => props.theme.text3};
`;

export default MenuWithIcon;