import styled from "styled-components"
import logo from "../assets/memo.png";
import HamburgerMenu from "./HamburgerMenu";
import { useState } from "react";

const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false);
    const invertStatus = () => {
        setIsOpen((prev) => !prev)
    };

    return (
        <>
        <Header>
            <Logo src={logo}/>
            <HamburgerMenu
                isOpen={isOpen}
                onClick={invertStatus}
            />
        </Header>
        <HideContainer isOpen={isOpen}/>
        <SideMenuContainer isOpen={isOpen}>
            <MenuContainer>
                <MenuTitle>메인 메뉴</MenuTitle>
                <MenuTitle>나의 팀</MenuTitle>
                <MenuTitle>일정 등록</MenuTitle>
                <MenuTitle>프로필</MenuTitle>
            </MenuContainer>
        </SideMenuContainer>
        </>
    )
}

const Header = styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100vw;
    height: 3em;
    z-index: 100;
    background-color: rgb(255,255,255,0.5);
    padding: 2em 1.5em 2em 1.5em;
    margin-top: 0.5em;
`;

const Logo = styled.img`
    height: 1.5em;
`;

const HideContainer = styled.div<{isOpen: boolean}>`
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: ${(props) => props.isOpen? 'block': 'none'};
    background-color: #000000;
    opacity: 0.2;
`;

const SideMenuContainer = styled.div<{isOpen: boolean}>`
    position: absolute;
    top: 0;
    right: 0;
    width: 70vw;
    height: 100vh;
    background-color: #ffffff;
    z-index: 5;
    transform: translateX(${(props) => (props.isOpen ? '0' : '100%')});
    transition: transform 0.5s ease-in-out;

    padding: 5em 1em 0 1.5em;
`;

const MenuContainer = styled.div`
    display: grid;
    gap: 0.5em;
`;


const MenuTitle = styled.a`
    display: block;
    font-weight: 500;
    font-size: 16pt;
`;

export default Navbar;