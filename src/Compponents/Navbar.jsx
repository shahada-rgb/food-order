import React from 'react'
import { NavLink } from "react-router-dom";
import { FaShoppingCart,FaBars } from 'react-icons/fa';

function Navbar() {
  return (
    <div className=' max-w-8xl mx-auto px-4 py-2 flex items-center justify-between  bg-transparent' >
      {/* navbar  */}
      <nav className='bg-grey-500  flex  bg-transparent  shadow-md py-4 w-full '>
        <h1 className='font-bold font- text-3xl  text-red-700 text-shadow-amber-600'> Byte<span className='text-orange-400'>Feast</span></h1>
        <div className='hidden md:flex space-x-4 justify-center w-full text-xl   '>
{/* navbar link  */}

        <NavLink to='/'className={({ isActive }) =>
            isActive
         ? "relative font-bold-underline " 
        :" relative hover:underline text-orange-300 transition"
        } >Home</NavLink>
        
        <NavLink   to='/menu' >Menu</NavLink>
        </div>
{/* cart icon  */}
        <NavLink to='/cart' > <FaShoppingCart size={20} /><span className=' text-xs w-3 h-5 top-1 right-4 text-red-600 font-semibold absolute rounded-full flex items-center '>0</span></NavLink>

        {/* mobile menu button  */}

        <button className='md:hidden '><span className=' to-black'><FaBars size={24} /></span> </button>

       
        
      </nav>
    </div>
  )
}

export default Navbar
