import styled from "styled-components";
import HamburgerMenu from "./HamburgerMenu";
import { Link, useNavigate } from "react-router-dom";
import images from "../utils/ImportImages";

interface NavbarProps {
    isOpen: boolean;
    onMenuClick: () => void;
}

const Navbar = ({ isOpen, onMenuClick }: NavbarProps) => {
    const navigate = useNavigate();

    return (
        <Header>
            <Link to="/">
                <Logo src={images.memoLogo}/>
            </Link>
            <HamburgerMenu
                isOpen={isOpen}
                onClick={onMenuClick}
            />
        </Header>
    )
}

// --- Styled Components ---

const Header = styled.nav`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 3em;
    z-index: 60;
    
    /* 테마의 배경색에 50% 투명도(80) 적용 */
    background-color: ${props => props.theme.bg_element1}80; 
    
    /* 배경 블러 효과 추가 */
    -webkit-backdrop-filter: blur(4px);
    backdrop-filter: blur(4px);
    
    padding: 2.5em 1.5em 2em 1.5em;
    border-radius: 0 0 0.25em 0.25em;
    box-shadow: 0 1px 5px ${props => props.theme.shadow1};
`;

const Logo = styled.img`
    height: 1.5em;
    cursor: pointer;
    transition: filter 0.2s;

    /* 다크 모드일 때 로고 색상 반전 */
    filter: ${props => props.theme.name === 'dark' ? 'invert(1)' : 'none'};
`;

export default Navbar;