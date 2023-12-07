import React from 'react';
import { equipmentData } from '../functions/equipment';
import Thermometer from '../images/Equipments/Thermometer.jpg'
import BPChecker from '../images/Equipments/BPChecker.jpg'
import PPE from '../images/Equipments/PPE.jpg'
import Sthethoscope from '../images/Equipments/Sthethoscope.jpg'
import SurgicalKit from '../images/Equipments/SurgicalKit.jpg'

const Equipment = () => {
    const firstFiveImages = equipmentData.slice(0,5);

    console.log(equipmentData);

    return (
        <div className='container'>
          {firstFiveImages.map((item, index) => {
            return (
              <div className='card' key={index}>
                <div className='imgBx'>
                  {item.name === 'Thermometer' && (
                    <img src={Thermometer} alt="" />
                  )}
                  {item.name === 'BP Checker' && (
                    <img src={BPChecker} alt="" />
                  )}
                  {item.name === 'PPE Kit' && (
                    <img src={PPE} alt="" />
                  )}
                  {item.name === 'Surgical Kit' && (
                    <img src={SurgicalKit} alt="" />
                  )}
                  {item.name === 'Sthethoscope' && (
                    <img src={Sthethoscope} alt="" />
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

export default Equipment;
