import { useState, useEffect } from "react";
import { UserAuth } from "../util/FirebaseContext";
import { auth } from "../util/Firebase";
import { useNavigate } from "react-router-dom";

const Invoices = () => {
    const [invoices, setInvoices] = useState([]);
    const { getInvoices } = UserAuth();
    const navigate = useNavigate();

    useEffect(() => {
        getInvoices(auth.currentUser.uid).then((data) => {
            setInvoices(data);
        });
    }, []);

    useEffect(() => {
        console.log(invoices);
    }, [invoices]);

    const renderInvoices = () => {
        return invoices.map(({ id, data }) => {
            const { buyerName, comment, dueDate, issueDate, itemName, price } =
                data;
            return (
                <tr key={id}>
                    <td>{buyerName}</td>
                    <td>{comment}</td>
                    <td>{dueDate}</td>
                    <td>{issueDate}</td>
                    <td>{itemName}</td>
                    <td>{price}</td>
                </tr>
            );
        });
    };

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Buyer's name</th>
                        <th>Comment</th>
                        <th>Due Date</th>
                        <th>Issue Date</th>
                        <th>Item Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>{renderInvoices()}</tbody>
            </table>
            <button onClick={() => navigate("/create")}>Create</button>
            <button onClick={() => navigate("/")}>Go back</button>
        </div>
    );
};

export default Invoices;
