// src/styled.d.ts

import 'styled-components';
import { Theme } from './styles/theme'; // 1. 우리가 만든 Theme 타입을 import 합니다.

declare module 'styled-components' {
  // 2. styled-components의 기본 테마(DefaultTheme)를 우리 Theme으로 확장(extends)합니다.
  export interface DefaultTheme extends Theme {}
}