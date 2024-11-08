import { React } from 'react'
import { Container, Image, ListGroupItem } from 'react-bootstrap'
import './Footer.css'

const Footer = () => {
    return (
        <div className='footer border'
            // style={{ height: "100px" }}
        >
            <Container className='d-flex justify-content-center align-items-center '>
                <div className="footer_left  w-50 d-flex justify-content-between align-items-center"
                    style={{ height: "150px"}}
                >
                    <Image className='me-4' width={"20%"} src={"https://media.licdn.com/dms/image/v2/D4D12AQE-FvnekYdHEw/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1664710019612?e=2147483647&v=beta&t=CCBSMTEsBnrtFSRL5jcRdY3oDsw2XrUvq0mtJEBUkpk"} />
                    <span>The shortest distance between paradise and the place you call home.</span>
                </div>
                <div className="footer_right  w-50 d-flex justify-content-between align-items-center"
                    style={{ height: "150px", padding: "50px" }}
                >
                    <ul>
                        <li className='text-primary'>Services</li>
                        <li>Email Marketing</li>
                        <li>Campaigns</li>
                    </ul>
                    <ul>
                        <li className='text-primary'>About</li>
                        <li>Our Story</li>
                        <li>Benefits</li>
                    </ul>
                    <ul>
                        <li>Follow Us</li>
                        <li>1</li>
                        <li>2</li>
                    </ul>
                </div>
            </Container>
        </div>
    )
}

export default Footer
