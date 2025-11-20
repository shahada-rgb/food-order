import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Compponents/Navbar';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Checkout from './pages/Checkout';
import Success from './pages/Success';

function App() {
 

  return (
    <>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />

          <Route path='/menu' element={<Menu />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<Login />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/success' element={<Success />} />


      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
