import React from 'react'
import "./Admin.css"
import { Row, Col } from 'react-bootstrap'
import { Routes, Route } from 'react-router-dom'
import Home from './home/Home'
import Sidebar from '../admin/sidebar/Sidebar'
import Resident from './resident/Resident'
import Vehicle from './vehicle/Vehicle'
import Apartments from './apartments/Apartments'
import Notification from './notification/Notification'
import Accounts from './accounts/Accounts'
import Staff from './staff/Staff'
import StaffDetail from './staff/StaffDetail'
import Service from './service/Service'

const Admin = () => {
  return (
    <div className='admin'>
      <Row className='w-100'>
        {/* Cột sidebar */}
        <Col style={{ height: "100vh" }} xs={12} lg={2} className='sidebar-col p-0'>
          <Sidebar />
        </Col>

        {/* Cột chứa Header và nội dung */}
        <Col xs={12} lg={10} className='content-col p-0'>
          {/* <Header /> */}
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/admin' element={<Home />} />

            <Route path='/resident' element={<Resident />} />
            <Route path='/vehicle' element={<Vehicle />} />
            <Route path='/apartment' element={<Apartments />} />
            <Route path='/services' element={<Service />} />

            <Route path='/account' element={<Accounts />} />
            <Route path='/staff' element={<Staff />} />
            <Route path='/admin/staff/:id' element={<StaffDetail/>}/>
            <Route path='/notification' element={<Notification />} />
          </Routes>
        </Col>
      </Row>
    </div>
  )
}

export default Admin
