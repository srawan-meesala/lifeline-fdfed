import React from 'react'
import '../styles/NavBar.css';
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <>
            <div className="navsection">
        <div className="title">
            <h2 >+ PHARMACY</h2>
        </div>
        <div className="search">
            <input type="text" placeholder='search...' />
        </div>
        <div className="user">
            <div className="user-detail">
                <button>SignIn/SighUp</button>
                <button>Cart</button>
            </div>
        </div>
        
       </div>

       <div className="submenu">
       <ul>
        {/* <Link to='/tablets'>
        <li>Tablets</li>
        </Link> */}
          <li>Tablets</li>
          <li>AntiBiotics</li>
          <li>Ointments</li>
          <li>Syrups</li>
          
       </ul>
     </div>
        </>
       
      
        
    )
} 

export default NavBar;