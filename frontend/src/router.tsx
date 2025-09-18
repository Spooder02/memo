import { ReactNode } from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Mainpage from "./pages/Mainpage";
import RegisterPlan from "./pages/RegisterPlan";
import TeamPage from "./pages/TeamPage";
import MyProfilePage from "./pages/MyProfile";
import SetProfile from "./pages/SetProfile";
import NotFound from "./pages/NotFound";

interface RouteElement {
    path: string;
    element: ReactNode;
    errorElement?: ReactNode;
    children?: RouteElement[];
}

const routes: RouteElement[] = [
    {
        path: '/',
        element: <Layout/>, // Layout이 모든 것을 책임지므로 다시 단순하게 설정
        errorElement: <NotFound/>,
        children: [
            { path: '', element: <Mainpage/> },
            { path: 'registerplan', element: <RegisterPlan/> },
            { path: 'myteam', element: <TeamPage/> },
            { path: 'profile', element: <MyProfilePage/> },
            { path: 'setProfile', element: <SetProfile/> }
        ],
    }
]

const Router = createBrowserRouter(routes);

export default Router;