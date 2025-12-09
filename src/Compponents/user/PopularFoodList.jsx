import React from "react";
import PopularFoodCard from "./PopularFoodCard";
import { popularFoods } from "../../data/popular";
import { useDispatch } from "react-redux";
import { addToCart } from "../../Cart/CartSlice"; 



function PopularFoodsList() 
{
  const dispatch=useDispatch()
  const handleAddToCart = (food) => {
    dispatch(addToCart({
      id: food.id,
      name: food.name,
      price: food.price,
      image: food.image,
      category: food.category || "",
      oldPrice: food.oldPrice || 0,
    }));
  };
 
  return (
    <div className="px-4 mt-6">
      <h2 className="text-xl font-bold text-gray-800">Popular Foods</h2>
      <p className="text-sm text-gray-500 mb-4">Most loved dishes this week</p>

      <div className="flex gap-4 overflow-x-auto scrollbar-hide py-2">
        {popularFoods.map((food) => (
          <div key={food.name} className="flex-shrink-0 w-48">
            <PopularFoodCard
              name={food.name}
              image={food.image}
              price={food.price}
              rating={food.rating}
              onAddToCart={() => handleAddToCart(food)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PopularFoodsList;
