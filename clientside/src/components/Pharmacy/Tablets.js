import React from 'react';
import { tabletData } from '../../functions/tablets';
import paracetemol from '../../images/Tablets/paracetemol.jpg'
import Dolo from '../../images/Tablets/Dolo.jpg'
import citrogen from '../../images/Tablets/citrogen.jpg'
import Sleepingpills from '../../images/Tablets/Sleepingpills.jpg'
import capsules from '../../images/Tablets/capsules.jpg'

const Tablets = ({addToCart}) => {
  const firstFiveImages = tabletData.slice(0, 5);

  return (
    <div className='container'>
      {firstFiveImages.map((item, index) => {
        return (
          <div className='card' key={index}>
            <div className='imgBx'>
              {item.name === 'Paracetemol' && (
                <img src={paracetemol} alt="" />
              )}
              {item.name === 'Dolo' && (
                <img src={Dolo} alt="" />
              )}
              {item.name === 'Citrogen' && (
                <img src={citrogen} alt="" />
              )}
              {item.name === 'Sleepingpills' && (
                <img src={Sleepingpills} alt="" />
              )}
              {item.name === 'Capsules' && (
                <img src={capsules} alt="" />
              )}
            </div>
            <div className="contentBx">
              <h2>{item.name}</h2>
              <div className="name">
                <h3>Rs. {item.price}</h3>
              </div>

              <button className='btn' onClick={() => addToCart(item)}>Add to Cart</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Tablets;
