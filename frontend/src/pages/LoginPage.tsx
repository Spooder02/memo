import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(id, password);
            navigate('/');
        } catch (error) {
            alert('로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.');
        }
    };

    return (
        <PageWrapper>
            <LoginBox>
                <Title>로그인</Title>
                <Form onSubmit={handleSubmit}>
                    <Input type="text" value={id} onChange={e => setId(e.target.value)} placeholder="아이디" />
                    <Input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="비밀번호" />
                    <SubmitButton type="submit">로그인</SubmitButton>
                </Form>
                <SignUpLink>
                    계정이 없으신가요? <Link to="/signup">회원가입</Link>
                </SignUpLink>
            </LoginBox>
        </PageWrapper>
    );
};

// --- Styled Components ---

const PageWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    height: 100dvh;
    background-color: ${props => props.theme.bg};
`;

const LoginBox = styled.div`
    width: 90%;
    max-width: 400px;
    padding: 2.5em 2em;
    background-color: ${props => props.theme.bg_element1};
    border-radius: 1em;
    box-shadow: 0 4px 12px ${props => props.theme.shadow1};
`;

const Title = styled.h1`
    font-size: 20pt;
    font-weight: 700;
    text-align: center;
    margin-bottom: 1.5em;
    color: ${props => props.theme.text1};
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1em;
`;

const Input = styled.input`
    width: 100%;
    padding: 0.75em 1em;
    font-size: 12pt;
    border-radius: 0.5em;
    background-color: ${props => props.theme.bg_element2};
    color: ${props => props.theme.text1};
    border: 1px solid ${props => props.theme.border1};
    transition: border-color 0.2s;

    &:focus {
        outline: none;
        border-color: ${props => props.theme.accent};
    }
`;

const SubmitButton = styled.button`
    width: 100%;
    padding: 0.8em;
    margin-top: 1em;
    font-size: 13pt;
    font-weight: 600;
    border-radius: 0.75em;
    background-color: ${props => props.theme.accent};
    color: #FFFFFF;
    transition: filter 0.2s;

    &:hover {
        filter: brightness(0.9);
    }
`;

const SignUpLink = styled.p`
    margin-top: 1.5em;
    text-align: right;
    font-size: 10pt;
    color: ${props => props.theme.text2};

    a {
        color: ${props => props.theme.accent};
        font-weight: 600;
        
        &:hover {
            text-decoration: underline;
        }
    }
`;

export default LoginPage;