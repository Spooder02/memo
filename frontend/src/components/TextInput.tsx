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
`;

const Input = styled.input`
    width: 100%;
    font-size: 14pt;
    border-bottom: 1px solid #AAAAAA;
    transition: border-bottom 0.2s ease-in-out;
    padding: 0 0 0.1em 0.25em;
    background-color: ${props => props.disabled? '#EEEEEE':''};
    color: ${props => props.disabled? '#888888':'#000000'};
    opacity: ${props => props.disabled? '0.7':'1'};

    &:focus {
        outline: none;
        border-bottom: 1px solid #2693FF;
    }
`;

export default TextInput;