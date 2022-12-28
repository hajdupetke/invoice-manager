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
        <div className="max-w-[700px] mx-auto py-5 text-xl">
            <nav className="flex justify-between">
                <button
                    className="px-3 hover:text-slate-600"
                    onClick={() => navigate("/invoices")}
                >
                    Invoices
                </button>
                <button
                    className="px-3 hover:text-slate-600"
                    onClick={() => navigate("/create")}
                >
                    Create invoice
                </button>
                <button
                    className="px-3 hover:text-slate-600"
                    onClick={async () => await auth.signOut()}
                >
                    Log out
                </button>
            </nav>
            <div className="my-10">
                <p className="my-2">
                    <span className="font-bold px-2">Name:</span>
                    {user.name}
                </p>
                <p className="my-2">
                    <span className="font-bold px-2">Email:</span> {user.email}
                </p>
                <p className="my-2">
                    <span className="font-bold px-2">Last log in date:</span>{" "}
                    {user.signInDate?.toDate()?.toLocaleString()}
                </p>
            </div>
        </div>
    );
};

export default Main;
