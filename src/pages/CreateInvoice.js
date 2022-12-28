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
    const [sent, setSent] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Lajos");

        if (validate()) {
            createInvoice(
                buyerName,
                comment,
                dueDate,
                issueDate,
                itemName,
                price
            )
                .then(() => {
                    setSent("Data successfully added!");
                })
                .catch((e) => {
                    setError(e.message);
                });

            setBuyerName("");
            setItemName("");
            setIssueDate("");
            setPrice(0);
            setDueDate("");
            setComment("");
            setError("");
            setSent("");
        }
    };

    const validate = () => {
        let valid = true;
        if (isNaN(Date.parse(dueDate) || isNaN(Date.parse(issueDate)))) {
            valid = false;
            setError(error + "\nWrong date format!");
        }

        if (
            buyerName.length <= 0 ||
            itemName.length <= 0 ||
            comment.length <= 0
        ) {
            valid = false;
            setError(error + "\nEvery field is required!");
        }
        return valid;
    };

    return (
        <div className="max-w-[700px] mx-auto py-5">
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col py-2">
                    <label className="py-2 font-medium">Buyer's name</label>
                    <input
                        required
                        className="border p-3"
                        type="text"
                        onChange={(e) => setBuyerName(e.target.value)}
                    />
                </div>
                <div className="flex flex-col py-2">
                    <label className="py-2 font-medium">Item name</label>
                    <input
                        required
                        className="border p-3"
                        type="text"
                        onChange={(e) => setItemName(e.target.value)}
                    />
                </div>
                <div className="flex flex-col py-2">
                    <label className="py-2 font-medium">Price</label>
                    <input
                        required
                        className="border p-3"
                        type="number"
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <div className="flex flex-col py-2">
                    <label className="py-2 font-medium">Issue date</label>
                    <input
                        required
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
                        required
                        className="border p-3"
                        type="date"
                        onChange={(e) => setDueDate(e.target.value.toString())}
                    />
                </div>
                <div className="flex flex-col py-2">
                    <label className="py-2 font-medium">Comment</label>
                    <input
                        required
                        className="border p-3"
                        type="textarea"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </div>
                {sent.length > 0 ? (
                    <div
                        className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
                        role="alert"
                    >
                        <span className="block sm:inline">
                            Successfully created!
                        </span>
                    </div>
                ) : (
                    <></>
                )}

                {error.length > 0 ? (
                    <div
                        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                        role="alert"
                    >
                        <span className="block sm:inline">{error}</span>
                    </div>
                ) : (
                    <></>
                )}

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
