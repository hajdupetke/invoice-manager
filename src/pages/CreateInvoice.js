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
        <div className="max-w-[700px] mx-auto py-5">
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col py-2">
                    <label className="py-2 font-medium">Buyer's name</label>
                    <input
                        className="border p-3"
                        type="text"
                        onChange={(e) => setBuyerName(e.target.value)}
                    />
                </div>
                <div className="flex flex-col py-2">
                    <label className="py-2 font-medium">Item name</label>
                    <input
                        className="border p-3"
                        type="text"
                        onChange={(e) => setItemName(e.target.value)}
                    />
                </div>
                <div className="flex flex-col py-2">
                    <label className="py-2 font-medium">Price</label>
                    <input
                        className="border p-3"
                        type="number"
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <div className="flex flex-col py-2">
                    <label className="py-2 font-medium">Issue date</label>
                    <input
                        className="border p-3"
                        type="date"
                        onChange={(e) =>
                            setIssueDate(e.target.value.toString())
                        }
                    />
                </div>
                <div className="flex flex-col py-2">
                    <label className="py-2 font-medium">Due date</label>
                    <input
                        className="border p-3"
                        type="date"
                        onChange={(e) => setDueDate(e.target.value.toString())}
                    />
                </div>
                <div className="flex flex-col py-2">
                    <label className="py-2 font-medium">Comment</label>
                    <input
                        className="border p-3"
                        type="textarea"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </div>
                <div>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-4"
                        type="submit"
                    >
                        Submit
                    </button>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4"
                        onClick={() => navigate("/invoices")}
                    >
                        Go back
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateInvoice;
