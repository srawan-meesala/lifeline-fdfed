import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import Navbar from '../components/Navbar'

const BlogComplete = () => {
  const {blogID} = useParams()
  const [blogData,setBlogData] = useState({})
  useEffect(()=>{
    const fetchBlogData = async()=>{
      try{
        const response = await axios.get('http://localhost:8000/blogdata',{
          params:{blogID},
        })
        if(response.status === 200){
        setBlogData(response.data)
        }
        else{
          console.error('Error fetching blogdata')
        }
      }
      catch (error) {
        alert('Wrong details');
        console.error(error);
      }
    }
  fetchBlogData()
},[blogID])

  const ConvertDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };
  return (
    <>
    <Navbar title={'Blogs'}/>
    <div className='BlogComplete-whole'>
        <div className='BlogComplete-matter'>
          <div className='BlogComplete-head'>
            <div className='BlogComplete-head-1'>
              <div className='BlogComplete-head-heading'>{blogData.title}</div>
              <div className='BlogComplete-head-image'>
                  {blogData.imagepath && (
                    <img className='Blog-image' src={`http://localhost:8000/${blogData.imagepath}`} alt='Blogimage' />
                  )}
              </div>
            </div>
            <div className='BlogComplete-head-info'>
              <div className='BlogComplete-data'><span>Published on &nbsp;</span>{ConvertDate(blogData.createdAt)} <span>by &nbsp;</span>Dr.{blogData.docName}, {blogData.specialization}</div>
            </div>
          </div>
          <div className='BlogComplete-body'>{blogData.blog}</div>
        </div>
    </div>
    </>
  )
}

export default BlogComplete