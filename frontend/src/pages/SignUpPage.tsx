// src/pages/SignUpPage.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import apiClient from '../api/client';

const SignUpPage = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!id || !password || !nickname) {
            setError('모든 항목을 입력해주세요.');
            return;
        }
        if (password !== confirmPassword) {
            setError('비밀번호가 일치하지 않습니다.');
            return;
        }

        try {
            await apiClient.post('/signup', { id, password, nickname });
            alert('회원가입에 성공했습니다! 로그인 페이지로 이동합니다.');
            navigate('/login');
        } catch (err: any) {
            if (err.response && err.response.data) {
                setError(err.response.data.message);
            } else {
                setError('회원가입 중 오류가 발생했습니다.');
            }
        }
    };

    return (
        <PageWrapper>
            <SignUpBox>
                <Title>회원가입</Title>
                <Form onSubmit={handleSubmit}>
                    <Input type="text" value={id} onChange={e => setId(e.target.value)} placeholder="아이디" />
                    <Input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="비밀번호" />
                    <Input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="비밀번호 확인" />
                    <Input type="text" value={nickname} onChange={e => setNickname(e.target.value)} placeholder="닉네임" />
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                    <SubmitButton type="submit">회원가입</SubmitButton>
                </Form>
                <LoginLink>
                    이미 계정이 있으신가요? <Link to="/login">로그인</Link>
                </LoginLink>
            </SignUpBox>
        </PageWrapper>
    );
};

// --- Styled Components (LoginPage와 유사) ---
const PageWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    height: 100dvh;
    background-color: ${props => props.theme.bg};
`;
const SignUpBox = styled.div`
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
`;
const ErrorMessage = styled.p`
    color: ${props => props.theme.red};
    font-size: 10pt;
    text-align: center;
    margin-top: -0.5em;
`;
const LoginLink = styled.p`
    margin-top: 1.5em;
    text-align: center;
    font-size: 10pt;
    color: ${props => props.theme.text2};

    a {
        color: ${props => props.theme.accent};
        font-weight: 600;
    }
`;

export default SignUpPage;