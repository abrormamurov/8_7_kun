import { useEffect } from "react";

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
// redux
import { useSelector } from "react-redux";
// import { login, isAuthChange } from "./app/userSlice";
// components
import { ProtectedRoutes } from "./components";

// action
import { action as LoginAction } from "./pages/Login";
import { action as RegisterAction } from "./pages/Register";
import { action as HomeAction } from "./pages/Home";
// firebase
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "./firebase/firebaseConfig";
function App() {
  // const dispatch = useDispatch();
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
          action: HomeAction,
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

  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     dispatch(login(user));
  //     dispatch(isAuthChange());
  //   });
  // }, []);

  return <RouterProvider router={routes} />;
}

export default App;
