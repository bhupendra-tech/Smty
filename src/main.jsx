import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./pages/App.jsx";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/errorPage.jsx";
import "./index.css";
import SignIn, { submitSignInFormAction } from "./pages/signin.jsx";
import SignUp, { submitSignUpFormAction } from "./pages/signup.jsx";
import { Dashboard } from "./pages/dashboard.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <App /> },
      {
        path: "/signin",
        element: <SignIn />,
        errorElement: <ErrorPage />,
        action: submitSignInFormAction,
      },
      {
        path: "/signup",
        element: <SignUp />,
        errorElement: <ErrorPage />,
        action: submitSignUpFormAction,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Theme appearance="dark" accentColor="sky" radius="medium">
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Theme>
  </StrictMode>
);
