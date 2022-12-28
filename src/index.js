import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Register from "./pages/Register";
import Main from "./pages/Main";
import Login from "./pages/Login";
import ProtectedRoute from "./util/ProtectedRoute";
import ShowInvoice from "./pages/ShowInvoice";
import Invoices from "./pages/Invoices";

import reportWebVitals from "./reportWebVitals";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import { FirebaseContextProvider } from "./util/FirebaseContext";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <ProtectedRoute>
                <Main />
            </ProtectedRoute>
        ),
    },
    { path: "register", element: <Register /> },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/invoices",
        element: (
            <ProtectedRoute>
                <Invoices />
            </ProtectedRoute>
        ),
    },
    {
        path: "/invoices/:id",
        element: (
            <ProtectedRoute>
                <ShowInvoice />
            </ProtectedRoute>
        ),
    },
    {
        path: "/create",
        element: (
            <ProtectedRoute>
                <Invoices />
            </ProtectedRoute>
        ),
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <FirebaseContextProvider>
        <RouterProvider router={router} />
    </FirebaseContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
