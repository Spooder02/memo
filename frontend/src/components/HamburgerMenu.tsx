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
    align-items: center;
    justify-items: center;
    z-index: 55;
`;

const Bar = styled.span<{isOpen: boolean}>`
    grid-area: 1 / 1 / 2 / 2;
    height: 5px;
    width: 34px;
    border-radius: 2em;
    background-color: ${props => props.theme.text1};

    transition: all 0.3s ease-in-out;

    &:nth-of-type(1) {
        transform: ${({ isOpen }) => 
            isOpen ? 'rotate(45deg)' : 'translateY(-12px)'
        };
    }

    &:nth-of-type(2) {
        opacity: ${({ isOpen }) => (isOpen ? '0' : '1')};
    }

    &:nth-of-type(3) {
        transform: ${({ isOpen }) => 
            isOpen ? 'rotate(-45deg)' : 'translateY(12px)'
        };
    }
`;

export default HamburgerMenu;