import React from 'react'
import { BiRupee } from "react-icons/bi";

const HospitalDashboard = ({userDetails}) => {
  return (
    <div className='HospitalProfile-right'>
        <div className='HospitalProfile-top'>
          <div className='HospitalProfile-dashboard'>
            <div>Welcome, <span>{userDetails.hospName}</span></div>
          </div>
          <div className='HospitalProfile-user-logo'>
            <div className='HospitalProfile-user-logo-pic'></div>
            <div></div>
          </div>
        </div>
        <div className='HospitalProfile-cards'>
          <div className='HospitalProfile-card-1'>
            <div className='HospitalProfile-card-1-int-div'>
              <div className='HospitalProfile-card-1-int-div-head'>Total number of Appointments:</div>
              <div className='HospitalProfile-card-1-int-div-body'>10</div>
            </div>
          </div>
          <div className='HospitalProfile-card-2'>
            <div className='HospitalProfile-card-2-int-div'>
              <div className='HospitalProfile-card-1-int-div-head-black'>Total number of Transactions:</div>
              <div className='HospitalProfile-card-1-int-div-body'>15</div>
            </div>
          </div>
          <div className='HospitalProfile-card-3'>
            <div className='HospitalProfile-card-3-int-div'>
              <div className='HospitalProfile-card-1-int-div-head'>Total number of patients booked:</div>
              <div className='HospitalProfile-card-1-int-div-body'>10</div>
            </div>
          </div>
          <div className='HospitalProfile-card-4'>
            <div className='HospitalProfile-card-4-int-div'>
              <div className='HospitalProfile-card-1-int-div-head'>Total number of medicines ordered:</div>
              <div className='HospitalProfile-card-1-int-div-body'>10</div>
            </div>
          </div>
        </div>
        <div className='HospitalProfile-bottom-right'>
          <div className='HospitalProfile-booked-appointments'>
            <div className='HospitalProfile-booked-appointments-int-div'>
              <div className='HospitalProfile-booked-appointments-int-div-head'><span className='HospitalProfile-booked-appointments-int-div-head-top'>Booked Appointments:</span><span className='HospitalProfile-booked-appointments-int-div-head-bottom'>Your recent 3 appointments</span></div>
              <div className='HospitalProfile-booked-appointments-int-div-body'>
                <div className='HospitalProfile-booked-appointments-int-div-body-part'>
                  <div className='HospitalProfile-booked-appointments-int-div-body-date'>26/11/23</div>
                  <div className='HospitalProfile-booked-appointments-int-div-body-time'>5:00 PM</div>
                  <div className='HospitalProfile-booked-appointments-int-div-body-Doctor'>mukesh</div>
                </div>
                <div className='HospitalProfile-booked-appointments-int-div-body-part'>
                  <div className='HospitalProfile-booked-appointments-int-div-body-date'>2/10/23</div>
                  <div className='HospitalProfile-booked-appointments-int-div-body-time'>1:00 PM</div>
                  <div className='HospitalProfile-booked-appointments-int-div-body-Doctor'>Lavanya</div>
                </div>
                <div className='HospitalProfile-booked-appointments-int-div-body-part'>
                  <div className='HospitalProfile-booked-appointments-int-div-body-date'>13/9/23</div>
                  <div className='HospitalProfile-booked-appointments-int-div-body-time'>10:00 AM</div>
                  <div className='HospitalProfile-booked-appointments-int-div-body-Doctor'>Kaleja</div>
                </div>
              </div>
            </div>
          </div>
              <div className='HospitalProfile-remaining'>
                  <div className='HospitalProfile-part-1'>
                    <div className='HospitalProfile-part-1-int-div'>
                      <div className="HospitalProfile-part-1-int-div-head">Total Income:</div>
                      <div className="HospitalProfile-part-1-int-div-body"><div className='HospitalProfile-part-1-int-div-body-icon'><BiRupee/></div><span>100000</span></div>
                    </div>
                  </div> 
                  <div className='HospitalProfile-part-2'>
                    <div className='HospitalProfile-part-2-int-div'>
                    </div>
                  </div>
              </div>
        </div>
      </div>
  )
}

export default HospitalDashboard