import { useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import firebase from "../util/Firebase";
import bcrypt from "bcryptjs";

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
                    usersRef.doc(currentUser.user.uid).set({
                        email: email,
                        name: name,
                        password: bcrypt.hashSync(
                            password,
                            "$2a$10$RoBb8JfJyKRnKiaKJhtVN."
                        ),
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
        console.log(user.user);
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
