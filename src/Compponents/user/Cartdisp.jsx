import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { increaseQuantity, decreaseQuantity, clearCart, removeFromCart } from '../../Cart/CartSlice';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';

function Cartdisp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, totalAmount, totalQuantity } = useSelector((state) => state.cart);

  return (
    <div className='max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg'>
      <h2 className='text-3xl font-bold mb-6 text-center text-orange-500'>Your Cart</h2>

      {/* Show items */}
      {cartItems.length === 0 ? (
        <p className='text-2xl text-center font-semibold text-gray-500 mt-10'>Cart is Empty</p>
      ) : (
        <>
          {cartItems.map((item, id) => (
            <div key={id} className='grid grid-cols-5 gap-4 items-center border-b py-4'>
              {/* Image */}
              <div className='col-span-1'>
                <img
                  src={item.image}
                  alt={item.name}
                  className='w-20 h-20 object-cover rounded-lg shadow-sm'
                />
              </div>

              {/* Name & Price */}
              <div className='col-span-2'>
                <h3 className='font-semibold text-lg'>{item.name}</h3>
                <p className='text-gray-600'>₹{item.price} x {item.quantity}</p>
              </div>

              {/* Quantity Buttons */}
              <div className='flex flex-col items-center justify-center gap-2'>
                <button
                  className='px-3 py-1 bg-gray-200 rounded hover:bg-gray-300'
                  onClick={() => dispatch(increaseQuantity(item))}
                >
                  +
                </button>
                <button
                  className='px-3 py-1 bg-gray-200 rounded hover:bg-gray-300'
                  onClick={() => dispatch(decreaseQuantity(item))}
                >
                  -
                </button>
              </div>

              {/* Remove Button */}
              <div className='flex justify-center'>
                <button
                  className='px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600'
                  onClick={() => dispatch(removeFromCart(item))}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* Totals */}
          <div className='mt-6 p-4 bg-gray-100 rounded-lg flex justify-between items-center'>
            <p className='font-semibold'>Total Items: {totalQuantity}</p>
            <p className='font-semibold'>Total Amount: ₹{totalAmount}</p>
          </div>

          {/* Clear Cart */}
          <div className='flex justify-between mt-6'>
            <button
              className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'
              onClick={() => dispatch(clearCart())}
            >
              Clear Cart
            </button>

            {/* Checkout or Login */}
            {auth.currentUser ? (
              <Link to='/Checkout'>
                <button className='bg-green-500 p-2 px-6 rounded-lg text-white font-semibold hover:bg-green-700'>
                  Proceed to Checkout
                </button>
              </Link>
            ) : (
              <button
                className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800'
                onClick={() => navigate('/Login')}
              >
                Login
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Cartdisp;
