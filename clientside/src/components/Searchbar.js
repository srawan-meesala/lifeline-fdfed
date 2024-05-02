import React, { useState } from 'react';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';
import '../styles/Searchbar.css';

const Searchbar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (searchQuery.trim() === '') {
      console.error('Search query cannot be empty');
      return; // Don't proceed with empty search query
    }

    try {
      const response = await axios.post(`https://lifeline-fdfed-api.onrender.com/searchDoctors/${searchQuery}`);
      onSearch(response.data);
    } catch (error) {
      console.error('Error searching doctors:', error);
      // Display user-friendly error message in the UI if needed
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
