import React from 'react'
import { syrupData } from '../../functions/syrups'
import Fever from '../../images/Syrups/Fever.jpg'
import Kids from '../../images/Syrups/Kids.jpg'
import Iodine from '../../images/Syrups/Iodine.jpg'
import NandH from '../../images/Syrups/NandH.jpg'
import Freemotions from '../../images/Syrups/Freemotions.jpg'

const Syrups = ({addToCart}) => {
  const firstFiveImages = syrupData.slice(0, 5);

  console.log(syrupData);

  return (
    <div className='container'>
      {firstFiveImages.map((item, index) => {
        return (
          <div className='card' key={index}>
            <div className='imgBx'>
              {item.name === 'Fever' && (
                <img src={Fever} alt="" />
              )}
              {item.name === 'Kids' && (
                <img src={Kids} alt="" />
              )}
              {item.name === 'Iodine' && (
                <img src={Iodine} alt="" />
              )}
              {item.name === 'Nutrition & Healthy' && (
                <img src={NandH} alt="" />
              )}
              {item.name === 'Free Motions' && (
                <img src={Freemotions} alt="" />
              )}
            </div>
            <div className="contentBx">
              <h2>{item.name}</h2>
              <div className="name">
                <h3>Rs. {item.price}</h3>
              </div>

              <button className='btn'onClick={() => addToCart(item)} >Add to Cart</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Syrups;
