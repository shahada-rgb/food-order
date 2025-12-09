import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Navbar from '../Compponents/Navbar';
import Home from '../pages/User/Home';
import Menu from '../pages/User/Menu';
import Cart from '../pages/User/Cart';
import Login from '../Compponents/user/Login';
import Checkout from '../pages/User/Checkout';
import Order from "../pages/User/Order"


import Signup from '../pages/User/Signup';
import Profile from '../pages/User/Profile';
import { ToastContainer } from 'react-toastify';

function UserRoutes() {
  return (
    <>
     
        <Navbar />

        <Routes>
          <Route path='/' element={<Home />} />

          <Route path='/Menu' element={<Menu />} />
          <Route path='/cart' element={<Cart />} />

          <Route path='/checkout' element={<Checkout />} />

          <Route path='/Login' element={<Login />} />
          <Route path='/Signup' element={<Signup />} />
          <Route path='/profile' element={<Profile />} />
        <Route path='/orders' element={<Order/>} />



        </Routes>
     
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  )
}

export default UserRoutes
