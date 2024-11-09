import React from 'react'
import Header from './header/Header'
import Slider from './slider/Slider'
import Footer from './footer/Footer'
import Categories from './categories/Categories'
import './User.css'
import FullService from './service/FullService'

const User = () => {
  return (
    <div className='user'>
      <Header/>
      <Slider/>
      <FullService/>
      <Categories />
      <Footer/>
    </div>
  )
}

export default User
