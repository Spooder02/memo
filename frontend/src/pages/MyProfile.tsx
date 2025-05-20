import styled from "styled-components";
import CircledImage from "../components/CircledImage";
import images from "../utils/ImportImages";
import MembershipCircle from "../components/MembershipCircle";
import { Membership } from "../types/Membership";
import { useState } from "react";
import { GrayLineDiv } from "./Mainpage";
import MenuWithIcon from "../components/MenuWithIcon";

const MyProfilePage = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [membershipType, setMembershipType] = useState<Membership>("Pro");
    return (
        <>
        <ProfileHeaderContainer>
            <CircledImage
            src={images.testProfile}
            width="5em"
            margin="0 1em 0 0"
            />
            <ProfileDetailContainer>
                <ProfileTitle>
                    미모 님
                </ProfileTitle>
                <ProfileMembership>
                    <MembershipCircle membershipType={membershipType}/>
                    {membershipType} 요금제 이용 중
                </ProfileMembership>
            </ProfileDetailContainer>
        </ProfileHeaderContainer>
        <GrayLineDiv/>
        <SettingTitle>
            설정
        </SettingTitle>
        <MenuContainer>
            <MenuWithIcon
                logoSrc={images.user}
                menuTitle="프로필 관리"
                toLink="/setProfile"
            />
            <MenuWithIcon
                logoSrc={images.circledStar}
                menuTitle="멤버십 관리"
                toLink="/membership"
            />
            <MenuWithIcon
                logoSrc={images.BlackLink}
                menuTitle="캘린더 연동"
                toLink="/connectCalendar"
            />
            <MenuWithIcon
                logoSrc={images.clock}
                menuTitle="일정 설정"
                toLink="/setSchedule"
            />
            <MenuWithIcon
                logoSrc={images.info}
                menuTitle="서비스 정보"
                toLink="/infomation"
            />
        </MenuContainer>
        </>
    )
}

const ProfileTitle = styled.h1`
    font-size: 18pt;
    font-weight: 700;
`;

export const ProfileHeaderContainer = styled.header`
    display: flex;
    flex: 1;
    margin-bottom: 0.5em;
`;

const ProfileMembership = styled.a`
    font-size: 12pt;
`;

const ProfileDetailContainer = styled.div`
    display: block;
    padding-top: 0.25em;
`;

const SettingTitle = styled.h1`
    font-size: 18pt;
    font-weight: 600;
    margin: 0.5em;
`;

const MenuContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    padding: 0.5em 0 0.5em 0;
    margin: 0.5em 0 0.5em 0;
    border-radius: 0.75em;
    background-color: #F0F0F0;
    box-shadow: 0 3px 4px #CCCCCC;
`;


export default MyProfilePage;