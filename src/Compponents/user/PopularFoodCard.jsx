import React from "react";


function PopularFoodCard({ image, name, price, rating, onAddToCart }) {
 
  return (
    <div className="w-48 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-3 cursor-pointer">
      <img
        src={image}
        alt={name}
        className="h-32 w-full object-cover rounded-lg"
      />

      <h3 className="mt-2 font-semibold text-gray-800 text-sm">{name}</h3>

      <p className="text-orange-500 font-bold text-lg mt-1">₹{price}</p>

      <p className="text-yellow-500 text-sm mb-2">⭐ {rating}</p>

      {/* <button
        onClick={onAddToCart}
        className="w-full bg-orange-500 text-white py-1 rounded-lg text-sm hover:bg-orange-600 transition-all"
      >
        Add to Cart
      </button> */}
      <button
        onClick={onAddToCart}
        className="w-full bg-orange-500 text-white font-semibold py-2 rounded-lg hover:bg-orange-700 transition-all duration-300"
      >
        Add to Cart
      </button>
    </div>
  );
}

export default PopularFoodCard;
