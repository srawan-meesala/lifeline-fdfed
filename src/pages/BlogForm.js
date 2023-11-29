import React from 'react'
import Navbar from '../components/Navbar'

function BlogForm() {
  return (
    <div className='Blogform-whole'>
        <Navbar/>
            <div className='Blogform-upper'>
                <div className='Blogform-headline'>Write your Blogs</div>
            </div>
            <div className='Blogform-mid'>
                <div className='Blogform-mid-int'>
                    <div className='Blogform-form-div'>
                        <form>
                            <label>Title</label>
                            <input type='text' placeholder='Your Blog Title'/>
                            <label>Blog</label>
                            <textarea type='text' placeholder='Your Blog'>
                            </textarea>
                        </form>
                    </div>
                    <div className='Blogform-remaining'>
                    <button className='Blogform-remaining-button'>Upload</button>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default BlogForm