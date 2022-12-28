import { useState } from "react";
import { UserAuth } from "../util/FirebaseContext";
import Recaptcha from "react-google-recaptcha";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loginAttempts, setAttempts] = useState(0);
    const [captcha, setCaptcha] = useState(false);
    const navigate = useNavigate();

    const { userSignIn } = UserAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loginAttempts > 3 && !captcha) return;

        try {
            await userSignIn(email, password);
            navigate("/invoices");
        } catch (e) {
            setError(e.message);
            setAttempts(loginAttempts + 1);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
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
