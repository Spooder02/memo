import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import SideMenu from './components/SideMenu'; 

const Layout = () => {
    // --- 상태 관리 ---
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev);
    };

    // 페이지 이동 시 메뉴가 닫히도록 설정
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location.pathname]);

    return (
        <Background>
            <AppFrame>
                <Navbar isOpen={isMenuOpen} onMenuClick={toggleMenu} />
                <Content>
                    <Outlet />
                </Content>

                <HideContainer isOpen={isMenuOpen} onClick={toggleMenu} />
                <SideMenuContainer isOpen={isMenuOpen} />
            </AppFrame>
        </Background>
    );
};

// --- Styled Components ---

const Background = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${props => props.theme.bg};

  @media (min-width: 431px) {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2em 0;
  }
`;

const AppFrame = styled.div`
  position: relative;
  width: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  
  /* 모바일 기본 스타일 */
  height: 100vh; /* dvh 미지원 브라우저를 위한 fallback */
  height: 100dvh; 

  background-color: ${props => props.theme.bg_element1};
  box-shadow: 0 0 20px ${props => props.theme.shadow1};

  /* 데스크톱/태블릿 프레임 스타일 */
  @media (min-width: 431px) {
    max-width: 430px;
    height: 932px; /* ★★★ 높이를 고정된 값으로 설정 ★★★ */
    
    background-color: ${props => props.theme.bg_element1};
    box-shadow: 0 0 20px ${props => props.theme.shadow1};

    border-radius: 1em;

    overflow: hidden; 
  }
`;

const Content = styled.main`
  flex: 1; 
  overflow-y: auto;
  padding: 15px 20px 15px 20px;
`;

const HideContainer = styled.div<{isOpen: boolean}>`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: ${(props) => props.isOpen? 'block': 'none'};
    background-color: #000000;
    opacity: 0.2;
    z-index: 50;
`;

const SideMenuContainer = styled(SideMenu)<{isOpen: boolean}>`
    position: absolute;
    top: 0;
    right: 0;
    width: 70%;
    height: 100%;
    background-color: ${props => props.theme.bg_element1};
    box-shadow: ${props => (props.isOpen ? `-5px 0 15px ${props.theme.shadow1}` : 'none')};
    z-index: 55;
    transform: translateX(${(props) => (props.isOpen ? '0' : '100%')});
    transition: transform 0.5s ease-in-out;
    padding: 5em 1em 0 1.5em;
    box-shadow: ${(props) => (props.isOpen ? '-5px 0 15px rgba(0,0,0,0.1)' : 'none')};
`;

export default Layout;