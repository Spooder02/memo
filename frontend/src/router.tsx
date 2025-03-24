import { ReactNode } from "react";
import { createBrowserRouter } from "react-router";
import NotFound from "./pages/NotFound";
import Mainpage from "./pages/Mainpage";

interface RouteElement {
    path: string;
    element: ReactNode;
    errorElement: ReactNode;
    children?: RouteElement[]
}

const routes: RouteElement[] = [
    {
        path: '/',
        element: <Mainpage/>,
        errorElement: <NotFound/>
    }
]

const Router = createBrowserRouter(routes);

export default Router;