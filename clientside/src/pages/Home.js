import React from 'react'
import Navbar from '../components/Navbar'
import Searchbar from '../components/Searchbar'

const Home = () => {
  return (
    <div>
        <Navbar title={'Home'}/>
        <Searchbar />
    </div>
  )
}

export default Home