import { useState } from "react";
import { UserAuth } from "../util/FirebaseContext";
import { useNavigate, Link } from "react-router-dom";

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
        <div className="max-w-[700px] mx-auto py-10">
            <div>
                <h2 className="text-2xl font-bold">Sign up</h2>
                <p className="font-medium">
                    Already have an account?{" "}
                    <Link className="underline" to="/login">
                        Sign in!
                    </Link>
                </p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col py-2">
                    <label className="py-2 font-medium">Name</label>
                    <input
                        className="border p-3"
                        type="text"
                        name="name"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="flex flex-col py-2">
                    <label className="py-2 font-medium">Email Address</label>
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

                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-4"
                    type="submit"
                >
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;
