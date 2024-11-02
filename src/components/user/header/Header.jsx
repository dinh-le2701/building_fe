import React from 'react'
import { Button, Image, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Header.css'

const Header = () => {
    return (
        <Container>
            <div className='header d-flex justify-content-between align-items-center'>
                <div className="logo w-25">
                    <a href="/"><Image width={"30%"} src='https://media.licdn.com/dms/image/v2/D4D12AQE-FvnekYdHEw/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1664710019612?e=2147483647&v=beta&t=CCBSMTEsBnrtFSRL5jcRdY3oDsw2XrUvq0mtJEBUkpk' /></a>
                </div>
                <div className="header-navigation w-50  d-flex -justify-content-between align-items-center">
                    <a className='me-5' href="#Home">Home</a>
                    <a className='me-5' href="">About Us</a>
                    <a className='me-5' href="">Agent</a>
                    <a className='me-5' href="">Blog</a>
                </div>
                <div className="header-login">
                    <Link className='btn btn-primary' to={"/login"} >Login</Link>
                </div>
            </div>
        </Container>
    )
}

export default Header
