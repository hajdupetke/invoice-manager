import { useState } from "react";
import firebase from "../util/Firebase";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import bcrypt from "bcryptjs";

const auth = firebase.auth();
const firestore = firebase.firestore();

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [signInWithEmailAndPassword, user, loading, error] =
        useSignInWithEmailAndPassword(auth);

    const usersRef = firestore.collection("users");

    const signIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(email, password).then(
            async (currentUser) => {
                const userRef = usersRef.doc(currentUser.user.uid);
                userRef.get().then((doc) => {
                    if (doc.exists) {
                        userRef.update({
                            signInDate:
                                firebase.firestore.FieldValue.serverTimestamp(),
                        });
                    } else {
                        console.log("Document doesnt exist!");
                    }
                });
            }
        );
    };

    if (error) {
        console.log(error.message);
    }

    return (
        <form onSubmit={signIn}>
            <label>Email</label>
            <input
                type="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
            />
            <br />

            <label>Password</label>
            <input
                type="password"
                name="name"
                minLength="8"
                onChange={(e) => setPassword(e.target.value)}
            />
            <br />

            <button type="submit">Log in</button>
        </form>
    );
};

export default Login;
