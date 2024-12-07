import React from 'react'
import { Container } from 'react-bootstrap'
import '../User.css'

const Categories = () => {
    return (
        <div className='categories mb-5'>
            <Container className='text-center'>
                <div className="category-title my-5">
                    <h2 className='fw-bold'>Move to What Moves You</h2>
                    <p className='fs-5'>Keep calm & travel on</p>
                </div>
                <div className="card-list-group d-flex justify-content-around align-items-center text-center">
                    <div className="card-img m-3">
                    </div>
                    <div className="card-img m-3">
                    </div>
                    <div className="card-img m-3">
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Categories
