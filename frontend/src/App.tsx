import { RouterProvider } from 'react-router'
import Router from './router'
import Navbar from './components/Navbar'
import styled from 'styled-components'

function App() {

  return (
    <Frame>
      <Navbar/>
      <RouterProvider router={Router}/>
    </Frame>
  )
}

const Frame = styled.div`
  position: fixed;
  padding: 0
  margin: 0;
  width: 100vw;
  height: 100vh;
`;

export default App;
