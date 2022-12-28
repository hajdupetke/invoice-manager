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
                <tr
                    key={id}
                    className="border-b cursor-pointer hover:bg-slate-300"
                    onClick={() => navigate("/invoices/" + id)}
                >
                    <td className="text-m  text-gray-900 font-medium py-4 whitespace-nowrap">
                        {buyerName}
                    </td>
                    <td className="text-m  text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                        {comment}
                    </td>
                    <td className="text-m  text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                        {dueDate}
                    </td>
                    <td className="text-m  text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                        {issueDate}
                    </td>
                    <td className="text-m  text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                        {itemName}
                    </td>
                    <td className="text-m  text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                        {price}
                    </td>
                </tr>
            );
        });
    };

    return (
        <div className="max-w-[1000px] mx-auto py-20 text-l">
            <div>
                <h2 className="text-3xl font-bold py-3">Invoices</h2>
            </div>
            <table className="min-w-full">
                <thead className="border-b">
                    <tr>
                        <th className="text-m  text-gray-900 font-bold py-4 whitespace-nowrap">
                            Buyer's name
                        </th>
                        <th className="text-m  text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                            Comment
                        </th>
                        <th className="text-m  text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                            Due Date
                        </th>
                        <th className="text-m  text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                            Issue Date
                        </th>
                        <th className="text-m  text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                            Item Name
                        </th>
                        <th className="text-m  text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                            Price
                        </th>
                    </tr>
                </thead>
                <tbody>{invoices ? renderInvoices() : <></>}</tbody>
            </table>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-10"
                onClick={() => navigate("/create")}
            >
                Create
            </button>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-4"
                onClick={() => navigate("/")}
            >
                Go back
            </button>
        </div>
    );
};

export default Invoices;
