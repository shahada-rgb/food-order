import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, onSnapshot } from "firebase/firestore";

function AdminDashboard() {
  const [usersCount, setUsersCount] = useState(0);
  const [orders, setOrders] = useState([]);
  const [revenue, setRevenue] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    // ✅ Listen to users collection
    const unsubUsers = onSnapshot(collection(db, "users"), (snapshot) => {
      setUsersCount(snapshot.size);
    });

    // ✅ Listen to orders collection
    const unsubOrders = onSnapshot(collection(db, "orders"), (snapshot) => {
      const ordersData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(ordersData);

      // Calculate revenue & pending
      const totalRevenue = ordersData.reduce(
        (sum, order) => sum + (order.amount || 0),
        0
      );
      setRevenue(totalRevenue);

      const pending = ordersData.filter(
        (order) => order.status === "Pending"
      ).length;
      setPendingCount(pending);
    });

    return () => {
      unsubUsers();
      unsubOrders();
    };
  }, []);

  return (
    <div>
      {/* Summary cards */}
      <div className="grid grid-cols-4 gap-6 p-5">
        <div className="bg-orange-200 text-black p-6 rounded-lg shadow-md text-center">
          <h2 className="text-lg font-semibold">Users</h2>
          <p className="text-2xl font-bold">{usersCount}</p>
        </div>
        <div className="bg-orange-100 text-black p-6 rounded-lg shadow-md text-center">
          <h2 className="text-lg font-semibold">Orders</h2>
          <p className="text-2xl font-bold">{orders.length}</p>
        </div>
        <div className="bg-orange-200 text-black p-6 rounded-lg shadow-md text-center">
          <h2 className="text-lg font-semibold">Revenue</h2>
          <p className="text-2xl font-bold">₹{revenue}</p>
        </div>
        <div className="bg-orange-100 text-black p-7 rounded-lg shadow-md text-center">
          <h2 className="text-lg font-semibold">Pending</h2>
          <p className="text-2xl font-bold">{pendingCount}</p>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border-b">Order ID</th>
              <th className="p-3 border-b">Customer</th>
              <th className="p-3 border-b">Status</th>
              <th className="p-3 border-b">Amount</th>
            </tr>
          </thead>
          <tbody>
            {orders.slice(0, 5).map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="p-3 border-b">#{order.id}</td>
                <td className="p-3 border-b">{order.customer}</td>
                <td
                  className={`p-3 border-b font-medium ${order.status === "Completed"
                      ? "text-green-600"
                      : order.status === "Pending"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                >
                  {order.status}
                </td>
                <td className="p-3 border-b">₹{order.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;
