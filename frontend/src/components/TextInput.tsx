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
            <Input
                type="text"
                placeholder={props.placeholder}
                value={props.value}
                disabled={props.title === "아이디"? true: false}
                onChange={props.onChange}
            />
        </Container>
    )
}

const Container = styled.div`
    
`;

const InputTitle = styled.div`
    font-size: 12pt;
    font-weight: 600;
    padding: 0 0 0.1em 0.25em;
    margin-bottom: 0.25em;
`;

const Input = styled.input`
    width: 100%;
    font-size: 14pt;
    border: 1px solid #AAAAAA;
    border-radius: 0.25em;
    transition: border 0.2s ease-in-out;
    padding: 0.5em 0.75em 0.5em 0.75em;
    background-color: ${props => props.disabled? '#EEEEEE':''};
    color: ${props => props.disabled? '#888888':'#000000'};
    opacity: ${props => props.disabled? '0.7':'1'};

    &:focus {
        outline: none;
        border: 1px solid #2693FF;
    }
`;

export default TextInput;