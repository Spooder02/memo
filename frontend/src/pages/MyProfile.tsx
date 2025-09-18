import styled from "styled-components";
import CircledImage from "../components/CircledImage";
import images from "../utils/ImportImages";
import MembershipCircle from "../components/MembershipCircle";
import { Membership } from "../types/Membership";
import { useState } from "react";
// import { GrayLineDiv } from "./Mainpage"; // GrayLineDiv는 여기서 더 이상 필요하지 않음
import MenuWithIcon from "../components/MenuWithIcon";

const MyProfilePage = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

            {/* Spacer를 사용하여 메뉴를 하단으로 밀어냄 */}
            <Spacer /> 

            {/* 메뉴 컨테이너: 패딩, 마진 조정 및 테마 색상 적용 */}
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
    flex: 1; /* Layout에서 제공하는 높이를 모두 채움 */
    padding-bottom: 1.5em; /* 하단 메뉴와의 여유 공간 */
`;

const Spacer = styled.div`
  flex: 1; /* 프로필과 메뉴 사이의 모든 빈 공간을 차지하여 메뉴를 하단으로 밀어냄 */
`;

const SettingTitle = styled.p`
    font-size: 16pt;
    font-weight: 600;
`;

export const ProfileHeaderContainer = styled.header`
    display: flex;
    align-items: center; /* 이미지와 텍스트를 수직 중앙 정렬 */
    padding: 1.5em 1em; /* 상하좌우 여백 증가 */
    margin-bottom: 1em; /* 하단 간격 추가 */
    background-color: ${props => props.theme.bg_element1}; /* 테마 배경색 적용 */
    box-shadow: 0 2px 5px ${props => props.theme.shadow1}; /* 은은한 그림자 */
    border-radius: 0.75em; /* 모서리 둥글게 */
`;

const ProfileDetailContainer = styled.div`
    display: flex;
    flex-direction: column; /* 제목과 멤버십 텍스트 수직 배치 */
    justify-content: center;
`;

const ProfileTitle = styled.h1`
    font-size: 18pt;
    font-weight: 700;
    color: ${props => props.theme.text1}; /* 테마 텍스트 색상 적용 */
    margin: 0 0 0.2em 0; /* 아래쪽 마진 조정 */
`;

const ProfileMembership = styled.span`
    font-size: 12pt;
    color: ${props => props.theme.text2}; /* 테마 보조 텍스트 색상 적용 */
    display: flex;
    align-items: center;
    gap: 0.5em; /* MembershipCircle과의 간격 */
`;

const MenuContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5em;
    padding: 1em;
    margin: 0 1em; /* 좌우 여백을 일관되게 조정 */
    border-radius: 0.75em;
`;

export default MyProfilePage;