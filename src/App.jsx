import {
  createBrowserRouter,
  Navigate,
  Router,
  RouterProvider,
} from "react-router-dom";

// pages
import { Home, Login, Register } from "./pages";

// layout
import MainLayout from "./layout/MainLayout";
import { useSelector } from "react-redux";
import { ProtectedRoutes } from "./components";

// action
import { action as LoginAction } from "./pages/Login";
import { action as RegisterAction } from "./pages/Register";
function App() {
  const { user } = useSelector((state) => state.user);
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoutes user={user}>
          <MainLayout />
        </ProtectedRoutes>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
      ],
    },
    {
      path: "/login",
      element: user ? <Navigate to="/" /> : <Login />,
      action: LoginAction,
    },
    {
      path: "/register",
      element: user ? <Navigate to="/" /> : <Register />,
      action: RegisterAction,
    },
  ]);

  return <RouterProvider router={routes} />;
}

export default App;
