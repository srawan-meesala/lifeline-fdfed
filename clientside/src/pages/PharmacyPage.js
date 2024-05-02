import '../styles/Pharmacy.css'
import React, { useState } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import Medicines from '../components/Pharmacy/Medicines';
import CartItem from '../components/CartItem';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { FaCartShopping } from "react-icons/fa6";
import Cookies from 'js-cookie';

const PharmacyPage = () => {
  const username = Cookies.get('username');
  const [cartItems, setCartItems] = useState([]);

  const addToCart = async (item) => {
    try {
      const response = await axios.post('https://lifeline-fdfed-api.onrender.com/addToCart', {
        username: username, 
        item: { title: item.name, quantity: 1, priceEach: item.price },
      });

      console.log(response.data.message);
      const updatedCartResponse = await axios.get(`https://lifeline-fdfed-api.onrender.com/cartData?username=username`);
      setCartItems(updatedCartResponse.data);
      alert('Added to Cart')
    } catch (error) {
      console.error('Error adding item to the cart:', error);
    }
  };

  return (
    <div className="Pharmacy-whole">
      <Navbar title={'Pharmacy'} />
      <div className='Pharmacy-cart-div'>
        <Link className='Pharmacy-cart' to={`/cart`}><span><FaCartShopping/></span>Cart</Link>
      </div>
      <Medicines addToCart={addToCart} />
      {cartItems.map((cartItem, index) => (
        <CartItem
          key={index}
          title={cartItem.title}
          quantity={cartItem.quantity}
          priceEach={cartItem.priceEach}
        />
      ))}
      <Footer />
    </div>
  );
};

export default PharmacyPage;
