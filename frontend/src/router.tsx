import { ReactNode } from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Mainpage from "./pages/Mainpage";
import RegisterPlan from "./pages/RegisterPlan";
import TeamPage from "./pages/TeamPage";
import MyProfilePage from "./pages/MyProfile";
import SetProfile from "./pages/SetProfile";
import NotFound from "./pages/NotFound";
import ConfirmMeetingPage from "./pages/ConfirmMeetingPage";
import ProposalStatusPage from "./pages/ProposalStatusPage";
import CreateMeetingPage from './pages/CreateMeetingPage';

interface RouteElement {
    path: string;
    element: ReactNode;
    errorElement?: ReactNode;
    children?: RouteElement[];
}

const routes: RouteElement[] = [
    {
        path: '/',
        element: <Layout/>,
        errorElement: <NotFound/>,
        children: [
            { path: '', element: <Mainpage/> },
            { path: 'registerplan', element: <RegisterPlan/> }, // 개인 가능 시간 등록
            { path: 'create-meeting', element: <CreateMeetingPage/> }, // 새 미팅 만들기
            { path: 'confirm-meeting', element: <ConfirmMeetingPage/> }, // 공통 시간 확인 및 확정
            { path: 'myteam', element: <TeamPage/> },
            { path: 'profile', element: <MyProfilePage/> },
            { path: 'setProfile', element: <SetProfile/> },
        ],
    }
]

const Router = createBrowserRouter(routes);

export default Router;