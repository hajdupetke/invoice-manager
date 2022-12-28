import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserAuth } from "../util/FirebaseContext";

const CreateInvoice = () => {
    const [invoice, setInvoice] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();
    const { createInvoice } = UserAuth();

    const [buyerName, setBuyerName] = useState("");
    const [itemName, setItemName] = useState("");
    const [issueDate, setIssueDate] = useState("");
    const [price, setPrice] = useState(0);
    const [dueDate, setDueDate] = useState("");
    const [comment, setComment] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Lajos");
        createInvoice(buyerName, comment, dueDate, issueDate, itemName, price);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Buyer's name</label>
                <input
                    type="text"
                    onChange={(e) => setBuyerName(e.target.value)}
                />
                <br />

                <label>Item name</label>
                <input
                    type="text"
                    onChange={(e) => setItemName(e.target.value)}
                />
                <br />

                <label>Price</label>
                <input
                    type="number"
                    onChange={(e) => setPrice(e.target.value)}
                />
                <br />

                <label>Issue date</label>
                <input
                    type="date"
                    onChange={(e) => setIssueDate(e.target.value.toString())}
                />
                <br />

                <label>Due date</label>
                <input
                    type="date"
                    onChange={(e) => setDueDate(e.target.value.toString())}
                />
                <br />

                <label>Comment</label>
                <input
                    type="textarea"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <br />
                <button type="submit">Submit</button>
            </form>
            <button onClick={() => navigate("/invoices")}>Go back</button>
        </div>
    );
};

export default CreateInvoice;
