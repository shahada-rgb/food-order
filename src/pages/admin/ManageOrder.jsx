import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc
} from "firebase/firestore";

function ManageOrder() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const snapshot = await getDocs(collection(db, "orders"));
    const data = snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));
    setOrders(data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleComplete = async (orderId) => {
    await updateDoc(doc(db, "orders", orderId), {
      status: "Delivered",
    });
    fetchOrders();
  };

  const handleDelete = async (orderId) => {
    await deleteDoc(doc(db, "orders", orderId));
    fetchOrders();
  };

  return (
    <div className="p-6 rounded-lg bg-white shadow-md">
      <h2 className="text-xl font-bold mb-5">Manage Orders</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3 border-b">Order ID</th>
            <th className="p-3 border-b">Customer</th>
            <th className="p-3 border-b">Date</th>
            <th className="p-3 border-b">Payment</th>
            <th className="p-3 border-b">Amount</th>
            <th className="p-3 border-b">Status</th>
            <th className="p-3 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="p-3 border-b">{order.id.slice(0, 6)}</td>
                <td className="p-3 border-b">{order.customerName}</td>
                <td className="p-3 border-b">{order.date}</td>
                <td className="p-3 border-b">{order.paymentMethod}</td>
                <td className="p-3 border-b">₹{order.totalAmount}</td>
                <td className="p-3 border-b">{order.status}</td>

                <td className="p-3 border-b flex gap-2">
                  <button
                    onClick={() => handleDelete(order.id)}
                    className="rounded-md bg-red-600 px-2 py-1 text-white"
                  >
                    Delete
                  </button>

                  {order.status !== "Delivered" && (
                    <button
                      onClick={() => handleComplete(order.id)}
                      className="rounded-md bg-green-600 px-2 py-1 text-white"
                    >
                      Mark Delivered
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center text-gray-500 p-4">
                No orders available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ManageOrder;
