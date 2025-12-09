import React from 'react'
import { useState } from 'react';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';

function Login() {
  const [email,setEmail]=useState('');
const[password,setpassword]=useState('');
const[error,setError]=useState(null);

const navigate=useNavigate();
 



// handle login form submit  function

const handleLogin=async (e)=>{
  e.preventDefault();
  console.log('Login attempt with email:', email);

  if(!email||!password){
    setError("please fill all the fields");
    return;
  }
  try {
    console.log('Calling signInWithEmailAndPassword');
    await signInWithEmailAndPassword(auth,email,password);
    console.log('Login successful, navigating to /');
    navigate('/');

  } catch (error) {
    console.log('Login error:', error.code, error.message);
    let errorMessage='';

    switch (error.code){
      case "auth/user-not-Found":
        errorMessage="no user found with this email.";
        break;

        case "auth/wrong-password":
          errorMessage="incorrect password.";
          break;

          case "auth/invalid-email":
            errorMessage="invalid email address.";
            break;


            case "auth/too-many-requests":
            errorMessage="too many unsuccessful login attempts. please try again later.";
            break;

            case "auth/network-request-failed":
            errorMessage="network error. please check your internet connection and try again.";
            break;

            default:
              errorMessage="something went wrong. please try again.";
    }
    setError(errorMessage);
    
  }
  


}


  return (
    <>
    <div>
      <h1>Login your acount</h1>
      
      <form onSubmit={handleLogin} className=' max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded-lg shadow-md'>
        {error && <p className='text-red-500 mb-4'>{error}</p>}
        <div>
          <label className='block mb-2 font-semibold'>Email:</label>
          <input type='email' value={email} onChange={(e)=>setEmail(e.target.value)} className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400'/> 

          <label className='block mb-2 font-semibold mt-4'>Password:</label>
          <input type='password' value={password} onChange={(e)=>setpassword(e.target.value)} className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400'/> 

          <button type='submit' className='mt-6 w-full bg-orange-400 text-white py-2 px-4 rounded-md hover:bg-orange-500 font-semibold'>Login</button>   
        </div>
        </form>
        <p className='mt-4 text-center'>Don't have an account?</p>
        <button onClick={()=>navigate('/signup')} className='text-orange-400 font-semibold'>Signup</button>

    </div>
    </>
  )
}


export default Login
