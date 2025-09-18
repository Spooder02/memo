import styled from "styled-components";

export const SmallDropdown = (props:{
        arr: string[];
        isOpen: boolean;
        dropdownKey: string;
        clickEvent: (key: any, option: string) => void
        textSize?: string;
        boxWidth?: string;
    }) => {
    return (
        <DropdownContainer
            isOpen={props.isOpen}
            boxWidth={props.boxWidth}
        >
            {
                props.arr.map((item, index) => {
                    return (
                        <DropdownItem
                            key={index}
                            onClick={() => {
                                props.clickEvent(props.dropdownKey, item);
                            }}
                            textSize={props.textSize}
                        >
                            {item}
                        </DropdownItem>
                    )
                })
            }
        </DropdownContainer>
    )
}

const DropdownContainer = styled.div<{isOpen: boolean, boxWidth?: string}>`
    display: ${props => props.isOpen? "flex" : "none"};
    width: ${props => props.boxWidth? props.boxWidth: "150%"};
    max-height: 10em;
    right: 0;
    flex-direction: column;
    position: absolute;
    top: 100%;
    margin-top: 0.5em;
    background-color: #FBFBFB;
    border-radius: 0.5em;
    box-shadow: 1px 1px 10px rgba(238, 238, 238, 1);
    padding: 0.5em;
    z-index: 10;
    overflow-y: auto;
`;

export const DropdownItem = styled.li<{textSize?: string}>`
    font-size: ${props => props.textSize? props.textSize: ""};
    list-style-type: none;
    text-align: center;
    width: fit-content;
    margin: auto;
    padding: 0.5em 0;

    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;

    &:hover {
        background-color: #E0E0E0;
        border-radius: 0.5em;
    }
`;