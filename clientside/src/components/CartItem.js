import React, { useEffect, useState } from 'react'
import { MdDelete } from "react-icons/md";

const CartItem = ({title, quantity, priceEach, totalItems, setTotalItems, totalPrice, setTotalPrice}) => {
    const [k, setK] = useState(quantity)
    const [totalItemPrice, setTotalItemPrice] = useState(k * priceEach)

    const addOneHandler = () => {
        setK(k+1)
        setTotalItems(totalItems+1)
        setTotalPrice(totalPrice + priceEach)
    }
    const minOneHandler = () => {
        setK(k-1)
        setTotalItems(totalItems-1)
        setTotalPrice(totalPrice - priceEach)
    }

    useEffect(() => {
        let p = k * priceEach
        setTotalItemPrice(p)
    },[k]) 

    if (k>=1){
        return (
            <>
                <div className="Cart-item">
                    <div className="Cart-item-name">{title}</div>
                    <div className="Cart-item-notname">
                        <div className="Cart-item-quantity">
                            Quantity
                            
                            {k!==1 && (
                                <button onClick={minOneHandler} className="Cart-item-quantity-btn Cart-item-minus">-</button>
                            )}
                            {k===1 && (
                                <button onClick={minOneHandler} className="Cart-item-quantity-btn Cart-item-minus"><MdDelete /></button>
                            )}
                            <div className="Cart-item-quantity-number">{k}</div>
                            <button onClick={addOneHandler} className="Cart-item-quantity-btn Cart-item-plus">+</button>
                        </div>
                        <div className="Cart-pricebar">
                            <div className="Cart-item-price">Price of Each - Rs. {priceEach}<span></span></div>
                            <div className="Cart-item-price">Total Price - <span>Rs. {totalItemPrice}</span></div>
                        </div>
                    </div>
                </div>
            </>
        )
    } else {
        return <></>
    }
    
}

export default CartItem