import React, { useEffect, useState } from 'react'
import { bannerData } from '../../data/Banner/banner'
import { Navigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../Cart/CartSlice'


function Banner() {
  const[current, setCurrent]=useState(0)
  const item= bannerData[current]
  const dispatch=useDispatch();
 

  useEffect(()=>{
    const interval=setInterval(()=>{
      
       setCurrent(prev=>prev===bannerData.length -1?0:prev+1) 
    },5000)
    return  ()=> clearInterval(interval)
  })
  return (
    <>
    <div>
        <div className="relative w-full h-[450px] rounded ">
          {/* Background Image */}
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />

          {/* Overlay Content */}
          <div className="absolute left-6 top-1/2 transform -translate-y-1/2 
                  bg-gradient-to-r from-black/70 to-transparent 
                  p-6 rounded-lg text-white max-w-sm">

            {/* Offer Badge */}
            <p className="text-2xl font-bold mb-4 
                 bg-amber-400 text-black px-4 py-2 
                 rounded-lg shadow-lg inline-block uppercase tracking-wide">
              {item.offer}
            </p>

            {/* Description */}
            <p className="text-lg mb-2">{item.description}</p>

            {/* Price Highlight */}
            <p className="text-xl font-semibold text-green-400 mb-4">
              {item.price}
            </p>

            {/* Call to Action */}
           
            
            {/* <button className="bg-amber-500 text-black px-5 py-2 
                       rounded-lg shadow-md hover:bg-amber-600 
                       transition duration-300">
              onclick={() => {
                dispatch(addToCart(item));
                Navigate('/cart')
              }}
              Buy Now
            </button> */}
          </div>
        </div>

       
         
       
      
    </div>
    </>
  )
}

export default Banner
