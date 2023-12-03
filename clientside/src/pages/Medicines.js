import React from 'react'
import Tablets from './Tablets';
import AntiBiotics from './AntiBiotics';
import Ointments from './Ointments';
import Syrups from './Syrups';
import Equipment from './Equipment';

const Medicines = () => {
    return (
        
        <div>
            <div className='Medicines'>Tablets</div>
            <Tablets />
            <div className='Medicines'>AntiBiotics</div>
            <AntiBiotics />
            <div className='Medicines'>Ointments</div>
            <Ointments />
            <div className='Medicines'>Syrups</div>
            <Syrups />
            <div className='Medicines'>Equipment</div>
            <Equipment />
        </div>
        
    )
} 

export default Medicines;