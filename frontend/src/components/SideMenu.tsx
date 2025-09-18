// src/components/SideMenu.tsx

import styled from "styled-components";
import { Link } from "react-router-dom";
import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const SideMenu = ({ className }: { className?: string }) => {
    return (
        <div className={className}>
            <MenuContainer>
                <MenuTitle to={"/"}>메인 메뉴</MenuTitle>
                <MenuTitle to={"/myteam"}>나의 팀</MenuTitle>
                <MenuTitle to={"/registerplan"}>일정 등록</MenuTitle>
                <MenuTitle to={"/profile"}>프로필</MenuTitle>
            </MenuContainer>
            <ThemeToggle />
        </div>
    )
};

const MenuContainer = styled.div`
    display: grid;
    gap: 0.5em;
`;

const MenuTitle = styled(Link)`
    display: block;
    font-weight: 500;
    font-size: 16pt;
    padding: 0.5em;
    border-radius: 0.5em;
    color: ${props => props.theme.text1};
    
    &:hover {
        background-color: ${props => props.theme.bg_element2};
    }
`;

// --- 토글 버튼 스타일 ---
const ThemeToggleButton = styled.button`
    background: ${props => props.theme.bg_element2};
    border: 1px solid ${props => props.theme.border1};
    border-radius: 30px;
    cursor: pointer;
    padding: 0.5em 1em 0.5em 1em;
    margin-top: 1em;
    align-self: flex-end; /* 우측 정렬 */
`;

const ThemeToggle = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    return (
        <ThemeToggleButton onClick={toggleTheme} disabled={true}>
            {theme === 'light' ? '🌙 다크모드 전환 (개발중)' : '☀️ 라이트모드 전환 (개발중)'}
        </ThemeToggleButton>
    );
};


export default SideMenu;