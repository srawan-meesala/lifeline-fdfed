import React from 'react'
import { Link } from 'react-router-dom'

const DoctorBlogs = ({userDetails}) => {
  return (
    <div className='UserProfile-right'>
        <div className='UserProfile-top'>
          <div className='HospitalProfile-dashboard'>
            <div>Welcome, <span>{userDetails.name}</span></div>
          </div>
        </div>
        <div className='UserProfile-appointments'>
            <div className="UserProfile-appointments-title">Your Doctors</div>
            <div className="UserProfile-appointments-cards">
                <div className="UserProfile-appointments-card">
                    <div className="UserProfile-appointments-card-name">
                        Blog Title: <span>{}</span>
                    </div>
                    <div className="UserProfile-appointments-card-name">
                        Published Date: <span>Cardiologist</span>
                    </div>
                </div>
            </div>
        </div>
        <div className="DoctorProfile-blog-add">
            <div className="DoctorProfile-blog-add-link">
                <Link className='DoctorProfile-blog-add-link-link' to={`/blogform/${userDetails.docID}`}>Upload a New Blog</Link>
            </div>
        </div>
    </div>
  )
}

export default DoctorBlogs