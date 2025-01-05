import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AvailableFoods from "../pages/AvailableFoods";
import SignUp from "../pages/authentication/SignUp";
import Login from "../pages/authentication/Login";
import Home from "../pages/Home";
import Profile from "../pages/authentication/Profile";
import ProtectedRoute from "./ProtectedRoute";
import UpdateProfile from "../pages/authentication/UpdateProfile";
import AddFood from "../pages/AddFood";
import MyFoods from "../pages/MyFoods";
import FoodsRequest from "../pages/FoodsRequest";
import FoodDetails from "../pages/FoodDetails";
import ErrorPage from "../pages/ErrorPage";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout/>,
        children: [
            {
                index: true,
                element: <Home/>,
            },
            {
                path: "signup",
                element: <SignUp/>
            },
            {
                path: "login",
                element: <Login/>
            },
            {
                path: 'profile',
                element: <ProtectedRoute><Profile/></ProtectedRoute>
            },
            {
                path: 'update_profile',
                element: <ProtectedRoute><UpdateProfile/></ProtectedRoute>
            },
            {
                path: "available-foods",
                element: <AvailableFoods/>
            },
            {
                path: "add-food",
                element: <ProtectedRoute><AddFood/></ProtectedRoute>
            },
            {
                path: "manage-my-foods",
                element: <ProtectedRoute><MyFoods/></ProtectedRoute>
            },
            {
                path: "my-foods-request",
                element: <ProtectedRoute><FoodsRequest/></ProtectedRoute>
            },
            {
                path: "food/:id",
                loader: ({params})=> fetch(`${import.meta.env.VITE_BASE_URL}/food/${params.id}`),
                element: <ProtectedRoute><FoodDetails/></ProtectedRoute>
            }
        ]
    }
    ,{
        path: "*",
        element: <ErrorPage/>
    }
]);
export default routes;