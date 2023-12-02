import React from 'react'
import '../styles/Searchbar.css'
import { FaSearch } from "react-icons/fa";

const Searchbar = () => {
  return (
    <div className='Searchbar-whole'>
        <form action="/" method="post" className='Searchbar-form'>
            <input type="text" placeholder='Search for Doctors' className='Searchbar-input'/>
            <button type="submit" className='Searchbar-button'><FaSearch /></button>
        </form>
    </div>
  )
}

export default Searchbar