import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./pages/App.jsx";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/errorPage.jsx";
import "./index.css";
import SignIn from "./pages/signin.jsx";
import {
  submitSignUpFormAction,
  submitSignInFormAction,
  submitSelectedSizeForm,
} from "./utils/actions.js";
import SignUp from "./pages/signup.jsx";
import { Dashboard } from "./pages/dashboard.jsx";
import Subject from "./components/subject.jsx";
import EditorAndChatComponent from "./components/editorAndChat.jsx";

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
        children: [
          {
            index: true,
            element: <Subject />,
            action: submitSelectedSizeForm,
            errorElement: <ErrorPage />,
          },
          {
            path: "editor",
            element: <EditorAndChatComponent />,
            errorElement: <ErrorPage />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Theme accentColor="sky" radius="medium" appearance="dark">
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Theme>
  </StrictMode>
);
