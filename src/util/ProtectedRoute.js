import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Firebase";

const ProtectedRoute = ({ children }) => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    if (!user) {
        return navigate("/");
    }
    return children;
};

export default ProtectedRoute;
