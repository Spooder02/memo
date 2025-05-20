import styled from "styled-components";
import CameraButton from "../components/CameraButton";
import CircledImage from "../components/CircledImage";
import images from "../utils/ImportImages";
import { ProfileHeaderContainer } from "./MyProfile";
import { useState } from "react";
import { GrayLineDiv } from "./Mainpage";

const SetProfile = () => {
    const [nickname, setNickname] = useState<string>("미모");
    const [isNicknameChanged, setIsNicknameChanged] = useState<boolean>(false);

    const handleChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
        const changedValue = e.target.value;
        if (changedValue !== nickname) {
            setIsNicknameChanged(true);
            setNickname(changedValue);
        }
    }
    
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
            <NicknameContainer>
                <NicknameInput
                    type="text"
                    placeholder="닉네임"
                    defaultValue={nickname}
                    onBlur={handleChangeNickname}
                />
                {
                    isNicknameChanged &&
                    <ChangeButton>
                        변경
                    </ChangeButton>
                }
            </NicknameContainer>
        </ProfileHeaderContainer>
        <GrayLineDiv
            style={{margin: "1em 0 1em 0"}}
        />
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
    height: 5em;
    display: flex;
    align-items: center;
    padding-left: 2em;
`;

const NicknameInput = styled.input`
    width: 75%;
    font-size: 16pt;
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



export default SetProfile;