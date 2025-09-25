import React, { useState } from 'react';
import styled from "styled-components";
import CameraButton from "../components/CameraButton";
import CircledImage from "../components/CircledImage";
import images from "../utils/ImportImages";
import { UserProfileInfo } from "../types/AuthData";

const SetProfile = () => {
    const [userData, setUserData] = useState<UserProfileInfo>({
        "id": "memo",
        "nickname": "미모",
        "birthday": "2025-05-20",
        "profileImg": "imageLink",
        "phoneNumber": "010-1234-5678"
    });

    const handleInputChange = (key: keyof UserProfileInfo) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setUserData(prev => ({
            ...prev,
            [key]: newValue
        }));
    };

    const handleSubmit = () => {
        // TODO: 서버에 userData를 전송하는 로직 추가
        console.log("Updated User Data:", userData);
        alert("프로필이 수정되었습니다.");
    };
    
    return (
        <PageWrapper>
            <Title>프로필 관리</Title>

            <ProfileImageContainer>
                <CircledImage
                    src={images.testProfile}
                    width="6em"
                />
                <CameraButton/>
            </ProfileImageContainer>
            
            <FormContainer>
                <FieldWrapper>
                    <Label>닉네임</Label>
                    <Input
                        type="text"
                        value={userData.nickname || ''}
                        onChange={handleInputChange('nickname')}
                    />
                </FieldWrapper>

                <FieldWrapper>
                    <Label>생년월일</Label>
                    <Input
                        type="date" // 생년월일이므로 date 타입으로 변경
                        value={userData.birthday || ''}
                        onChange={handleInputChange('birthday')}
                    />
                </FieldWrapper>

                <FieldWrapper>
                    <Label>연락처</Label>
                    <Input
                        type="tel"
                        value={userData.phoneNumber || ''}
                        onChange={handleInputChange('phoneNumber')}
                    />
                </FieldWrapper>

                <FieldWrapper>
                    <Label>아이디</Label>
                    <Input
                        type="text"
                        value={userData.id || ''}
                        readOnly // 아이디는 보통 변경 불가
                    />
                </FieldWrapper>
            </FormContainer>
            
            <Spacer />

            <SubmitButton onClick={handleSubmit}>
                수정 완료
            </SubmitButton>
        </PageWrapper>
    )
}

// --- Styled Components ---

const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: 1em;
`;

const Title = styled.h1`
    font-size: 18pt;
    font-weight: 700;
    margin-bottom: 2em;
    color: ${props => props.theme.text1};
`;

const ProfileImageContainer = styled.div`
    position: relative;
    width: fit-content;
    margin: 0 auto 2em auto; /* 중앙 정렬 및 하단 여백 */
`;

const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5em; /* 필드 간 간격 */
`;

const FieldWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5em;
`;

const Label = styled.label`
    font-size: 12pt;
    font-weight: 600;
    color: ${props => props.theme.text1};
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

    &[readOnly] {
        color: ${props => props.theme.text4};
        cursor: not-allowed;
    }
`;

const Spacer = styled.div`
  flex: 1; /* 폼과 버튼 사이의 모든 빈 공간을 차지 */
`;

const SubmitButton = styled.button`
    width: 100%;
    padding: 1em;
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

export default SetProfile;