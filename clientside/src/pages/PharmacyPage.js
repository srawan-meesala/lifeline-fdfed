// import React from 'react'
// import Medicines from '../components/Pharmacy/Medicines'
   import '../styles/Pharmacy.css'
// import Navbar from '../components/Navbar'
// import Footer from '../components/Footer'
// import { useParams } from 'react-router-dom'

// const PharmacyPage = () => {

//   const username = useParams()

//   return (
//     <div className='Pharmacy-whole'>
//       <Navbar title={'Pharmacy'} />
//       <Medicines />
//       <Footer />
//     </div>
//   )
// }

// export default PharmacyPage;


// Import necessary modules and components
// import React, { useState } from 'react';
// import {useNavigate} from 'react-router-dom'
// import Medicines from '../components/Pharmacy/Medicines';
// import CartItem from '../components/CartItem';
// import Footer from '../components/Footer';

// const PharmacyPage = () => {
//   const navigate = useNavigate()
//   const [cartItems, setCartItems] = useState([]);

//   const addToCart = (item) => {
//     const existingItem = cartItems.find((cartItem) => cartItem.title === item.name);

//     if (existingItem) {
//       const updatedCart = cartItems.map((cartItem) =>
//         cartItem.title === item.name
//           ? { ...cartItem, quantity: cartItem.quantity + 1 }
//           : cartItem
//       );

//       setCartItems(updatedCart);
//     } else {
//       setCartItems([...cartItems, { title: item.name, quantity: 1, priceEach: item.price }]);
//     }
//     navigate('/cart');
//   };

//   return (
//     <div className="Pharmacy-whole">
//       <Medicines addToCart={addToCart} />
//       {cartItems.map((cartItem, index) => (
//         <CartItem
//           key={index}
//           title={cartItem.title}
//           quantity={cartItem.quantity}
//           priceEach={cartItem.priceEach}
//         />
//       ))}
//       <Footer />
//     </div>
//   );
// };

// export default PharmacyPage;

// import React from 'react';
// import Medicines from '../components/Pharmacy/Medicines';
// import Footer from '../components/Footer';
// import Navbar from '../components/Navbar';
// import { useParams } from 'react-router-dom';

// const PharmacyPage = () => {
//   const username = useParams();

//   return (
//     <div className='Pharmacy-whole'>
//       <Navbar title={'Pharmacy'} />
//       <Medicines />
//       <Footer />
//     </div>
//   );
// }

// export default PharmacyPage;

import React, { useState } from 'react';
import axios from 'axios'
import { Link, useNavigate,useParams } from 'react-router-dom';
import Medicines from '../components/Pharmacy/Medicines';
import CartItem from '../components/CartItem';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const PharmacyPage = () => {
  const {username} = useParams()
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  const addToCart = async (item) => {
    try {
      const response = await axios.post('http://localhost:8000/addToCart', {
        username: username, 
        item: { title: item.name, quantity: 1, priceEach: item.price },
      });

      console.log(response.data.message);
      const updatedCartResponse = await axios.get(`http://localhost:8000/cartData?username=username`);
      setCartItems(updatedCartResponse.data);
      alert('Added to Cart')
    } catch (error) {
      console.error('Error adding item to the cart:', error);
    }
  };

  return (
    <div className="Pharmacy-whole">
      <Navbar title={'Pharmacy'} />
      <div>
        <Link to={`/cart/${username}`}>Cart</Link>
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
