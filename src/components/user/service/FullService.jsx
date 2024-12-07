import React from 'react'
import { Container } from 'react-bootstrap'
import '../User.css'
import { IoMdText } from "react-icons/io";


const FullService = () => {
    return (
        <div className='full-service'>
            <Container>
                <div className="top my-4 ms-5">
                    <p className='h2 fw-bold'>What we do</p>
                    <span className='fs-5'>Full-Service Agents, Modern Technology</span>
                </div>
                <div className="content d-flex justify-content-between align-items-center">
                    <div className='bg-light text-center p-5 w-25 mx-2'>
                        <IoMdText />
                        <p className='h5 fw-bold fs-4'>Communication</p>
                        <span className='fs-5'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi consequuntur accusamus vel dicta voluptates.</span>
                    </div>
                    <div className='bg-light text-center p-5 w-25 mx-2'>
                        <IoMdText />
                        <p className='h5 fw-bold fs-4'>Reliability</p>
                        <span className='fs-5'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi consequuntur accusamus vel dicta voluptates.</span>
                    </div>
                    <div className='bg-light text-center p-5 w-25 mx-2'>
                        <IoMdText />
                        <p className='h5 fw-bold fs-4'>Quality First</p>
                        <span className='fs-5'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi consequuntur accusamus vel dicta voluptates.</span>
                    </div>
                    <div className='bg-light text-center p-5 w-25 mx-2'>
                        <IoMdText />
                        <p className='h5 fw-bold fs-4'>Families</p>
                        <span className='fs-5'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi consequuntur accusamus vel dicta voluptates.</span>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default FullService
