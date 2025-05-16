import styled from "styled-components";

export const SmallDropdown = (props:{
        arr: string[];
        isOpen: boolean;
        dropdownKey: string;
        clickEvent: (key: any, option: string) => void
        textSize?: string;
        boxWidth?: string;
        left?: string;
    }) => {
    return (
        <DropdownContainer
            isOpen={props.isOpen}
            boxWidth={props.boxWidth}
            left={props.left}
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

const DropdownContainer = styled.div<{isOpen: boolean, boxWidth?: string, left?: string}>`
    display: ${props => props.isOpen? "flex" : "none"};
    width: ${props => props.boxWidth? props.boxWidth: "150%"};
    max-height: 10em;
    left: ${props => props.left? props.left: "-1em"};
    flex-direction: column;
    position: absolute;
    background-color: #FBFBFB;
    border-radius: 0.5em;
    box-shadow: 1px 1px 3px rgb(180, 180, 180);
    padding: 0.5em;
    z-index: 1;
    overflow-y: auto;
    
`;

export const DropdownItem = styled.li<{textSize?: string}>`
    font-size: ${props => props.textSize? props.textSize: ""};
    list-style-type: none;
    text-align: center;
    width: fit-content;
    margin: auto;
    padding: 0.5em 0;

    /* Non-draggable */
    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10 and IE 11 */
    user-select: none;

    &:hover {
        background-color: #E0E0E0;
        border-radius: 0.5em;
    }
`;