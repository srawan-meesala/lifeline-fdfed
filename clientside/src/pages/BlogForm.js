import React, { useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'

function BlogForm() {
    const {docID} = useParams()
    const [title,setTitle] = useState('')
    const [blog,setBlog] = useState('')
    async function uploadBlog(e) {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:8000/uploadBlog', {
            docID,title,blog
          });
    
          if (response.data.status === 'uploaded') {
            alert('Blog uploaded successfully');
          } else {
            alert('Error while uploading blog')
          }
        } catch (error) {
          alert('Wrong details');
          console.error(error);
        }
    }

  return (
    <div className='Blogform-whole'>
        <Navbar/>
        <div className='Blogform-upper'>
            <div className='Blogform-headline'>Write your Blogs</div>
        </div>
        <div className='Blogform-mid'>
            <div className='Blogform-mid-int'>
                <div className='Blogform-form-div'>
                    <form className='Blogform-form'method='POST' action='/uploadBlog' onSubmit={uploadBlog} >
                        <label className='Blogform-label'>Title</label>
                        <input type='text' className='Blogform-input' placeholder='Your Blog Title' onChange={(e)=>{setTitle(e.target.value)}} />
                        <label className='Blogform-label'>Blog</label>
                        <textarea type='text' placeholder='Your Blog' className='Blogform-textarea' onChange={(e)=>{setBlog(e.target.value)}} >
                        </textarea>
                        <div className='Blogform-remaining'>
                            <button className='Blogform-remaining-button'>Upload</button>
                        </div>
                    </form>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default BlogForm