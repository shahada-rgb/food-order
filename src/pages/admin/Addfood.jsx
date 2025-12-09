import React, { useState, useRef } from "react";
import { db, storage } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function Addfood() {
  const [foodData, setFoodData] = useState({
    name: "",
    price: "",
    category: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const fileInputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!foodData.name || !foodData.price || !foodData.category || !foodData.image) {
      alert("Please fill all fields!");
      return;
    }

    setLoading(true);
    setSuccessMsg("");

    const imageRef = ref(storage, `foodImages/${Date.now()}_${foodData.image.name}`);
    const uploadTask = uploadBytesResumable(imageRef, foodData.image);

    uploadTask.on(
      "state_changed",
      null,
      (error) => {
        console.error("Upload Error:", error);
        alert("Image upload failed!");
        setLoading(false);
      },
      async () => {
        try {
          const imageURL = await getDownloadURL(uploadTask.snapshot.ref);

          await addDoc(collection(db, "foods"), {
            name: foodData.name,
            price: Number(foodData.price),
            category: foodData.category,
            image: imageURL,
            createdAt: serverTimestamp(),
          });

          setSuccessMsg(`${foodData.name} added successfully ✔`);
          setFoodData({ name: "", price: "", category: "", image: null });
          fileInputRef.current.value = "";
        } catch (err) {
          console.error("Firestore Add Error:", err);
          alert("Error adding food to Firestore");
        } finally {
          setLoading(false);
        }
      }
    );
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white rounded-md shadow-md">
      {successMsg && <p className="text-green-600 font-semibold mb-4">{successMsg}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Food Name"
          value={foodData.name}
          onChange={(e) => setFoodData({ ...foodData, name: e.target.value })}
          className="border p-2 rounded"
        />

        <input
          type="number"
          placeholder="Price"
          value={foodData.price}
          onChange={(e) => setFoodData({ ...foodData, price: e.target.value })}
          className="border p-2 rounded"
        />

        <select
          value={foodData.category}
          onChange={(e) => setFoodData({ ...foodData, category: e.target.value })}
          className="border p-2 rounded"
        >
          <option value="">Select Category</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
          <option value="Snacks">Snacks</option>
          <option value="Drinks">Drinks</option>
          <option value="Pizza">Pizza</option>
          <option value="Burger">Burger</option>
        </select>

        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => setFoodData({ ...foodData, image: e.target.files[0] })}
          className="border p-2 rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-orange-600 text-white p-2 rounded hover:bg-orange-700"
        >
          {loading ? "Uploading..." : "Add Food"}
        </button>
      </form>
    </div>
  );
}

export default Addfood;
