import { useState } from "react";
import { UserAuth } from "../util/FirebaseContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const { createUser } = UserAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createUser(email, password, name);
            navigate("/invoices");
        } catch (e) {
            setError(e.message);
            console.log(e.message);
        }
        setName("");
        setEmail("");
        setPassword("");
    };

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
