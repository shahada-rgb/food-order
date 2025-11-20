import React from 'react'
import { NavLink } from "react-router-dom";
import { FaShoppingCart } from 'react-icons/fa';

function Navbar() {
  return (
    <div>
      <nav className='bg-grey-500  flex   py-4 w-full'>
        <h1 className='font-bold font- text-3xl  text-red-700 text-shadow-amber-600'> ByteFeast</h1>
        <div className='right-1 space-x-4 justify-end flex w-full text-xl '>
        <NavLink to='/' className={({ isActive }) =>
          isActive ? "font-bold-underline mix-blend-color-burn" : "hover:underline"
        } >Home</NavLink>
        <NavLink to='/menu' >Menu</NavLink>
        <NavLink to='/cart' > <FaShoppingCart size={22}/></NavLink>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
