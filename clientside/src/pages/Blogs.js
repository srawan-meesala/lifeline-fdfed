import React from 'react';
import Navbar from '../components/Navbar';
import BlogCard from '../components/BlogCard';
import { FaRandom } from "react-icons/fa";

function Blogs() {

  var data = [
    {
      blogID: 1,
      title: 'Lung Cancer Screening Demystified',
      docName: 'Charan Kumar',
      specialization: 'Heptologist'
    },
    {
      blogID: 2,
      title: 'Alcohol Intolerance: What You Need to Know',
      docName: 'Murali',
      specialization: 'Psychologist'
    },
    {
      blogID: 3,
      title: 'What to Know About the New Covid Variants',
      docName: 'Sakshi',
      specialization: 'Heptologist'
    },
    {
      blogID: 4,
      title: 'What to Know About the New Covid Variants',
      docName: 'Sakshi',
      specialization: 'Cardiologist'
    },
  ]

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
                {data.map((d) => {
                  return <BlogCard blogIndex={d.blogID} blogData={d} />
                })}
              </div>
            
          </div>
        </div>
    </div>
  )
}

export default Blogs