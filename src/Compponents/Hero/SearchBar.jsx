import React from 'react'
import { useState } from 'react'
import restaurants from '../../data/foodData';

function SearchBar() {

  const [inputValue ,setinputValue]= useState("");
  const [suggestion, setsuggestion]= useState([])

  const handleInputChange = (e)=>{
    const value= e.target.value;
    setinputValue(value);
    if(value.length > 0){
      const filtered= restaurants.filter((items)=>
        items.name.toLowerCase().includes(value.toLowerCase())
    )
    
      setsuggestion(filtered);
       }else{
        setsuggestion([])
       }
      }
       //handle click suggestion
       const handleSuggestionClick=(s)=>{
        setinputValue(s);
        setsuggestion([])
       }
  
  return (
    <div className='bg-white rounded-2xl    ml-1 px-2 py-2 max-w-xl mx-auto '>
      <input type="text"
      placeholder='Search food...'
      value={inputValue}
      onChange={handleInputChange}
      className='w-130 px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-white border-gray-300' />
        
        {/* show suggestion  */}

        {suggestion.length>0 && (
          <ul className='absolute bg-white border-gray-200 rounded-lg shadow-lg mt-3 max-h-60 overflow-y-auto left-2  right-0 px-4 py-1 w-130'>
            {suggestion.map((item,id)=>
              <li key = {id} 
              onClick={handleSuggestionClick}
              className='px-4 py-2 cursor-pointer hover:bg-white font-semibold '>

                {item.name}
             
              </li>
          )}
            
          </ul>
        )}
      
    </div>
  )
}

export default SearchBar
