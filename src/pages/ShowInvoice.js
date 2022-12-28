import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserAuth } from "../util/FirebaseContext";

const ShowInvoice = () => {
    const [invoice, setInvoice] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();
    const { getInvoice } = UserAuth();

    useEffect(() => {
        getInvoice(id).then((data) => {
            setInvoice(data);
        });
    }, []);

    const { buyerName, comment, dueDate, issueDate, itemName, price } = invoice;

    return (
        <div className="max-w-[700px] mx-auto py-5">
            <form>
                <div className="flex flex-col py-2">
                    <label className="py-2 font-medium">Buyer's name</label>
                    <input
                        className="border p-3"
                        disabled
                        type="text"
                        defaultValue={buyerName}
                    />
                </div>

                <div className="flex flex-col py-2">
                    <label className="py-2 font-medium">Item name</label>
                    <input
                        className="border p-3"
                        disabled
                        type="text"
                        defaultValue={itemName}
                    />
                </div>
                <div className="flex flex-col py-2">
                    <label className="py-2 font-medium">Price</label>
                    <input
                        className="border p-3"
                        disabled
                        type="number"
                        defaultValue={price}
                    />
                </div>
                <div className="flex flex-col py-2">
                    <label className="py-2 font-medium">Issue date</label>
                    <input
                        className="border p-3"
                        disabled
                        type="date"
                        defaultValue={issueDate}
                    />
                </div>
                <div className="flex flex-col py-2">
                    <label className="py-2 font-medium">Due date</label>
                    <input
                        className="border p-3"
                        disabled
                        type="date"
                        defaultValue={dueDate}
                    />
                </div>
                <div className="flex flex-col py-2">
                    <label className="py-2 font-medium">Comment</label>
                    <input
                        className="border p-3"
                        disabled
                        type="textarea"
                        defaultValue={comment}
                    />
                </div>
            </form>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-4"
                onClick={() => navigate("/invoices")}
            >
                Go back
            </button>
        </div>
    );
};

export default ShowInvoice;
