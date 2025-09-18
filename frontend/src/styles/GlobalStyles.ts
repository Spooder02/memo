// src/styles/GlobalStyle.ts
import { createGlobalStyle } from "styled-components";
import { Theme } from "./theme";

const GlobalStyle = createGlobalStyle<{theme: Theme}>`
  * {
    box-sizing: border-box;
    transition: background-color 0.2s, color 0.2s;
  }
  body {
    margin: 0;
    background-color: ${props => props.theme.bg};
    color: ${props => props.theme.text1}; /* ★★★ 모든 텍스트의 기본 색상 설정 ★★★ */
    /* 폰트 등 다른 전역 스타일도 이곳에 추가할 수 있습니다 */
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  button {
    border: none;
    cursor: pointer;
    background: none;
    padding: 0;
    color: inherit; /* 버튼 내부 텍스트도 색상을 상속받도록 설정 */
  }
`;

export default GlobalStyle;