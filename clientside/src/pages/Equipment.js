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
          <div className='card'>
              <div className='imgBx'>
                  <img src={Thermometer} alt="" />
              </div>
              <div className="contentBx">
                  <h2>Thermometer</h2>
                  <div className="name">
                  <h3>Rs. 100</h3>
                  </div>
                  <a href="#" className='btn'>Add to Cart</a>
              </div>
          </div>

          <div className='card'>
              <div className='imgBx'>
                  <img src={Sthethoscope} alt="" />
              </div>
              <div className="contentBx">
                  <h2>Sthethoscope</h2>
                  <div className="name">
                  <h3>Rs. 1000</h3>
                  </div>
                  <a href="#" className='btn'>Add to Cart</a>
              </div>
          </div>

          <div className='card'>
              <div className='imgBx'>
                  <img src={PPE} alt="" />
              </div>
              <div className="contentBx">
                  <h2>PPE Kit</h2>
                  <div className="name">
                  <h3>Rs. 500</h3>
                  </div>
                  <a href="#" className='btn'>Add to Cart</a>
              </div>
          </div>

          <div className='card'>
              <div className='imgBx'>
                  <img src={BPChecker} alt="" />
              </div>
              <div className="contentBx">
                  <h2>BP Checker</h2>
                  <div className="name">
                  <h3>Rs. 1500</h3>
                  </div>
                  <a href="#" className='btn'>Add to Cart</a>
              </div>
          </div>

          <div className='card'>
              <div className='imgBx'>
                  <img src={SurgicalKit} alt="" />
              </div>
              <div className="contentBx">
                  <h2>Surgical Kit</h2>
                  <div className="name">
                  <h3>Rs. 2500</h3>
                  </div>
                  <a href="#" className='btn'>Add to Cart</a>
              </div>
          </div>
        </div>
    );
};

export default Equipment;
