import { ReactNode } from "react";
import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import Layout from "./Layout";
import Mainpage from "./pages/Mainpage";
import RegisterPlan from "./pages/RegisterPlan";
import TeamPage from "./pages/TeamPage";
import MyProfilePage from "./pages/MyProfile";
import SetProfile from "./pages/SetProfile";
import NotFound from "./pages/NotFound";
import ConfirmMeetingPage from "./pages/ConfirmMeetingPage";
import CreateMeetingPage from './pages/CreateMeetingPage';
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

interface RouteElement {
    path?: string;
    element: ReactNode;
    errorElement?: ReactNode;
    children?: RouteElement[];
}

// --- 보호된 경로(로그인 필수)를 위한 컴포넌트 ---
const ProtectedRoute = () => {
    const { token } = useAuth();
    return token ? <Outlet /> : <Navigate to="/login" replace />;
};

// --- 라우트 설정 ---
const routes: RouteElement[] = [
    // --- 공개 경로 ---
    { path: "/login", element: <LoginPage /> },
    { path: "/signup", element: <SignUpPage /> },

    // --- 보호된 경로 / 회원 전용 페이지 ---
    {
        element: <ProtectedRoute />,
        children: [
            {
                path: '/',
                element: <Layout/>,
                errorElement: <NotFound/>,
                children: [
                    { path: '', element: <Mainpage/> },
                    { path: 'registerplan', element: <RegisterPlan/> },
                    { path: 'create-meeting', element: <CreateMeetingPage/> },
                    { path: 'confirm-meeting', element: <ConfirmMeetingPage/> },
                    { path: 'myteam', element: <TeamPage/> },
                    { path: 'profile', element: <MyProfilePage/> },
                    { path: 'setProfile', element: <SetProfile/> },
                ],
            }
        ]
    }
]

const Router = createBrowserRouter(routes);

export default Router;