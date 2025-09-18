// src/App.tsx

import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import GlobalStyle from './styles/GlobalStyles';
import { ThemeProvider } from './contexts/ThemeContext'; // ThemeProvider import

function App() {
  return (
    <ThemeProvider>
      <GlobalStyle />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;