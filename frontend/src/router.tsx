import { ReactNode } from "react";
import { createBrowserRouter } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Mainpage from "./pages/Mainpage";
import RegisterPlan from "./pages/RegisterPlan";
import Layout from "./Layout";
import TeamPage from "./pages/TeamPage";
import MyProfilePage from "./pages/MyProfile";

interface RouteElement {
    path: string;
    element: ReactNode;
    errorElement?: ReactNode;
    children?: RouteElement[];
}

const routes: RouteElement[] = [
    {
        path: '/',
        element: <Layout/>,       // 최상위 레이아웃 컴포넌트
        errorElement: <NotFound/>,
        children: [
            { path: '', element: <Mainpage/> },
            { path: 'registerplan', element: <RegisterPlan/> },
            { path: 'myteam', element: <TeamPage/> },
            { path: 'profile', element: <MyProfilePage/>}
        ],
    }
]

const Router = createBrowserRouter(routes);

export default Router;