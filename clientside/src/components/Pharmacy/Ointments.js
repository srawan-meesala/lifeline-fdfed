import React from 'react';
import { ointmentData } from '../../functions/ointments';
import eye from '../../images/Ointments/eye.jpg'
import injuries from '../../images/Ointments/injuries.jpg'
import rashes from '../../images/Ointments/rashes.jpg'
import bodypains from '../../images/Ointments/bodypains.jpg'
import infections from '../../images/Ointments/infections.jpg'

const Ointments = () => {
  const firstFiveImages = ointmentData.slice(0, 5);

  console.log(ointmentData);

  return (
    <div className='container'>
      {firstFiveImages.map((item, index) => {
        return (
          <div className='card' key={index}>
            <div className='imgBx'>
              {item.name === 'Eye' && (
                <img src={eye} alt="" />
              )}
              {item.name === 'Injuries' && (
                <img src={injuries} alt="" />
              )}
              {item.name === 'Infections' && (
                <img src={infections} alt="" />
              )}
              {item.name === 'Rashes' && (
                <img src={rashes} alt="" />
              )}
              {item.name === 'Bodypains' && (
                <img src={bodypains} alt="" />
              )}
            </div>
            <div className="contentBx">
              <h2>{item.name}</h2>
              <div className="name">
                <h3>Rs. {item.price}</h3>
              </div>

              <button className='btn'>Add to Cart</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Ointments;
