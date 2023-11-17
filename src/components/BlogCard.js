import React from 'react'

const BlogCard = ({blogData}) => {
  return (
    <div className='Blogs-card'>
        <div className='Blogs-card-content'>
            <div className='Blogs-card-title'>{blogData.title}</div>
            <div className='Blogs-card-author'>
                <div className='Blogs-card-author-name'>By {blogData.author}</div>
                <div className='Blogs-card-author-prof'>{blogData.prof}</div>
            </div>
        </div>
    </div>
  )
}

export default BlogCard