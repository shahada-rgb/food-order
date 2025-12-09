import React from 'react'
import { useState } from 'react';
import { db, auth } from './firebase';
import { collection, addDoc } from 'firebase/firestore';

function Address() {
  const [name,setName]=useState('');
  const [phone,setPhone]=useState('');
  const [pincode,setPincode]=useState('');
  const [locality,setLocality]=useState('');
  const [addressDetail,setAddressDetail]=useState('');

  const handleSubmit=async(e)=>{
    e.preventDefault();
    // handle form submission logic here
    const newAddress={ name,phone,pincode,locality,addressDetail , id:Date.now().toString()};

    if (!auth.currentUser) return;

    await addDoc(collection(db,'usesrs',auth.currentUser.id,'addresses'),newAddress);
   

  }

    // Clear form fields after submission
    setName('');
    setPhone('');
    setPincode('');
    setLocality('');
    setAddressDetail('');


  }
  return (
    <div>
      <form onSubmit={handleSubmit()}
      className='max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-md'>
        <h2>ADD A NEW ADDRESS</h2>

        {/* name label  */}
        <input
        type='text'
        placeholder='Name'
        value={name}
          className='w-full p-2 border rounded-md mb-4'
          onChange={(e)=> setName(e.target.value)}
        ></input>

        <input
        type='number'
        placeholder='Phone Number'
        value={phone}
          className='w-full p-2 border rounded-md mb-4'
          onChange={(e)=> setPhone(e.target.value)}
        ></input>

<input
  type='number'
  placeholder='Pincode'
  value={pincode}
          className='w-full p-2 border rounded-md mb-4'
          onChange={(e)=> setPincode(e.target.value)}
></input>
<input
  type='text'
  placeholder='Locality'
  value={locality}
          className='w-full p-2 border rounded-md mb-4'
          onChange={(e)=> setLocality(e.target.value)}
></input>

<textarea
  placeholder='Address'
  value={addressDetail}
          className='w-full p-2 border rounded-md mb-4'
          onChange={(e)=> setAddressDetail(e.target.value)}
></textarea>



        
         
      </form>

      <div className='max-w-lg mx-auto'>
        <button type='submit' className='w-full bg-orange-400 text-white p-2 rounded-md hover:bg-orange-500 font-semibold'>
          Save Address
        </button>
      </div>
    </div>
  )
}

export default Address
