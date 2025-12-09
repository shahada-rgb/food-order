import React from "react";
import { FaStar } from "react-icons/fa";

function RestaurantCard({ image, name, rating, deliveryTime, cuisines }) {
  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1 cursor-pointer">
      <img src={image} alt={name} className="h-40 w-full object-cover" />

      <div className="p-3">
        <h3 className="font-bold text-lg text-gray-800">{name}</h3>
        <p className="text-gray-500 text-sm">{cuisines}</p>

        <div className="flex justify-between items-center mt-3">
          <span className="flex items-center gap-1 text-sm font-semibold text-green-600">
            <FaStar size={14} /> {rating}
          </span>
          <span className="text-sm font-medium text-gray-600">
            {deliveryTime}
          </span>
        </div>
      </div>
    </div>
  );
}

export default RestaurantCard;
