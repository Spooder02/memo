import styled from "styled-components";

const HamburgerMenu = (props:
    {isOpen: boolean, onClick: () => void}
) => {
    
    return (
        <Menu onClick={props.onClick}>
            <Bar isOpen={props.isOpen}/>
            <Bar isOpen={props.isOpen}/>
            <Bar isOpen={props.isOpen}/>
        </Menu>
    )
}

const Menu = styled.button`
    padding: 0.25em;
    display: grid;
    justify-items: center;
    gap: 0.4em;
    border: none;
    cursor: pointer;
    z-index: 10;
`;

const Bar = styled.span<{isOpen: boolean}>`
    height: 0.3em;
    width: 2em;
    border-radius: 2em;
    background-color: black;

    transition: all 0.3s ease;

    &:nth-of-type(1) {
        transform: ${({ isOpen }) => (isOpen ? 'rotate(45deg) translateY(0.6em) translateX(0.5em) scaleX(1.3)' : 'rotate(0) translateY(0)')};
    }

    &:nth-of-type(2) {
        opacity: ${({ isOpen }) => (isOpen ? '0' : '1')};
    }

    &:nth-of-type(3) {
        transform: ${({ isOpen }) => (isOpen ? 'rotate(-45deg) translateY(-0.5em) translateX(0.3em) scaleX(1.35)' : 'rotate(0) translateY(0)')};
    }
`;

export default HamburgerMenu;