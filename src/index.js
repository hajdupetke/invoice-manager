import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Register from "./pages/Register";
import Main from "./pages/Main";
import Login from "./pages/Login";
import ProtectedRoute from "./util/ProtectedRoute";

import reportWebVitals from "./reportWebVitals";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import { FirebaseContextProvider } from "./util/FirebaseContext";

const router = createBrowserRouter([
    { path: "/", element: <Login /> },
    { path: "register", element: <Register /> },
    {
        path: "invoices",
        element: (
            <ProtectedRoute>
                <Main />
            </ProtectedRoute>
        ),
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <FirebaseContextProvider>
            <RouterProvider router={router} />
        </FirebaseContextProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
