import React from 'react'
import { useNavigate } from 'react-router-dom'

const BlogCard = ({ blodIndex, blogData }) => {

  const navigate = useNavigate()

  const BlogOpen = (blogIndex) => {
    navigate(`/blogcomplete`)
  }

  return (
    <div onClick={BlogOpen} className='Blogs-card'>
        <div className='Blogs-card-content'>
            <div className='Blogs-card-title'>{blogData.title}</div>
            <div className='Blogs-card-author'>
                <div className='Blogs-card-author-name'>By Dr. {blogData.docName}</div>
                <div className='Blogs-card-author-prof'>{blogData.specialization}</div>
            </div>
        </div>
    </div>
  )
}

export default BlogCard