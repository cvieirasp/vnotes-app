import { createBrowserRouter, Navigate } from "react-router-dom";

import Navbar from "@/components/custom/Navbar";
import HomePage from "@/pages/Home";
import LoginPage from "@/pages/Login";
import RegisterPage from "@/pages/Register";

type Props = {
  children: JSX.Element;
};

const Layout = ({ children }: Props) => (
  <>
    <Navbar />
    {children}
  </>
);

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Layout>
          <HomePage />
        </Layout>
      ),
      exact: true,
    },
    {
      path: "/login",
      element: (
        <Layout>
          <LoginPage />
        </Layout>
      ),
    },
    {
      path: "/register",
      element: (
        <Layout>
          <RegisterPage />
        </Layout>
      ),
    },
    { path: "*", element: <Navigate to="/" replace /> },
  ]);

  return router;
};

export default Router;
