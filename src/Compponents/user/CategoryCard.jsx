import React from "react";

function CategoryCard({ image, name, onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex flex-col items-center cursor-pointer select-none transition-all duration-300
                 hover:scale-110 hover:text-orange-500"
    >
      <div className="h-35 w-35 rounded-full shadow-md border border-gray-200 overflow-hidden 
                      transition-all duration-300 hover:shadow-xl">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover"
        />
      </div>

      <p className="mt-2 text-sm font-semibold text-gray-700 hover:text-orange-500 transition-all duration-300">
        {name}
      </p>
    </div>
  );
}

export default CategoryCard;
