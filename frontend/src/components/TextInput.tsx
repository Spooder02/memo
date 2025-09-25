import styled from "styled-components";

const TextInput = (props: {
    title: string;
    placeholder: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
    return (
        <Container>
            <InputTitle>{props.title}</InputTitle>
            <StyledInput
                type="text"
                placeholder={props.placeholder}
                value={props.value}
                disabled={props.title === "아이디"}
                onChange={props.onChange}
            />
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const InputTitle = styled.label`
    font-size: 12pt;
    font-weight: 600;
    padding: 0 0 0.1em 0.25em;
    margin-bottom: 0.25em;
    color: ${props => props.theme.text1};
`;

const StyledInput = styled.input`
    width: 100%;
    font-size: 14pt;
    border-radius: 0.5em; /* 모서리를 좀 더 둥글게 */
    transition: border 0.2s ease-in-out, background-color 0.2s, color 0.2s;
    padding: 0.75em 1em; /* 패딩을 더 넉넉하게 */
    
    background-color: ${props => props.theme.bg_element2};
    color: ${props => props.disabled ? props.theme.text4 : props.theme.text1};
    border: 1px solid ${props => props.theme.border1};
    opacity: ${props => props.disabled ? 0.7 : 1};
    cursor: ${props => props.disabled ? 'not-allowed' : 'text'};

    &::placeholder {
      color: ${props => props.theme.text4};
    }

    &:focus {
        outline: none;
        border: 1px solid ${props => props.theme.accent};
    }
`;

export default TextInput;