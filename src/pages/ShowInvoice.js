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
        <div>
            <form>
                <label>Buyer's name</label>
                <input disabled type="text" defaultValue={buyerName} />
                <br />

                <label>Item name</label>
                <input disabled type="text" defaultValue={itemName} />
                <br />

                <label>Price</label>
                <input disabled type="number" defaultValue={price} />
                <br />

                <label>Issue date</label>
                <input disabled type="date" defaultValue={issueDate} />
                <br />

                <label>Due date</label>
                <input disabled type="date" defaultValue={dueDate} />
                <br />

                <label>Comment</label>
                <input disabled type="textarea" defaultValue={comment} />
                <br />
            </form>
            <button onClick={() => navigate("/")}>Go back</button>
        </div>
    );
};

export default ShowInvoice;
