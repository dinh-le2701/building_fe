/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Button, Table, Form, Modal, Pagination } from 'react-bootstrap';
import { ReactNotifications, Store } from 'react-notifications-component';




const FireSafe = () => {
    const [equipments, setEquipments] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [size, setSize] = useState(5);
    const [error, setError] = useState([])
    const [loading, setLoading] = useState([])

    const fetchEquipment = async () => {
        const response = await fetch("http://localhost:8181/api/fire-safety-equipment")
        const data = await response.json();
        setEquipments(data.content)
        console.log(data)
    }

    useEffect(() => {
        fetchEquipment();
    }, []);
    return (
        <div className='fire-safe'>
            <ReactNotifications />
            <div className="header p-3 w-100 bg-white d-flex justify-content-between align-items-center">
                <h3 className="m-0">Danh Sách Thiết Bị PCCC</h3>
                {/* <Button onClick={handleShow}>Thêm mới</Button> */}
            </div>
            <div className="table-content bg-white m-3 p-3">
                <h1>Quản lý thiết bị PCCC</h1>
                <Table striped hover className='text-center'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tên thiết bị</th>
                            <th>Vị trí</th>
                            <th>Trạng thái</th>
                            <th>Ngày bảo trì tiếp theo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {equipments.length > 0 ? (
                            equipments.map((equipment, id) => (
                                <tr key={id}>
                                    <td>{(currentPage - 0) * size + id + 1}</td>
                                    <td>{equipment.name}</td>
                                    <td>{equipment.location}</td>
                                    <td>{equipment.status}</td>
                                    <td>{equipment.nextMaintenance}</td>
                                    
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center">Không thẻ nào có sẵn</td>
                            </tr>
                        )}
                        {/* {equipment.map(item => (
                            <tr key={item.equipmentId}>
                                <td>{item.equipmentId}</td>
                                <td>{item.name}</td>
                                <td>{item.location}</td>
                                <td>{item.status}</td>
                                <td>{item.nextMaintenance}</td>
                            </tr>
                        ))} */}


                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default FireSafe
