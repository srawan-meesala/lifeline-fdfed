import React from 'react'
import Tablets from './Tablets';
import AntiBiotics from './AntiBiotics';
import Ointments from './Ointments';
import Syrups from './Syrups';
import Equipment from './Equipment';

const Medicines = ({addToCart}) => {
    return (

        <div>
            <div className='Medicines'>Tablets</div>
            <Tablets addToCart={addToCart} />
            <div className='Medicines'>AntiBiotics</div>
            <AntiBiotics addToCart={addToCart}/>
            <div className='Medicines'>Ointments</div>
            <Ointments addToCart={addToCart}/>
            <div className='Medicines'>Syrups</div>
            <Syrups addToCart={addToCart}/>
            <div className='Medicines'>Equipment</div>
            <Equipment addToCart={addToCart}/>
        </div>
        

    )
}

export default Medicines;