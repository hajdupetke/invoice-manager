import firebase from "../util/Firebase";

const Main = () => {
    return (
        <button onClick={async () => await firebase.auth().signOut()}>
            Log out
        </button>
    );
};

export default Main;
