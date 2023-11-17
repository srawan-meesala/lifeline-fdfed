import React from 'react'
import Navbar from '../components/Navbar';

function Blogs() {
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
              <div className='Blogs-card'>
                <div className='Blogs-card-content'>
                  <div className='Blogs-card-title'>What to Know About the New Covid Variants</div>
                  <div className='Blogs-card-author'>
                    <div className='Blogs-card-author-name'>By Dr.Sakshi </div>
                    <div className='Blogs-card-author-prof'>Cardiologist</div>
                  </div>
                </div> 
              </div>
              <div className='Blogs-card'>
                <div className='Blogs-card-content'>
                  <div className='Blogs-card-title'>Lung Cancer Screening Demystified</div>
                  <div className='Blogs-card-author'>
                    <div className='Blogs-card-author-name'>By Dr.Ramesh </div>
                    <div className='Blogs-card-author-prof'>Hepatologist</div>
                  </div>
                </div>
              </div>
              <div className='Blogs-card'>
                <div className='Blogs-card-content'>
                  <div className='Blogs-card-title'>Alcohol Intolerance: What You Need to Know</div>
                  <div className='Blogs-card-author'>
                    <div className='Blogs-card-author-name'>By Dr.Murali </div>
                    <div className='Blogs-card-author-prof'>psycholigist</div>
                  </div>
                </div>
              </div>
              <div className='Blogs-card'>
                <div className='Blogs-card-content'>
                  <div className='Blogs-card-title'>7 Tips to Reduce Your Breast Cancer Risk</div>
                  <div className='Blogs-card-author'>
                    <div className='Blogs-card-author-name'>By Dr.Skandha </div>
                    <div className='Blogs-card-author-prof'>Breast surgeon</div>
                  </div>
                </div>
              </div>
              <div className='Blogs-card'>
                <div className='Blogs-card-content'>
                  <div className='Blogs-card-title'>Alcohol Intolerance: What You Need to Know</div>
                  <div className='Blogs-card-author'>
                    <div className='Blogs-card-author-name'>By Dr.Murali </div>
                    <div className='Blogs-card-author-prof'>psycholigist</div>
                  </div>
                </div>
              </div>
              <div className='Blogs-card'>
                <div className='Blogs-card-content'>
                  <div className='Blogs-card-title'>Alcohol Intolerance: What You Need to Know</div>
                  <div className='Blogs-card-author'>
                    <div className='Blogs-card-author-name'>By Dr.Murali </div>
                    <div className='Blogs-card-author-prof'>psycholigist</div>
                  </div>
                </div>
              </div>
              <div className='Blogs-card'>
                <div className='Blogs-card-content'>
                  <div className='Blogs-card-title'>Alcohol Intolerance: What You Need to Know</div>
                  <div className='Blogs-card-author'>
                    <div className='Blogs-card-author-name'>By Dr.Murali </div>
                    <div className='Blogs-card-author-prof'>psycholigist</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Blogs