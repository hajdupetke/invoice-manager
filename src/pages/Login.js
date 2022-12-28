import { useState } from "react";
import { UserAuth } from "../util/FirebaseContext";
import Recaptcha from "react-google-recaptcha";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

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
        <div className="max-w-[700px] mx-auto py-10">
            <form onSubmit={handleSubmit}>
                <div>
                    <h2 className="text-2xl font-bold">Sign in</h2>
                    <p className="font-medium">
                        Don't have an account?{" "}
                        <Link className="underline" to="/register">
                            Sign up!
                        </Link>
                    </p>
                </div>
                <div className="flex flex-col py-2">
                    <label className="py-2 font-medium">Email</label>
                    <input
                        className="border p-3"
                        type="email"
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="flex flex-col py-2">
                    <label className="py-2 font-medium">Password</label>
                    <input
                        className="border p-3"
                        type="password"
                        name="name"
                        minLength="8"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {error ? <div>{error.message}</div> : <></>}

                {loginAttempts > 3 ? (
                    <Recaptcha
                        sitekey="6LcaubMjAAAAAFw_n-tc_2UGUhcwvm4FBB_Q85xB"
                        onChange={(e) => setCaptcha(true)}
                    />
                ) : (
                    <></>
                )}
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-4"
                    type="submit"
                >
                    Log in
                </button>
            </form>
        </div>
    );
};

export default Login;
