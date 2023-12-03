import React from 'react';
import { equipmentData } from '../functions/equipment';

const Equipment = () => {
    const firstFiveImages = equipmentData.slice(0,5);

    console.log(equipmentData);

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
                  <a href="#" className='btn'>Add to Cart</a>
                </div>
              </div>
            );
          })}
        </div>
    );
};

export default Equipment;
