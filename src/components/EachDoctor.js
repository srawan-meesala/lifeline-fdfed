import React from 'react'
import { MdCall } from "react-icons/md";
import Diamond from '../images/6.png';


function EachDoctor() {
  return (
    <div class="panel-1">
                <div className="ShowDoctors-docimage">
                <img src={Diamond} />
                </div>
                <div class="body-panel">
                    <div class="head-body">
                        <p class="name-dr">Dr. Ram Prasad</p>
                        <p class="name-hosp">Ramprasad Clinic</p>
                    </div>
                    <div class="bio-body">
                        <p class="spec">Specialised in <span>Cardiology</span></p>
                        <p class="exp">Experience of <span>9</span> years</p>
                        <p class="city">Practicing in <span>Chennai</span></p>
                        <p class="ll-exp">In lifeline since <span>2023</span></p>
                    </div>
                    <div class="contact-body">
                        <button class="number-panel">
                        <MdCall className='number-panel-icon-phone'/><p>8045978755</p>
                        </button>
                        <button class="appoint-panel">
                            Book Appointment
                        </button>
                    </div>
                </div>
            </div>
  )
}

export default EachDoctor