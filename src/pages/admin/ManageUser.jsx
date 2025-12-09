import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { doc, collection, deleteDoc, onSnapshot } from "firebase/firestore";
import { toast } from "react-toastify";

function ManageUser() {
  const [users, setUsers] = useState([]);

  // ✅ Real-time listener for users
  useEffect(() => {
    const userRef = collection(db, "users");
    const unsubscribe = onSnapshot(userRef, (snapshot) => {
      const userData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(userData);
    });

    return () => unsubscribe(); // cleanup listener
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "users", id));
      toast.success("Deleted Successfully", { position: "top-center" });
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Error deleting user", { position: "top-center" });
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Manage User</h1>

      <div className="mb-6 p-6 rounded-lg bg-white shadow-md">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border-b">Name</th>
              <th className="p-3 border-b">Email</th>
              <th className="p-3 border-b">Role</th>
              <th className="p-3 border-b">Status</th>
              <th className="p-3 border-b">Action</th>
            </tr>
          </thead>
          <tbody className="text-left">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="p-3 border-b">{user.name}</td>
                <td className="p-3 border-b">{user.email}</td>
                <td className="p-3 border-b">{user.role}</td>
                <td className="p-3 border-b">{user.status}</td>
                <td className="p-3 border-b flex gap-2">
                  <button className="rounded-md bg-blue-500 px-2 py-1 text-white">
                    Edit
                  </button>
                  <button
                    className="rounded-md bg-green-500 px-2 py-1 text-white"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageUser;
