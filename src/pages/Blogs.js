import React from 'react'
import Navbar from '../components/Navbar';
import BlogCard from '../components/BlogCard';

function Blogs() {

  
  var data = [
    {
      id: 1,
      title: 'Lung Cancer Screening Demystified',
      author: 'Dr.Ramesh',
      prof: 'Psycholigist'
    },
    {
      id: 2,
      title: 'Alcohol Intolerance: What You Need to Know',
      author: 'Dr.Murali',
      prof: 'Psychologist'
    },
    {
      id: 3,
      title: 'What to Know About the New Covid Variants',
      author: 'Dr.Sakshi',
      prof: 'Heptologist'
    },
    {
      id: 4,
      title: 'What to Know About the New Covid Variants',
      author: 'Dr.Sakshi',
      prof: 'Cardiologist'
    },
  ]

  return (
    <div className='Blogs-whole'>
      <Navbar title={'Blogs'}/>
        <div className='Blogs-Randomiser'>
          <div className='Blogs-Randomiser-div'>
            <div className='Blogs-Randomiser-question'>cant choose what to read? try our randomiser</div>
            <div className='Randomiser-div'><button className='Randomiser-Button'><span>Random</span></button></div>
            </div>
        </div>
        <div className='Blogs-content'>
          <div className='Blogs-content-div'>
            <div className='Blogs-slots-1'>
              {data.map(d => {
                return <BlogCard blogData={d} />
              })}
            </div>
          </div>
        </div>
    </div>
  )
}

export default Blogs