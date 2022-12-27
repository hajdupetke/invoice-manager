import { collection, getFirestore } from "firebase/firestore";
import { useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";

import firebase from "../util/Firebase";

const auth = firebase.auth();
const firestore = firebase.firestore();

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [createUserWithEmailAndPassword, user, loading, error] =
        useCreateUserWithEmailAndPassword(auth);

    const usersRef = firestore.collection("users");

    const validate = () => {
        let isValid = true;
        if (
            name == "" ||
            email == "" ||
            password == "" ||
            password.length < 8
        ) {
            isValid = false;
        }

        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(validate());
        if (validate()) {
            createUserWithEmailAndPassword(email, password).then(
                (currentUser) => {
                    firestore.collection("users").add({
                        id: currentUser.user.uid,
                        email: email,
                        name: name,
                        signInDate:
                            firebase.firestore.FieldValue.serverTimestamp(),
                    });
                }
            );
        }
        setName("");
        setEmail("");
        setPassword("");
    };

    if (error) {
        console.log(error.message);
    }

    if (user) {
        console.log(user.user.uid);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>Name</label>
            <input
                type="text"
                name="name"
                onChange={(e) => setName(e.target.value)}
            />
            <br />

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

            <button type="submit">Register</button>
        </form>
    );
};

export default Register;
