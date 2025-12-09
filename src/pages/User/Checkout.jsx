import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { db, auth } from "../../firebase";
import {
  addDoc,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { clearCart } from "../../Cart/CartSlice";
import { onAuthStateChanged } from "firebase/auth";

function Checkout() {
  const dispatch = useDispatch();
  const { cartItems, totalAmount, totalQuantity } = useSelector(
    (state) => state.cart
  );

  const [addresses, setAddresses] = useState([]);
  const [selectedAdd, setSelectedAdd] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loadingAddresses, setLoadingAddresses] = useState(false);
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState(null);

  // form states for new address
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [pincode, setPincode] = useState("");
  const [locality, setLocality] = useState("");
  const [addressDetail, setAddressDetail] = useState("");

  // fetch addresses when auth state changes
  useEffect(() => {
    setLoadingAddresses(true);
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setAddresses([]);
        setSelectedAdd(null);
        setLoadingAddresses(false);
        return;
      }

      try {
        const userRef = doc(db, "users", user.uid); // use the passed user, not auth.currentUser
        const userSnap = await getDoc(userRef);
        const existing = userSnap.exists() ? userSnap.data().addresses || [] : [];
        setAddresses(existing);

        // if nothing selected, auto-select first address (nice UX)
        if (existing.length > 0 && !selectedAdd) {
          setSelectedAdd((prev) => prev || existing[0].id);
        }
      } catch (err) {
        console.error("address fetch error:", err);
        setAddresses([]);
        setSelectedAdd(null);
      } finally {
        setLoadingAddresses(false);
      }
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // empty deps: onAuthStateChanged handles updates

  // helper: simple validation for address inputs
  const validateAddressInputs = () => {
    if (!name.trim()) return "Name is required";
    if (!phone.trim() || phone.trim().length < 7) return "Enter a valid phone";
    if (!pincode.trim()) return "Pincode is required";
    if (!addressDetail.trim()) return "Address detail is required";
    return null;
  };

  // add new address
  const handleAddAddress = async (e) => {
    e.preventDefault();
    setError(null);

    const v = validateAddressInputs();
    if (v) {
      setError(v);
      return;
    }

    // ensure user exists
    const user = auth.currentUser;
    if (!user?.uid) {
      setError("You must be logged in to save an address");
      return;
    }

    const newAddress = {
      id: Date.now().toString(),
      name: name.trim(),
      phone: phone.trim(),
      pincode: pincode.trim(),
      locality: locality.trim(),
      addressDetail: addressDetail.trim(),
    };

    try {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const existing = userSnap.data().addresses || [];
        await updateDoc(userRef, { addresses: [...existing, newAddress] });
        setAddresses((prev) => [...prev, newAddress]);
      } else {
        await setDoc(userRef, { addresses: [newAddress] });
        setAddresses([newAddress]);
      }

      // auto-select new address for user convenience
      setSelectedAdd(newAddress.id);

      // reset form
      setName("");
      setPhone("");
      setPincode("");
      setLocality("");
      setAddressDetail("");
      setShowForm(false);
      setError(null);
    } catch (err) {
      console.error("Failed to save address:", err);
      setError("Failed to save address. Try again.");
    }
  };

  // place order
  const handlePlaceOrder = async () => {
    setError(null);

    // check login
    const user = auth.currentUser;
    if (!user?.uid) {
      setError("Please login to place order");
      alert("Please login to place order");
      return;
    }

    // check cart
    if (!cartItems || cartItems.length === 0) {
      setError("Your cart is empty");
      alert("Your cart is empty");
      return;
    }

    // chosen address
    const chosen = addresses.find((a) => a.id === selectedAdd);
    if (!chosen) {
      setError("Please select a delivery address");
      alert("Please select an address");
      return;
    }

    // sanitize items to avoid undefined values
    const sanitizedItems = cartItems.map((it) => ({
      id: it.id ?? it._id ?? null,
      name: it.name ?? "",
      price: typeof it.price === "number" ? it.price : Number(it.price || 0),
      quantity: typeof it.quantity === "number" ? it.quantity : Number(it.quantity || 1),
      // add any other fields you want to store — ensure not undefined
    }));

    // final order object - avoid undefined anywhere
    const orderData = {
      userId: user.uid,
      items: sanitizedItems,
      totalAmount: totalAmount ?? sanitizedItems.reduce((s, i) => s + i.price * i.quantity, 0),
      totalQuantity: totalQuantity ?? sanitizedItems.reduce((s, i) => s + i.quantity, 0),
      createdAt: serverTimestamp(), // server timestamp is better than locale string
      paymentMethod: "Cash on Delivery",
      status: "Pending",
      address: {
        id: chosen.id,
        name: chosen.name ?? "",
        phone: chosen.phone ?? "",
        pincode: chosen.pincode ?? "",
        locality: chosen.locality ?? "",
        addressDetail: chosen.addressDetail ?? "",
      },
    };

    setPlacing(true);
    try {
      const docRef = await addDoc(collection(db, "orders"), orderData);
      console.log("Order placed with ID:", docRef.id);
      alert("🚀 Order placed successfully!");
      dispatch(clearCart());
    } catch (err) {
      // Firestore will throw if any field is undefined — log full error
      console.error("Error placing order:", err);
      setError("Failed to place order. Please try again.");
      alert("Failed to place order. Please try again.");
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white shadow rounded">
      {cartItems.length === 0 ? (
        <p className="text-center text-2xl font-extrabold text-gray-300 py-20">
          Your cart is empty
        </p>
      ) : (
        <div>
          <h1 className="text-center text-3xl font-semibold mb-6">Order Summary</h1>

          {/* address field */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-3">Delivery Address</h2>

            {loadingAddresses ? (
              <p>Loading addresses...</p>
            ) : addresses.length === 0 ? (
              <p>No address found. Please add an address.</p>
            ) : (
              addresses.map((addr) => (
                <label
                  key={addr.id}
                  className="block border p-3 rounded mb-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="address"
                    value={addr.id}
                    checked={selectedAdd === addr.id}
                    onChange={() => setSelectedAdd(addr.id)}
                    className="mr-2"
                  />
                  <span>
                    {addr.name}, {addr.locality}, {addr.pincode}
                  </span>
                  <div className="text-sm text-gray-600">{addr.addressDetail}</div>
                  <div className="text-sm text-gray-600">Phone: {addr.phone}</div>
                </label>
              ))
            )}

            <button
              onClick={() => {
                setShowForm(true);
                setError(null);
              }}
              className="text-blue-600 font-semibold mt-2"
            >
              + Add New Address
            </button>

            {showForm && (
              <form onSubmit={handleAddAddress} className="border p-4 rounded mt-4">
                {error && (
                  <div className="text-red-500 mb-2">
                    {error}
                  </div>
                )}
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 border rounded mb-2"
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-2 border rounded mb-2"
                />
                <input
                  type="text"
                  placeholder="Pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="w-full p-2 border rounded mb-2"
                />
                <input
                  type="text"
                  placeholder="Locality"
                  value={locality}
                  onChange={(e) => setLocality(e.target.value)}
                  className="w-full p-2 border rounded mb-2"
                />
                <textarea
                  placeholder="Address Detail"
                  value={addressDetail}
                  onChange={(e) => setAddressDetail(e.target.value)}
                  className="w-full p-2 border rounded mb-2"
                />
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    Save Address
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setError(null);
                    }}
                    className="bg-gray-200 px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* cart items */}
          <div className="mt-6">
            <div className="flex mb-2 font-semibold">
              <div className="w-1/2">Item</div>
              <div className="w-1/4">Quantity</div>
              <div className="w-1/4">Price</div>
            </div>

            {cartItems.map((item, idx) => (
              <div key={item.id ?? idx} className="flex mb-2">
                <div className="w-1/2">{item.name}</div>
                <div className="w-1/4">{item.quantity}</div>
                <div className="w-1/4">₹{item.price * item.quantity}</div>
              </div>
            ))}

            <div className="flex mt-4 font-semibold">
              <div className="w-1/2">Total Items: {totalQuantity}</div>
              <div className="w-1/2 text-right">Total Amount: ₹{totalAmount}</div>
            </div>
          </div>

          {error && <div className="text-red-500 mt-3">{error}</div>}

          <button
            onClick={handlePlaceOrder}
            disabled={!selectedAdd || placing}
            className={`w-full text-white py-2 px-4 rounded-md font-semibold mt-6 ${selectedAdd && !placing
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
              }`}
          >
            {placing ? "Placing order..." : "Place Order"}
          </button>
        </div>
      )}
    </div>
  );
}

export default Checkout;
