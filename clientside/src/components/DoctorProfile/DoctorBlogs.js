import React from 'react'
import { Link } from 'react-router-dom'

const DoctorBlogs = ({ userDetails, blogs }) => {

  const ConvertDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };

  return (
    <div className='UserProfile-right'>
      <div className='UserProfile-top'>
        <div className='HospitalProfile-dashboard'>
          <div>
            Welcome, <span>{userDetails.name}</span>
          </div>
        </div>
      </div>
      <div className='UserProfile-appointments'>
        <div className='UserProfile-appointments-title'>Your Blogs</div>
        <div className='UserProfile-appointments-cards'>
            {blogs.length === 0 ? (
                <p>No blogs uploaded.</p>
            ) : (
                blogs.map((blog) => (
                <div key={blog.id} className='UserProfile-appointments-card'>
                    <div className='UserProfile-appointments-card-name'>
                    Blog Title: <span>{blog.title}</span>
                    </div>
                    <div className='UserProfile-appointments-card-name'>
                    Published Date: <span>{ConvertDate(blog.createdAt)}</span>
                    </div>
                </div>
                ))
            )}
        </div>
      </div>
      <div className='DoctorProfile-blog-add'>
        <div className='DoctorProfile-blog-add-link'>
          <Link className='DoctorProfile-blog-add-link-link' to={`/blogform`}>
            Upload a New Blog
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DoctorBlogs;
