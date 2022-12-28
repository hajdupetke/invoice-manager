import { useEffect, useState } from "react";
import firebase from "../util/Firebase";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import Recaptcha from "react-google-recaptcha";
import bcrypt from "bcryptjs";

const auth = firebase.auth();
const firestore = firebase.firestore();

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [signInWithEmailAndPassword, user, loading, error] =
        useSignInWithEmailAndPassword(auth);
    const [loginAttempts, setAttempts] = useState(0);
    const [captcha, setCaptcha] = useState(false);

    const usersRef = firestore.collection("users");

    const signIn = (e) => {
        e.preventDefault();

        if (loginAttempts >= 3 && !captcha) return;

        signInWithEmailAndPassword(email, password).then((currentUser) => {
            if (!error) {
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
            } else {
                setAttempts(loginAttempts + 1);
            }
        });
    };

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
            {error ? <div>{error.message}</div> : <></>}

            {loginAttempts > 3 ? (
                <Recaptcha
                    sitekey="6LcaubMjAAAAAFw_n-tc_2UGUhcwvm4FBB_Q85xB"
                    onChange={(e) => setCaptcha(true)}
                />
            ) : (
                <></>
            )}
            <button type="submit">Log in</button>
        </form>
    );
};

export default Login;
