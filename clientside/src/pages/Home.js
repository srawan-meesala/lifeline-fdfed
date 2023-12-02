import React from 'react'
import Navbar from '../components/Navbar'
import Searchbar from '../components/Searchbar'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
        <Navbar title={'Home'}/>
        <Searchbar />
        <Footer />
    </div>
  )
}

export default Home