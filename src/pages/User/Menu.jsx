import React, { useState, useEffect } from "react";
import FoodCard from "../../Compponents/user/FoodCard";
import Banner from "../../Compponents/user/Banner";
import CategoryCard from "../../Compponents/user/CategoryCard";
import { category } from "../../data/Catogory";
import Footer from "../../Compponents/Footer";
import { db } from "../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { foodData } from "../../data/foodData";
import SearchBar from "../../Compponents/Hero/SearchBar";

function Menu() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [firebaseFoods, setFirebaseFoods] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchFoods = async () => {
      let q = collection(db, "foods");
      if (selectedCategory !== "All") {
        q = query(q, where("category", "==", selectedCategory));
      }
      const querySnapshot = await getDocs(q);
      const foodList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFirebaseFoods(foodList);
    };

    fetchFoods();
  }, [selectedCategory]);

  const filteredLocalFoods =
    selectedCategory === "All"
      ? foodData
      : foodData.filter((item) => item.category === selectedCategory);

  let allFoods = [...filteredLocalFoods, ...firebaseFoods];

  // 🔥 Apply search filter
  if (searchTerm.trim() !== "") {
    allFoods = allFoods.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  return (
    <div className="bg-[#FFF8F3]">
      <SearchBar onSearch={(value) => setSearchTerm(value)} />

      <Banner />

      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-700">Categories</h2>

        <div className="flex gap-6 overflow-x-auto py-3 scrollbar-hide">
          {category.map((cat) => (
            <div key={cat.name} onClick={() => setSelectedCategory(cat.name)}>
              <CategoryCard
                name={cat.name}
                image={cat.image}
                active={selectedCategory === cat.name}
              />
            </div>
          ))}
        </div>

        <h2 className="text-3xl font-bold mt-8 text-orange-600 underline">
          {selectedCategory} Items
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 my-6">
          {allFoods.length > 0 ? (
            allFoods.map((item) => <FoodCard key={item.id} {...item} />)
          ) : (
            <p className="text-gray-500">No items found.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Menu;
