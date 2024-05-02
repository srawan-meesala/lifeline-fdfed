import React, { useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie';

function BlogForm() {
  const docID = Cookies.get('username');
  const [title, setTitle] = useState('')
  const [blog, setBlog] = useState('')
  const [file, setFile] = useState(null)

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  async function uploadBlog(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('docID', docID);
    formData.append('title', title);
    formData.append('blog', blog);
    formData.append('image', file);
    try {
      const response = await axios.post('https://lifeline-fdfed-api.onrender.com/uploadBlog', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
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
      <div className='Blogform-upper'>
        <div className='Blogform-headline'>Write your Blogs</div>
      </div>
      <div className='Blogform-mid'>
        <div className='Blogform-mid-int'>
          <div className='Blogform-form-div'>
            <form className='Blogform-form' method='POST' action='/uploadBlog' encType='multipart/form-data' onSubmit={uploadBlog} >
              <label className='Blogform-label'>Title</label>
              <input type='text' className='Blogform-input-Title' placeholder='Your Blog Title' onChange={(e) => { setTitle(e.target.value) }} required />
              <label className='Blogform-label'>Blog</label>
              <textarea type='text' placeholder='Your Blog' className='Blogform-textarea' onChange={(e) => { setBlog(e.target.value) }} required>
              </textarea>
              <label className='Blogform-label' >Upload an Image</label>
              <input type='file' name='image' onChange={handleFileChange} required />
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