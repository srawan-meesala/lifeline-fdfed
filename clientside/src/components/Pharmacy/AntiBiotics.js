import React from 'react'
import { antibioticData } from '../../functions/antibiotics'
import AntibioticSoap from '../images/AntiBiotics/AntibioticSoap.jpg'
import BodyLotion from '../images/AntiBiotics/BodyLotion.jpg'
import HairConditioner from '../images/AntiBiotics/HairConditioner.jpg'
import Sanitizer from '../images/AntiBiotics/Sanitizer.jpg'
import Moisturizer from '../images/AntiBiotics/Moisturizer.jpg'

const AntiBiotics = () => {

  const firstFiveImages = antibioticData.slice(0, 5)

  console.log(antibioticData)
  return (
    <div className='container'>
      {firstFiveImages.map((item, index) => {
        return (
          <div className='card' key={index}>
            <div className='imgBx'>
              {item.name === 'Moisturizer' && (
                <img src={Moisturizer} alt="" />
              )}
              {item.name === 'Sanitizer' && (
                <img src={Sanitizer} alt="" />
              )}
              {item.name === 'HairConditioner' && (
                <img src={HairConditioner} alt="" />
              )}
              {item.name === 'BodyLotion' && (
                <img src={BodyLotion} alt="" />
              )}
              {item.name === 'Soap' && (
                <img src={AntibioticSoap} alt="" />
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
}

export default AntiBiotics;