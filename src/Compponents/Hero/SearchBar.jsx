// SearchBar.jsx
import React, { useState } from "react";

function SearchBar({ onSearch }) {
  const [text, setText] = useState("");

  const handleSearch = (e) => {
    setText(e.target.value);
    onSearch(e.target.value); // send value to parent component
  };

  return (
    <div className="w-full flex justify-center my-5">
      <input
        type="text"
        placeholder="Search foods..."
        value={text}
        onChange={handleSearch}
        className="border w-[80%] md:w-[60%] py-2 px-4 rounded-xl shadow"
      />
    </div>
  );
}

export default SearchBar;
