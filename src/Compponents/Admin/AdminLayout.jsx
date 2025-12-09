import React from 'react'
import { NavLink } from 'react-router-dom'

function AdminLayout({children}) {
  return (
    <>
    <div className='flex'>
      
       <aside  className='w-64 min-h-screen bg-orange-500 text-white p-3 font-medium'>

        <nav className='flex flex-col gap-4'>
            <NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? "bg-white text-orange-950 p-2 rounded-md block" :  "hover:bg-orange-900 p-2 rounded-md block"}>Dashboard</NavLink> 

            <NavLink to="/admin/addfood" className={({ isActive }) => isActive ? "bg-white text-orange-950 p-2 rounded-md block" : "hover:bg-orange-900 p-2 rounded-md block"}>Add Food</NavLink>

            <NavLink to="/admin/manageuser" className={({ isActive }) => isActive ? "bg-white text-orange-950 p-2 rounded-md block" : " hover:bg-orange-900 p-2 rounded-md block"}>Manage User</NavLink>

            <NavLink to="/admin/manageorder" className={({ isActive }) => isActive ? "bg-white text-orange-950 p-2 rounded-md block" : "hover:bg-orange-900 p-2 rounded-md block"}>Manage Order</NavLink>
        </nav>
          {/* link div  */}
       </aside> 
       <div className='flex-1 '>
        {children}
       </div>

     
    </div>
    </>
  )
}

export default AdminLayout
