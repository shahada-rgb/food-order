import React from 'react'
import { foodData } from '../../data/foodData'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../Cart/CartSlice'
function FoodCard({ id, name, price, oldPrice, image, category }) {
  const dispatch = useDispatch();
  return (

    <div className='bg-white rounded-2xl shadow-md transition-all duration-3000 w-[270px] cursor-pointer hover:shadow-xl  '>
      <img src={image} alt={name} className='w-full h-48 object-cover rounded-t-2xl' />

      <div className='p-4 space-y-2'>
        <h1 className='text-lg font-semibold text-gray-800'>{name}</h1>

        <div className='flex items-center gap-2'>
          <p className='text-xl font-bold text-orange-600'>₹{price}</p>
          <p className='text-sm line-through text-gray-400'>₹{oldPrice}</p>
        </div>

        <button
          onClick={() => dispatch(addToCart({ id, name, price, image, category, oldPrice }))}
          className='w-full bg-orange-500 text-white font-semibold py-2 rounded-lg hover:bg-orange-700 transition-all duration-300'
        >
          Add to Cart
        </button>
      </div>
    </div>

  )
}

export default FoodCard
