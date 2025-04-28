import styled from "styled-components";
import { DropdownItem } from "../pages/Mainpage";

export const SmallDropdown = (props: {arr: string[], isOpen: boolean, clickEvent: (option: string) => void}) => {
    return (
        <DropdownContainer isOpen={props.isOpen}>
            {
                props.arr.map((item, index) => {
                    return (
                        <DropdownItem
                            key={index}
                            onClick={() => {
                                props.clickEvent(item);
                            }}
                        >
                            {item}
                        </DropdownItem>
                    )
                })
            }
        </DropdownContainer>
    )
}

const DropdownContainer = styled.div<{isOpen: boolean}>`
    display: ${props => props.isOpen? "flex" : "none"};
    width: 150%;
    left: -1em;
    flex-direction: column;
    position: absolute;
    background-color: #FAFAFA;
    border-radius: 0.5em;
    padding: 0.5em;
`;