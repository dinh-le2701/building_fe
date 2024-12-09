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
import ApartmentDetails from './apartments/ApartmentDetails'
import ResidentDetails from './resident/ResidentDetails'
import Feedback from './feedback/Feedback'
import Parking from './parking/Parking'
import ResidentCard from './card/ResidentCard'
import FireSafe from './fire_safe/FireSafe'

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
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/admin' element={<Home />} />

            <Route path='/resident' element={<Resident />} />
            <Route path='/resident/:id' element={<ResidentDetails />} />
            <Route path='/card' element={<ResidentCard />} />
            <Route path='/vehicle' element={<Vehicle />} />
            <Route path='/parking' element={<Parking />} />
            <Route path='/apartment' element={<Apartments />} />
            <Route path='/apartment/:id' element={<ApartmentDetails />} />

            <Route path='/services' element={<Service />} />
            <Route path='/fire_safe' element={<FireSafe />} />
            <Route path='/account' element={<Accounts />} />
            <Route path='/staff' element={<Staff />} />
            <Route path='/staff/:id' element={<StaffDetail />} />
            <Route path='/notification' element={<Notification />} />
            <Route path='/feedback' element={<Feedback />} />
          </Routes>
        </Col>
      </Row>
    </div>
  )
}

export default Admin
