// src/styles/theme.ts

export const lightTheme = {
    bg: '#f0f2f5', // 전체 배경
    bg_element1: '#ffffff', // 앱 프레임, 사이드 메뉴 등
    bg_element2: '#F0F0F0', // 메뉴 컨테이너 등
    text1: '#000000', // 주요 텍스트
    text2: '#595959', // 부가 텍스트
    text3: '#A0A0A0', // 비활성 텍스트
    border1: '#DCDCDC', // 구분선
    shadow1: 'rgba(0, 0, 0, 0.1)', // 그림자
    accent: '#2693FF', // 강조색
};

export const darkTheme = {
    bg: '#121212',
    bg_element1: '#1E1E1E',
    bg_element2: '#2A2A2A',
    text1: '#EAEAEA',
    text2: '#B0B0B0',
    border1: '#3A3A3A',
    shadow1: 'rgba(255, 255, 255, 0.1)',
    accent: '#3287FF',
};

export type Theme = typeof lightTheme;