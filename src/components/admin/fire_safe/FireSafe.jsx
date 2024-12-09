import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Button, Table, Form, Modal, Pagination } from 'react-bootstrap';
import { ReactNotifications, Store } from 'react-notifications-component';


const FireSafe = () => {
    const [equipment, setEquipment] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8181/api/fire-safety-equipment')
            .then(response => setEquipment(response.data))
            .catch(error => console.error(error));
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
                <Table className='text-center'>
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
