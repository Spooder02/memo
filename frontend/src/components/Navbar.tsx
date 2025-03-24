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
        <Header>
            <Logo src={logo}/>
            <HamburgerMenu
                isOpen={isOpen}
                onClick={invertStatus}
            />
        </Header>
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

export default Navbar;