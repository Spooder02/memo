import styled from "styled-components";
import HamburgerMenu from "./HamburgerMenu";
import { Link, useNavigate } from "react-router-dom";
import images from "../utils/ImportImages";

// props 타입 정의
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
                onClick={onMenuClick} // 부모로부터 받은 함수를 사용
            />
        </Header>
    )
}

const Header = styled.nav`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 3em;
    z-index: 60;
    background-color: rgb(255,255,255,0.5);
    padding: 2.5em 1.5em 2em 1.5em;
    border-radius: 0 0 0.25em 0.25em;
    box-shadow: 0 1px 5px #eaeaeaff;
`;

const Logo = styled.img`
    height: 1.5em;
    cursor: pointer;
`;

export default Navbar;