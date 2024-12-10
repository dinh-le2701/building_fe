/* eslint-disable no-unused-vars */
import React from 'react'
import { Container, Form, Button, Image } from 'react-bootstrap'
import './Slider.css'
import { CiSearch } from "react-icons/ci";


const Slider = () => {
  return (
    <div className='slider my-3'>
      <Container className='text-center'>
        <h3>Let's find a home <br /> that's perfect for you</h3>
        <span>Seach confidently with your trusted source of homes for sale or rent</span>

        <div className="fg text-center">
          <Form.Group className='text-center d-flex justify-content-center align-items-center mt-3 w-100'>
            <Form.Control className='w-100 p-3' placeholder='Enter an address, neighborhood, city, or ZIP code'></Form.Control>
            
          </Form.Group>
        </div>
      </Container>



      <Container className='trusted companies d-flex justify-content-around align-items-center mt-4'>
        <Image width={"150px"} src='https://hanaichi.vn/blog/wp-content/uploads/2020/10/amazon-768x547-1.jpeg' />
        <Image width={"150px"} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSI6JuBpa26ZktPapld5MjcRyc6HDWC_1IWSg&s' />
        <Image width={"150px"} src='https://content.presspage.com/clients/o_685.jpg' />
        <Image width={"150px"} src='https://www.google.com.vn/images/branding/googlelogo/2x/googlelogo_color_160x56dp.png' />
        <Image width={"150px"} src='https://cdn.pixabay.com/photo/2013/02/12/09/07/microsoft-80658_1280.png' />
      </Container>
    </div>
  )
}

export default Slider
