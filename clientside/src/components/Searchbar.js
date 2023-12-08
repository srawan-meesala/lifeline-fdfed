import React, { useState } from 'react';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';
import '../styles/Searchbar.css'

const Searchbar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim() === '') {
      try {
        const response = await axios.post(`http://localhost:8000/searchDoctors/${searchQuery}`);
        onSearch(response.data);
      } catch (error) {
        console.error('Error searching doctors:', error);
      }
    }else{

      try {
        const response = await axios.post(`http://localhost:8000/searchDoctors/${searchQuery}`);
        onSearch(response.data);
      } catch (error) {
        console.error('Error searching doctors:', error);
      }
    }
  };

  return (
    <div className='Searchbar-whole'>
      <form onSubmit={handleSearch} className='Searchbar-form'>
        <input
          type="text"
          placeholder='Search for Doctors'
          className='Searchbar-input'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className='Searchbar-button'><FaSearch /></button>
      </form>
    </div>
  );
};

export default Searchbar;
