import React from 'react'
import { BiRupee } from "react-icons/bi";

const DoctorDashboard = ({ userDetails }) => {
  return (
    <div className='DoctorProfile-right'>
        <div className='DoctorProfile-top'>
          <div className='DoctorProfile-dashboard'>
            <div>Welcome, <span>{userDetails.name}</span></div>
          </div>
          <div className='DoctorProfile-user-logo'>
            <div className='DoctorProfile-user-logo-pic'></div>
            <div></div>
          </div>
        </div>
        <div className='DoctorProfile-cards'>
          <div className='DoctorProfile-card-1'>
            <div className='DoctorProfile-card-1-int-div'>
              <div className='DoctorProfile-card-1-int-div-head'>Total number of Appointments:</div>
              <div className='DoctorProfile-card-1-int-div-body'>10</div>
            </div>
          </div>
          <div className='DoctorProfile-card-2'>
            <div className='DoctorProfile-card-2-int-div'>
              <div className='DoctorProfile-card-1-int-div-head-black'>Total number of Transactions:</div>
              <div className='DoctorProfile-card-1-int-div-body'>15</div>
            </div>
          </div>
          <div className='DoctorProfile-card-3'>
            <div className='DoctorProfile-card-3-int-div'>
              <div className='DoctorProfile-card-1-int-div-head'>Total number of patients booked:</div>
              <div className='DoctorProfile-card-1-int-div-body'>10</div>
            </div>
          </div>
          <div className='DoctorProfile-card-4'>
            <div className='DoctorProfile-card-4-int-div'>
              <div className='DoctorProfile-card-1-int-div-head'>Total number of medicines ordered:</div>
              <div className='DoctorProfile-card-1-int-div-body'>10</div>
            </div>
          </div>
        </div>
        <div className='DoctorProfile-bottom-right'>
          <div className='DoctorProfile-booked-appointments'>
            <div className='DoctorProfile-booked-appointments-int-div'>
              <div className='DoctorProfile-booked-appointments-int-div-head'><span className='DoctorProfile-booked-appointments-int-div-head-top'>Booked Appointments:</span><span className='DoctorProfile-booked-appointments-int-div-head-bottom'>Your recent 3 appointments</span></div>
              <div className='DoctorProfile-booked-appointments-int-div-body'>
                <div className='DoctorProfile-booked-appointments-int-div-body-part'>
                  <div className='DoctorProfile-booked-appointments-int-div-body-date'>26/11/23</div>
                  <div className='DoctorProfile-booked-appointments-int-div-body-time'>5:00 PM</div>
                  <div className='DoctorProfile-booked-appointments-int-div-body-Doctor'>mukesh</div>
                </div>
                <div className='DoctorProfile-booked-appointments-int-div-body-part'>
                  <div className='DoctorProfile-booked-appointments-int-div-body-date'>2/10/23</div>
                  <div className='DoctorProfile-booked-appointments-int-div-body-time'>1:00 PM</div>
                  <div className='DoctorProfile-booked-appointments-int-div-body-Doctor'>Lavanya</div>
                </div>
                <div className='DoctorProfile-booked-appointments-int-div-body-part'>
                  <div className='DoctorProfile-booked-appointments-int-div-body-date'>13/9/23</div>
                  <div className='DoctorProfile-booked-appointments-int-div-body-time'>10:00 AM</div>
                  <div className='DoctorProfile-booked-appointments-int-div-body-Doctor'>Kaleja</div>
                </div>
              </div>
            </div>
          </div>
              <div className='DoctorProfile-remaining'>
                  <div className='DoctorProfile-part-1'>
                    <div className='DoctorProfile-part-1-int-div'>
                      <div className="DoctorProfile-part-1-int-div-head">Total Income:</div>
                      <div className="DoctorProfile-part-1-int-div-body"><div className='DoctorProfile-part-1-int-div-body-icon'><BiRupee/></div><span>100000</span></div>
                    </div>
                  </div> 
                  <div className='DoctorProfile-part-2'>
                    <div className='DoctorProfile-part-2-int-div'>
                    </div>
                  </div>
              </div>
          </div>
      </div>
  )
}

export default DoctorDashboard