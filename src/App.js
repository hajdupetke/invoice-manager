import "./App.css";
import { useAuthState } from "react-firebase-hooks/auth";
import Register from "./pages/Register";
import Main from "./pages/Main";
import Login from "./pages/Login";
import firebase from "./util/Firebase";

function App() {
    const [user, loading, error] = useAuthState(firebase.auth());

    return (
        <div className="App">
            <header className="App-header">
                {user ? <Main /> : <Login />}
            </header>
        </div>
    );
}

export default App;
