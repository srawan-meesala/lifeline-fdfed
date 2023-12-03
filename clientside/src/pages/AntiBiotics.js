import React from 'react'

import { antibioticData } from '../functions/antibiotics'

const AntiBiotics = () => {

    const firstFiveImages = antibioticData.slice(0,5)

    console.log(antibioticData)
    return (
      <div className='container'>
      {firstFiveImages.map((item, index) => {
        return (
          <div className='card' key={index}>
            <div className='imgBx'>
              <img src={item.image} alt="" />
            </div>
            <div className="contentBx">
              <h2>{item.name}</h2>
              <div className="name">
                <h3>${item.price}</h3>
              </div>
              <a href="/" className='btn'>Add to Cart</a>
            </div>
          </div>
        );
      })}
    </div>
      );
} 

export default AntiBiotics;