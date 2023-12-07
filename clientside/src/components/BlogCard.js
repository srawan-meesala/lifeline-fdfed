import React from 'react'
import { useNavigate } from 'react-router-dom'

const BlogCard = ({blogID,title,docName,specialization}) => {

  const navigate = useNavigate()
  const BlogOpen = () => {
    navigate(`/blogcomplete/${blogID}`)
  }

  return (
    <div onClick={BlogOpen} className='Blogs-card'>
        <div className='Blogs-card-content'>
            <div className='Blogs-card-title'>{title}</div>
            <div className='Blogs-card-author'>
                <div className='Blogs-card-author-name'>By Dr. {docName}</div>
                <div className='Blogs-card-author-prof'>{specialization}</div>
            </div>
        </div>
    </div>
  )
}

export default BlogCard