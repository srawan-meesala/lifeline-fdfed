import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import '../styles/Cart.css'
import CartItem from '../components/CartItem'

const Cart = () => {

    const data = [
        {
            title: 'Paracetemol',
            quantity: 2,
            priceEach: 100
        }
    ]

    var itemsNumber = 0
    var itemsPrice = 0

    for (const key in data) {
        itemsNumber += data[key].quantity
        itemsPrice += data[key].priceEach * data[key].quantity
    }

    const [totalItems, setTotalItems] = useState(itemsNumber)
    const [totalPrice, setTotalPrice] = useState(itemsPrice)

    useEffect(()=>{

    },[])

    return (
        <>
            <div className="Cart-whole">
                <Navbar title={'Cart'}/>
                <div className="Cart-content">
                    <div className="Cart-head">Your Cart has <span>{totalItems} items</span> </div>
                    <div className="Cart-price">Total value is <span>Rs. {totalPrice}</span></div>
                    <div className="Cart-items">
                        {totalItems===0 && (
                            <div className='Cart-items-noitems'>Your Cart is Empty.</div>
                        )}
                        {totalItems!==0 && data.map((item, index)=>(
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
                        {totalItems!==0 && (
                            <button className='Cart-checkout-btn'>Check Out</button>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart