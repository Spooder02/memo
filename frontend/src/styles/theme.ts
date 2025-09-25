// src/styles/theme.ts

export const lightTheme = {
    bg: '#f0f2f5',
    bg_element1: '#ffffff',
    bg_element2: '#F0F0F0',
    text1: '#000000',
    text2: '#555555',
    text4: '#A0A0A0',
    border1: '#DCDCDC',
    shadow1: 'rgba(0, 0, 0, 0.1)',
    accent: '#2693FF',
    bluehover: '#B5DBFF',
    red: '#FF3434', // 일요일/공휴일 색상 추가
};

export const darkTheme = {
    bg: '#121212',
    bg_element1: '#1E1E1E',
    bg_element2: '#2A2A2A',
    text1: '#EAEAEA',
    text2: '#B0B0B0',
    text4: '#A0A0A0', // 다크모드 비활성 텍스트 추가
    border1: '#3A3A3A',
    shadow1: 'rgba(255, 255, 255, 0.1)',
    accent: '#3287FF',
    bluehover: '#B5DBFF', // 다크모드 강조색 호버 추가
    red: '#FF5B5B', // 다크모드용 빨간색 추가
};

export type Theme = typeof lightTheme;