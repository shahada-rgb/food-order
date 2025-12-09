import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { onSnapshot, query, where, collection } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

function Order() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        const orderQuery = query(
          collection(db, "orders"),
          where("userId", "==", user.uid)
        );

        const unsubscribeOrders = onSnapshot(orderQuery, (snapshot) => {
          const orderData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setOrders(orderData);
          setLoading(false);
        });

        return unsubscribeOrders;
      } else {
        setOrders([]);
        setLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">📦 My Orders</h1>

      {loading ? (
        <p className="text-gray-600 text-center">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-600 text-center">No orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white shadow-md rounded-xl p-5 border border-gray-100 hover:shadow-lg transition"
            >
              <div className="flex justify-between mb-3">
                <h2 className="font-semibold text-lg text-gray-700">
                  Order #{order.id.slice(0, 6)}
                </h2>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${order.status === "Delivered"
                      ? "bg-green-100 text-green-700"
                      : order.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                >
                  {order.status}
                </span>
              </div>

              <div className="text-gray-600 mb-2">
                <p className="font-medium mb-1">🗓 Date: {order.date}</p>
                <p className="font-medium">💳 Payment: {order.paymentMethod}</p>
              </div>

              <div className="border-t mt-4 pt-3 flex justify-between">
                <p className="font-semibold text-gray-700">
                  Total Items: {order.items?.length}
                </p>
                <p className="font-bold text-lg text-gray-900">
                  ₹{order.totalAmount}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Order;
