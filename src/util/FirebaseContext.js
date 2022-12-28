import { createContext, useContext } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";
import { auth, firestore, time } from "./Firebase";
import bcrypt from "bcryptjs";

const UserContext = createContext();

export const FirebaseContextProvider = ({ children }) => {
    const validate = (name, email, password) => {
        let isValid = true;
        if (
            name === "" ||
            email === "" ||
            password == "" ||
            password.length < 8
        ) {
            isValid = false;
        }

        return isValid;
    };

    const usersRef = firestore.collection("users");

    const createUser = (email, password, name) => {
        if (validate(name, email, password)) {
            return createUserWithEmailAndPassword(auth, email, password).then(
                (currentUser) => {
                    usersRef.doc(currentUser.user.uid).set({
                        email: email,
                        name: name,
                        password: bcrypt.hashSync(
                            password,
                            "$2a$10$RoBb8JfJyKRnKiaKJhtVN."
                        ),
                        signInDate: time,
                    });
                }
            );
        }
    };

    const userSignIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password).then(
            (currentUser) => {
                const userRef = usersRef.doc(currentUser.user.uid);
                userRef.get().then((doc) => {
                    if (doc.exists) {
                        userRef.update({
                            signInDate: time,
                        });
                    } else {
                        console.log("Document doesnt exist!");
                    }
                });
            }
        );
    };

    const invoiceRef = firestore.collection("invoices");

    const getInvoices = async (uid) => {
        const invoices = await invoiceRef
            .where("uid", "==", auth.currentUser.uid)
            .get();

        let result = [];

        if (invoices.empty) {
            console.log("No documents");
            return;
        }

        invoices.forEach((doc) => {
            const data = doc.data();
            delete data.uid;
            result = [...result, { id: doc.id, data: data }];
        });

        return result;
    };

    const getInvoice = async (id) => {
        const invoice = await invoiceRef.doc(id).get();
        return invoice.data();
    };

    const getUserData = async (uid) => {
        const user = await usersRef.doc(uid).get();
        return user.data();
    };

    const createInvoice = (
        buyerName,
        comment,
        dueDate,
        issueDate,
        itemName,
        price
    ) => {
        return invoiceRef.doc().set({
            buyerName,
            comment,
            dueDate,
            issueDate,
            itemName,
            price,
            uid: auth.currentUser.uid,
        });
    };

    return (
        <UserContext.Provider
            value={{
                createUser,
                userSignIn,
                createInvoice,
                getInvoices,
                getUserData,
                getInvoice,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const UserAuth = () => {
    return useContext(UserContext);
};
