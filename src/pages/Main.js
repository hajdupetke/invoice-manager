import { useState, useEffect } from "react";
import { auth } from "../util/Firebase";
import { UserAuth } from "../util/FirebaseContext";
import { useNavigate } from "react-router-dom";

const Main = () => {
    const [user, setUser] = useState("");
    const { getUserData } = UserAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const user = getUserData(auth.currentUser.uid).then((data) =>
            setUser(data)
        );
    }, []);

    return (
        <div>
            <nav>
                <button onClick={() => navigate("/invoices")}>Invoices</button>
                <button onClick={() => navigate("/create")}>
                    Create invoice
                </button>
                <button onClick={async () => await auth.signOut()}>
                    Log out
                </button>
            </nav>
            <div>
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
                <p>
                    Last log in date:{" "}
                    {user.signInDate?.toDate()?.toLocaleString()}
                </p>
            </div>
        </div>
    );
};

export default Main;
