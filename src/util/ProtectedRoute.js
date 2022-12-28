import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "./Firebase";

const ProtectedRoute = ({ children }) => {
    const [user] = useAuthState(firebase.auth());
    if (!user) {
        return <Navigate to="/" />;
    }
    return children;
};

export default ProtectedRoute;
