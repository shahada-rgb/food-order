import React, { useState, useEffect } from 'react'
import { db, auth } from '../../firebase';
import { doc, getDoc, updateDoc,deleteDoc } from 'firebase/firestore';

function Profile() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        const userRef = doc(db, 'users', auth.currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserData(userSnap.data());
        }
      }
    };
    fetchUserData();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    const userdata = { name, phone, email, gender };
    const userRef = doc(db, 'users', auth.currentUser.uid);
    await updateDoc(userRef, userdata);
    setUserData(userdata);
    setIsEditing(false);
  };

  const handleDelete=async ()=>{

    const confirmDel=window.confirm("Are you sure you want to delete your account? This action cannot be undone.");

    if (!confirmDel) return;

    try{

// delete user data from firestore 1
    const userRef = doc(db, 'users', auth.currentUser.uid);
    await deleteDoc(userRef);
    // delete user authentication account 2
    await auth.currentUser.delete();
    }catch(error){
      console.error("Error deleting account:",error);
    }
    // Optionally, redirect user after deletion
    // if (error.code === "auth/requires-recent-login") {
    //   alert("Please log in again before deleting your account.");
    //   // You can redirect to login page here
    // } else {
    //   alert("Failed to delete account. Please try again.");
    // }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
      {/* Avatar Section */}
      <div className="flex flex-col items-center mb-6">
        {userData?.avatar ? (
          <img
            src={userData.avatar}
            alt="Profile Avatar"
            className="w-24 h-24 rounded-full border-4 border-blue-500 shadow-md"
          />
        ) : (
          <div className="w-24 h-24 flex items-center justify-center rounded-full bg-blue-600 text-white text-2xl font-bold shadow-md">
            {userData?.name?.charAt(0).toUpperCase() || "U"}
          </div>
        )}
        <h2 className="mt-3 text-xl font-semibold">{userData?.name || "User"}</h2>
      </div>

      <h1 className="text-2xl font-bold mb-6 text-center">My Profile</h1>

      {userData ? (
        !isEditing ? (
          <div className="space-y-3">
            <p><span className="font-semibold">Name:</span> {userData.name}</p>
            <p><span className="font-semibold">Phone:</span> {userData.phone}</p>
            <p><span className="font-semibold">Email:</span> {auth.currentUser.email}</p>
            <p><span className="font-semibold">Gender:</span> {userData.gender}</p>

            <div className="flex gap-4 mt-6">
              <button
                className="flex-1 rounded-lg px-4 py-2 bg-blue-600 text-white hover:bg-blue-700"
                onClick={() => {
                  setIsEditing(true);
                  setName(userData.name || '');
                  setPhone(userData.phone || '');
                  setEmail(userData.email || auth.currentUser.email || '');
                  setGender(userData.gender || '');
                }}
              >
                Edit
              </button>
              <button 
              onClick={handleDelete}
                className="flex-1 rounded-lg px-4 py-2 bg-red-600 text-white hover:bg-red-700"
              >
                Delete Account
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSave} className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="male"
                  checked={gender === "male"}
                  onChange={(e) => setGender(e.target.value)}
                />
                Male
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="female"
                  checked={gender === "female"}
                  onChange={(e) => setGender(e.target.value)}
                />
                Female
              </label>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                type="submit"
                className="flex-1 rounded-lg px-4 py-2 bg-green-600 text-white hover:bg-green-700"
              >
                Save
              </button>
              <button
                type="button"
                className="flex-1 rounded-lg px-4 py-2 bg-gray-600 text-white hover:bg-gray-700"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        )
      ) : (
        <p className="text-center text-gray-500">Loading user data...</p>
      )}
    </div>
  );
}

export default Profile;
