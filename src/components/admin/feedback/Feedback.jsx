import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Pagination, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { FaEye } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { CiTrash } from "react-icons/ci";
import { MdDateRange } from "react-icons/md";
import { Link } from 'react-router-dom'
import { ReactNotifications, Store } from 'react-notifications-component';

const Feedback = () => {
  return (
    <div className='feedback' style={{ height: "100vh" }}>
      <ReactNotifications />
      <div className='header p-3 w-100 bg-white d-flex justify-content-between align-items-center'>
        <h3 className='m-0'>Thông Tin Phản Hồi</h3>
        <Link className='pe-3' to={"/admin"}>
          <b>Trở về</b>
        </Link>
      </div>

      <div className="table-content bg-white m-3 p-3" style={{ height: "90vh" }}>

      </div >
    </div >
  )
}

export default Feedback
