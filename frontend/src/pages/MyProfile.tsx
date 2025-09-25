import styled from "styled-components";
import CircledImage from "../components/CircledImage";
import images from "../utils/ImportImages";
import MembershipCircle from "../components/MembershipCircle";
import { Membership } from "../types/Membership";
import { useState } from "react";
import MenuWithIcon from "../components/MenuWithIcon";

const MyProfilePage = () => {
    const [membershipType, setMembershipType] = useState<Membership>("Pro");
    return (
        <PageWrapper>
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
        </PageWrapper>
    )
}

// --- Styled Components ---

const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    flex: 1;
    padding: 1em; /* 페이지 전체에 여백 추가 */
`;

export const ProfileHeaderContainer = styled.header`
    display: flex;
    align-items: center;
    padding: 1.5em 1em;
    background-color: ${props => props.theme.bg_element2}; /* 메뉴와 통일감을 주기 위해 bg_element2 사용 */
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
    gap: 0.5em; /* 메뉴 간 간격 조정 */
    margin-top: 2em; /* 프로필 영역과의 간격 */
`;

const SettingTitle = styled.p`
    font-size: 14pt;
    font-weight: 600;
    color: ${props => props.theme.text1};
    padding: 0 0.5em;
    margin-bottom: 0.5em;
`;

export default MyProfilePage;