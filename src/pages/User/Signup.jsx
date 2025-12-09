import React from 'react'
import {auth ,db} from '../../firebase';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {setDoc ,doc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Signup() {
  const [email,setEmail]=useState('');
  const[password,setpassword]=useState('');
  const[confirmPassword,setconfirmPassword]=useState('');
  const [fname,setName]=useState('');
  const [lname,setLname]=useState('');
  const[Error,setError]=useState(null);
  const navigate=useNavigate();

 

  //validate email function
  const validateEmail=(email)=>{
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);

  };

  const validatePassword=(password)=>{
    const reg = /^(?=.*\d)[A-Za-z\d]{6,}$/;
    return reg.test(password);
  };

  // handle signup form submit  function

  const handleSignup=async(e)=>{
    e.preventDefault();

    // validate email format

    if (!email || !password || !confirmPassword ||!lname) {
      setError("Please fill all the fields");
      return;
    }
    if (!validateEmail(email)) {
      setError("Invalid email format");
      return;
    }
    if (!validatePassword(password)) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
}

    try{
      await createUserWithEmailAndPassword(auth,email,password)
      const user = auth.currentUser;
      console.log("user registered succesfully");
      toast.success("user registered succesfully",{
        position :"top-center"
      });
      if (user) {
        await setDoc(doc(db, "Users", user.uid),{
          email: email,
          firstName: fname,
          lastName: lname,
        });}
      
      navigate('login');
    }
      
      catch (error) {
      toast.success("user registered succesfully", {
        position: "bottom-center"});
        switch (error.code) {
          case "auth/email-already-in-use":
            setError("This email is already registered.");
            break;
          case "auth/invalid-email":
            setError("Invalid email address.");
            break;
          case "auth/weak-password":
            setError("Password must be at least 6 characters.");
            break;
          default:
            setError("Signup failed. Please try again.");
        }
      }
    
    

  

  
  } 

  return (
    <>
      <div className='flex items-center justify-center min-h-screen bg-gray-50 px-4' >
        <div className='w-full max-w-md bg-white p-8 rounded-lg shadow-md'>
          <h1 className='text-2xl font-bold text-center mb-2'>Create a Account</h1>
      {Error && <p className='text-red-500'>{Error}</p>}
      <form onSubmit={handleSignup}>
      <label className='block mb-2 font-semibold'>First Name:</label>
        <input 
        className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400' 
        value={fname} 
        type='text'
        onChange={(e)=> setName(e.target.value)}  ></input>

        <label className='block mb-2 font-semibold mt-4'>Last Name:</label>
        <input type='text'
        value={lname}
        onChange={(e)=> setLname(e.target.value)}
        className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400'  ></input>



        <label className='block mb-2 font-semibold'>Email:</label>
            <input className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400' value={email} type='email'placeholder='Enter your email...'onChange={(e)=> setEmail(e.target.value)}></input>

        <label className='block mb-2 font-semibold mt-4'>Password:</label>
        <input
              className=' className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400'
         type='password'
         placeholder='Enter your password... ' 
        onChange={(e)=>setpassword(e.target.value)} 
        value={password}></input>



        <label className='block mb-2 font-semibold mt-4'>Confirm Password:</label>
          <input 
          className=' className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400'
          type='password' placeholder='Confirm your password...'
          value={confirmPassword}
           onChange={(e) => setconfirmPassword(e.target.value)}></input>


            <button type='submit' className='mt-6 w-full bg-orange-400 text-white py-2 px-4 rounded-md hover:bg-orange-500 font-semibold transition-colors' >Signup</button >

      </form>
      <p>Already have an acount?{''}</p>
          <button onClick={() => navigate('/login')} className='text-orange-400 font-semibold hover:underline'>Login</button>
      
    </div>
    </div>
    </>
  )
}

export default Signup
