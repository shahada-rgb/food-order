import React from 'react'
import SearchBar from './SearchBar'
import { FaArrowRight } from 'react-icons/fa'

function HeroSection() {
  return (
   
    <div className='bg-orange-400 w-full h-200 py-0 '>
      {/* text  */}
      <div className='text-center  bottom-3 py-20'>
        <h1 className='text-white font-bold text-5xl '>Order Food Online, </h1>
        <h1 className='text-white font-bold text-5xl'> Freshly Made for You</h1>

      </div>
      <div className='w-full text-center right-5'>
        <SearchBar/>
      </div>
       {/* food card  */}
       <div className='w-[450px]   bg-white rounded-xl p-4 mx-auto mt-10 shadow-lg '>
        <div className='flex justify-between items-center space-x-4  '>  
          {/* right part  */}
          <div>
          <h1 className='text-gray-700 font-extrabold text-4xl'> FOOD DELIVER</h1>
          <h2 className='text-gray-400 font-medium text-xl'> FROM RESTAURANTS</h2>
          
            <button className=' flex justify-around  bg-orange-400 text-white px-4 py-2 rounded-xl shadow-md hover:bg-orange-500 font-semibold '>Explore<FaArrowRight size={15}/> </button>

          </div>
          {/* left side  */}
          <div>
            <img src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png" alt="food-delivery" className='w-32 h-32 '/>
          </div>

        </div>

       </div>
   
      
    </div>
  )
}

export default HeroSection
