import React from 'react'
import '../styles/Srawan.css'

const Searchbar = () => {
  return (
    <div className='Searchbar-whole'>
        <form action="/" method="post" className='Searchbar-form'>
            <input type="text" placeholder='Search for Doctors' className='Searchbar-input'/>
            <button type="submit" className='Searchbar-button'>Search</button>
        </form>
    </div>
  )
}

export default Searchbar