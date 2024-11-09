import { React } from 'react'
import { Container, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Footer.css'

const Footer = () => {
    return (
        <div className='footer border'>
            <Container className='d-flex justify-content-center align-items-center '>
                <div className="footer_left  w-50 d-flex justify-content-between align-items-center"
                    style={{ height: "150px" }}
                >
                    <div className="logo w-25">
                        <a href="/" className='d-flex justify-content-start align-items-center'>

                        </a>
                        <Link className='d-flex justify-content-start align-items-center'>
                            <Image width={"15%"} height={"15%"} src='https://building-management-store-img.s3.amazonaws.com/2128c770dec2679c3ed3.jpg' roundedCircle />
                            <p className='text-primary'>Kyoto<span>Estate</span></p>
                        </Link>
                        {/* <a href="/"><Image width={"40%"} src='https://media.licdn.com/dms/image/v2/D4D12AQE-FvnekYdHEw/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1664710019612?e=2147483647&v=beta&t=CCBSMTEsBnrtFSRL5jcRdY3oDsw2XrUvq0mtJEBUkpk' /></a> */}
                    </div>
                    <span className='fs-5'>The shortest distance between paradise and the place you call home.</span>
                </div>
                <div className="footer_right w-50 d-flex justify-content-between align-items-center"
                    style={{ height: "150px", padding: "50px", fontSize: "30px" }}
                >
                    <ul>
                        <li className='text-primary fs-5'>Services</li>
                        <li className='fs-5'>Email Marketing</li>
                        <li className='fs-5'>Campaigns</li>
                    </ul>
                    <ul>
                        <li className='text-primary fs-5'>About</li>
                        <li className='fs-5'>Our Story</li>
                        <li className='fs-5'>Benefits</li>
                    </ul>
                    <ul>
                        <li className='fs-5'>Follow Us</li>
                        <li className='fs-5'>1</li>
                        <li className='fs-5'>2</li>
                    </ul>
                </div>
            </Container>
        </div>
    )
}

export default Footer
