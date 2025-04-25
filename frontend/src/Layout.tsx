// Layout.tsx
import React from 'react';
import Navbar from './components/Navbar';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <Frame>
      <Navbar />
      <Content>
        <Outlet />  {/* 자식 라우트 컴포넌트가 여기에 렌더링 됩니다 */}
      </Content>
    </Frame>
  );
};

const Frame = styled.div`
  position: fixed;
  padding: 0;
  margin: 0;
  width: 100vw;
  height: 100vh;
`;

const Content = styled.div`
  padding: 0.5em 1em 0.5em 1em;
`;

export default Layout;
