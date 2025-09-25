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
    background-color: ${props => props.theme.bg_element1};
    border: 1px solid ${props => props.theme.border1};
    border-radius: 0.5em;
    box-shadow: 0 4px 12px ${props => props.theme.shadow1};
    padding: 0.5em;
    z-index: 10;
    overflow-y: auto;
`;

export const DropdownItem = styled.li<{textSize?: string}>`
    font-size: ${props => props.textSize? props.textSize: ""};
    list-style-type: none;
    text-align: center;
    width: 100%; /* 너비를 100%로 설정하여 호버 영역을 넓힘 */
    margin: auto;
    padding: 0.5em 0;
    color: ${props => props.theme.text1};
    border-radius: 0.25em; /* 호버 시 자연스럽도록 미리 radius 설정 */
    transition: background-color 0.2s;

    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;

    &:hover {
        background-color: ${props => props.theme.bg_element2};
    }
`;