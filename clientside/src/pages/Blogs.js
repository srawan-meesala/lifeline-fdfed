import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import BlogCard from '../components/BlogCard';
import { FaRandom } from "react-icons/fa";
import axios from 'axios';

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:8000/blogAPI');
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className='Blogs-whole'>
      <Navbar title={'Blogs'}/>
      <div className='Blogs-Randomiser'>
        <div className='Blogs-Randomiser-div'>
          <div className='Blogs-Randomiser-question'>cant choose what to read? try our randomiser</div>
          <div className='Randomiser-div'><button className='Randomiser-Button'><FaRandom/><span>Random</span></button></div>
        </div>
      </div>
      <div className='Blogs-content'>
        <div className='Blogs-content-div'>
          <div className='Blogs-slots-1'>
            {blogs.map((blog) => (
               <BlogCard key={blog.blogID} {...blog} />
            ))}
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default Blogs