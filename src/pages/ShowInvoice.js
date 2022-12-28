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
                <input disabled type="text" value={buyerName} />
                <br />

                <label>Item name</label>
                <input disabled type="text" value={itemName} />
                <br />

                <label>Price</label>
                <input disabled type="text" value={price} />
                <br />

                <label>Issue date</label>
                <input disabled type="date" value={issueDate} />
                <br />

                <label>Due date</label>
                <input disabled type="date" value={dueDate} />
                <br />

                <label>Comment</label>
                <input disabled type="textarea" value={comment} />
                <br />
            </form>
        </div>
    );
};

export default ShowInvoice;
