// import React, { useEffect, useState } from 'react'
// import Navbar from '../components/Navbar'
// import '../styles/Cart.css'
// import CartItem from '../components/CartItem'

// const Cart = () => {

//     const data = [
//         {
//             title: 'Paracetemol',
//             quantity: 2,
//             priceEach: 100
//         }
//     ]

//     var itemsNumber = 0
//     var itemsPrice = 0

//     for (const key in data) {
//         itemsNumber += data[key].quantity
//         itemsPrice += data[key].priceEach * data[key].quantity
//     }

//     const [totalItems, setTotalItems] = useState(itemsNumber)
//     const [totalPrice, setTotalPrice] = useState(itemsPrice)

//     useEffect(()=>{

//     },[])

//     return (
//         <>
//             <div className="Cart-whole">
//                 <Navbar title={'Cart'}/>
//                 <div className="Cart-content">
//                     <div className="Cart-head">Your Cart has <span>{totalItems} items</span> </div>
//                     <div className="Cart-price">Total value is <span>Rs. {totalPrice}</span></div>
//                     <div className="Cart-items">
//                         {totalItems===0 && (
//                             <div className='Cart-items-noitems'>Your Cart is Empty.</div>
//                         )}
//                         {totalItems!==0 && data.map((item, index)=>(
//                             <CartItem
//                                 key={index}
//                                 title={item.title}
//                                 quantity={item.quantity}
//                                 priceEach={item.priceEach}
//                                 totalItems={totalItems}
//                                 setTotalItems={setTotalItems}
//                                 totalPrice={totalPrice}
//                                 setTotalPrice={setTotalPrice}
//                              />
//                         ))}
//                     </div>
//                     <div className="Cart-checkout">
//                         {totalItems!==0 && (
//                             <button className='Cart-checkout-btn'>Check Out</button>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default Cart

import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom'
import Navbar from '../components/Navbar';
import '../styles/Cart.css';
import CartItem from '../components/CartItem';
import axios from 'axios';

const Cart = () => {
    const {username} = useParams()
  const [cartItems, setCartItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Replace 'http://localhost:8000' with your actual server URL
    axios.get('http://localhost:8000/cartData', {
      params: {
        username: username, // Replace with the logged-in user's username
      },
    })
      .then((response) => {
        setCartItems(response.data);
        updateTotals(response.data);
      })
      .catch((error) => {
        console.error('Error fetching cart data:', error);
      });
  }, []);

  const updateTotals = (items) => {
    let itemsNumber = 0;
    let itemsPrice = 0;

    items.forEach((item) => {
      itemsNumber += item.quantity;
      itemsPrice += item.priceEach * item.quantity;
    });

    setTotalItems(itemsNumber);
    setTotalPrice(itemsPrice);
  };

  return (
    <>
      <div className="Cart-whole">
        <Navbar title={'Cart'} />
        <div className="Cart-content">
          <div className="Cart-head">Your Cart has <span>{totalItems} items</span> </div>
          <div className="Cart-price">Total value is <span>Rs. {totalPrice}</span></div>
          <div className="Cart-items">
            {totalItems === 0 && (
              <div className='Cart-items-noitems'>Your Cart is Empty.</div>
            )}
            {totalItems !== 0 && cartItems.map((item, index) => (
              <CartItem
                key={index}
                title={item.title}
                quantity={item.quantity}
                priceEach={item.priceEach}
                totalItems={totalItems}
                setTotalItems={setTotalItems}
                totalPrice={totalPrice}
                setTotalPrice={setTotalPrice}
              />
            ))}
          </div>
          <div className="Cart-checkout">
            {totalItems !== 0 && (
              <button className='Cart-checkout-btn'>Check Out</button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
