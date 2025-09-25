import styled from "styled-components";
import CircledImage from "../components/CircledImage";
import images from "../utils/ImportImages";
import MembershipCircle from "../components/MembershipCircle";
import { Membership } from "../types/Membership";
import { useState } from "react";
import MenuWithIcon from "../components/MenuWithIcon";
import { useAuth } from "../contexts/AuthContext"; // useAuth 훅 import

const MyProfilePage = () => {
    const { user, logout } = useAuth(); // AuthContext에서 user 정보와 logout 함수 가져오기
    const [membershipType, setMembershipType] = useState<Membership>("Pro");

    if (!user) {
        return <PageWrapper>로딩 중...</PageWrapper>; // 유저 정보가 로드되기 전
    }

    return (
        <PageWrapper>
            <div>
                <ProfileHeaderContainer>
                    {user.profileImg ? (
                        <CircledImage
                            src={user.profileImg} // API로 받은 프로필 이미지
                            width="5em"
                            margin="0 1em 0 0"
                        />
                    ) : (
                        <CircledImage
                            src={images.user} // 기본 프로필 이미지
                            width="5em"
                            margin="0 1em 0 0"
                        />
                    )}
                    
                    <ProfileDetailContainer>
                        <ProfileTitle>{user.nickname} 님</ProfileTitle>
                        {membershipType && ( // 멤버십 정보가 있을 때만 표시
                            <ProfileMembership>
                                <MembershipCircle membershipType={membershipType}/>
                                {membershipType} 요금제 이용 중
                            </ProfileMembership>
                        )}
                    </ProfileDetailContainer>
                </ProfileHeaderContainer>

                <MenuContainer>
                    <SettingTitle>설정 및 관리</SettingTitle>
                    <MenuWithIcon
                        logoSrc={images.user}
                        menuTitle="프로필 관리"
                        menuDescription="프로필 사진 및 이름 변경"
                        toLink="/setProfile"
                    />
                    <MenuWithIcon
                        logoSrc={images.circledStar}
                        menuTitle="멤버십 관리"
                        menuDescription="멤버십 정보 및 혜택 확인"
                        toLink="/membership"
                    />
                    <MenuWithIcon
                        logoSrc={images.BlackLink}
                        menuTitle="캘린더 연동"
                        menuDescription="구글 캘린더 등 외부 캘린더 연동"
                        toLink="/connectCalendar"
                    />
                    <MenuWithIcon
                        logoSrc={images.clock}
                        menuTitle="일정 설정"
                        menuDescription="알림 및 반복 일정 관리"
                        toLink="/setSchedule"
                    />
                    <MenuWithIcon
                        logoSrc={images.info}
                        menuTitle="서비스 정보"
                        menuDescription="앱 버전 및 이용 약관"
                        toLink="/infomation"
                    />
                </MenuContainer>
            </div>

            <Spacer /> 

            <LogoutButton onClick={logout}>로그아웃</LogoutButton>
        </PageWrapper>
    )
}

// --- Styled Components ---

const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    flex: 1;
    padding: 1em;
`;

export const ProfileHeaderContainer = styled.header`
    display: flex;
    align-items: center;
    padding: 1.5em 1em;
    background-color: ${props => props.theme.bg_element2};
    border-radius: 0.75em;
`;

const ProfileDetailContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const ProfileTitle = styled.h1`
    font-size: 18pt;
    font-weight: 700;
    color: ${props => props.theme.text1};
    margin: 0 0 0.2em 0;
`;

const ProfileMembership = styled.span`
    font-size: 12pt;
    color: ${props => props.theme.text2};
    display: flex;
    align-items: center;
    gap: 0.5em;
`;

const MenuContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    margin-top: 2em;
`;

const SettingTitle = styled.p`
    font-size: 14pt;
    font-weight: 600;
    color: ${props => props.theme.text1};
    padding: 0 0.5em;
    margin-bottom: 0.5em;
`;

const Spacer = styled.div`
  flex: 1;
`;

const LogoutButton = styled.button`
    align-self: flex-end; /* 우측 정렬 */
    margin-top: 1em;
    font-size: 10pt;
    color: ${props => props.theme.text4};
    text-decoration: underline;

    &:hover {
        color: ${props => props.theme.red};
    }
`;

export default MyProfilePage;