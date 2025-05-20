import { Link } from "react-router-dom";
import styled from "styled-components";

const MenuWithIcon = (props: {
    logoSrc: string;
    menuTitle: string;
    toLink: string;
}) => {
    return (
        <MenuContainer to={props.toLink}>
            <div style={{display: "flex", gap: "1em"}}>
                <IconImage src={props.logoSrc}/>
                <MenuTitle>
                    {props.menuTitle}
                </MenuTitle>
            </div>
            <RightArrow>
                &gt;
            </RightArrow>
        </MenuContainer>
    )
}

const MenuContainer = styled(Link)`
    width: 70%;
    height: 3em;
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-decoration: none;
    margin: auto;
`;

const IconImage = styled.img`
    width: 2em;
    height: 2em;
`;

const MenuTitle = styled.p`
    font-size: 14pt;
    font-weight: 500;
`;

const RightArrow = styled.p`
    font-size: 14pt;
    font-weight: 900;
`;

export default MenuWithIcon;