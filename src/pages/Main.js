import { useState, useEffect } from "react";
import { auth } from "../util/Firebase";
import { UserAuth } from "../util/FirebaseContext";

const Main = () => {
    const [user, setUser] = useState("");
    const { getUserData } = UserAuth();

    useEffect(() => {
        const user = getUserData(auth.currentUser.uid).then((data) =>
            setUser(data)
        );
    }, []);

    return (
        <div>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>
                Last log in date: {user.signInDate?.toDate()?.toLocaleString()}
            </p>
            <button onClick={async () => await auth.signOut()}>Log out</button>
        </div>
    );
};

export default Main;
