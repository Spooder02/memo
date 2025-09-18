import styled from "styled-components";
import CameraButton from "../components/CameraButton";
import CircledImage from "../components/CircledImage";
import images from "../utils/ImportImages";
import { ProfileHeaderContainer } from "./MyProfile";
import { useState } from "react";
import { GrayLineDiv } from "./Mainpage";
import { UserProfileInfo } from "../types/AuthData";
import TextInput from "../components/TextInput";

const SetProfile = () => {
    const [isNicknameChanged, setIsNicknameChanged] = useState<boolean>(false);

    const [userData, setUserData] = useState<UserProfileInfo>({
        "id": "memo",
        "nickname": "미모",
        "birthday": "2025-05-20",
        "profileImg": "imageLink",
        "phoneNumber": "010-1234-5678"
    })

    const fieldTitles: { [key in keyof UserProfileInfo]: string } = {
        id: "아이디",
        nickname: "닉네임",
        birthday: "생년월일",
        profileImg: "프로필 이미지",
        phoneNumber: "연락처",
    };

    const handleChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
        const changedValue = e.target.value;
        if (changedValue !== userData.nickname) {
            setIsNicknameChanged(true);
            setUserData(prev => ({
                ...prev,
                ["nickname"]: changedValue
            }));
        }
    }

    const toggleButton = () => {
        setIsNicknameChanged(false);
    }

    const handleInputChange = (key: keyof UserProfileInfo) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setUserData(prev => ({
            ...prev,
            [key]: newValue
        }));
    };
    
    return (
        <>
        <FixTitle>
            정보 수정
        </FixTitle>
        <ProfileHeaderContainer>
            <ProfileImageContainer>
            <CircledImage
                src={images.testProfile}
                width="5em"
                margin="0 0.5em 0 0.5em"
            />
            <CameraButton/>
            </ProfileImageContainer>
            <ProfileRightContainer>
                <NicknameLabel>닉네임</NicknameLabel>
                <NicknameContainer>
                <NicknameInput
                    type="text"
                    placeholder="닉네임"
                    defaultValue={userData.nickname}
                    onBlur={handleChangeNickname}
                />
                {
                    isNicknameChanged &&
                    <ChangeButton
                        onClick={() => {
                            toggleButton();
                        }}
                    >
                        변경
                    </ChangeButton>
                }
            </NicknameContainer>
            </ProfileRightContainer>
            
        </ProfileHeaderContainer>
        <ProfileDetailsContainer>
            {
            Object.entries(userData)
                .filter(([key]) => key !== 'nickname' && key !== 'profileImg')
                .map(([key, value]) => {
                    const fieldKey = key as keyof UserProfileInfo;
                    const title = fieldTitles[fieldKey];

                    return (
                        <TextInput
                            key={fieldKey} 
                            title={title}
                            placeholder={`${title}`}
                            value={value || ''}
                            onChange={handleInputChange(fieldKey)}
                        />
                    );
                })
            }
        </ProfileDetailsContainer>
        </>
    )
}

const ProfileImageContainer = styled.div`
    position: relative;
    width: fit-content;
    display: inline-block;
`;

const NicknameContainer = styled.div`
    position: relative;
    width: calc(100% - 6em);
    height: fit-content;
    display: flex;
    align-items: center;
`;

const ProfileRightContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-left: 2em;
    gap: 0.5em;
`;

const NicknameLabel = styled.p`
    font-size: 14pt;
    font-weight: 600;
`;

const NicknameInput = styled.input`
    font-size: 16pt;
    width: 10em;
    border-bottom: 1px solid #AAAAAA;
    transition: border-bottom 0.2s ease-in-out;
    padding: 0 0 0.1em 0.25em;

    &:focus {
        outline: none;
        border-bottom: 1px solid #2693FF;
    }
`;

const ChangeButton = styled.button`
    width: 3em;
    height: 2em;
    line-height: 1em;
    text-align: center;
    border-radius: 0.5em;
    padding: 0.5em 0.25em 0.5em 0.25em;
    background-color: #2693FF;
    color: #FCFCFC;
    margin-left: 0.2em;
`;

const FixTitle = styled.h1`
    font-size: 18pt;
    font-weight: 700;
    margin: 0.25em 0 0.25em 0.25em;
`;

const ProfileDetailsContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 1em;
    padding: 1.5em;
    border-radius: 1em;
`;



export default SetProfile;