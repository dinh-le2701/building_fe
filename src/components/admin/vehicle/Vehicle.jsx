/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import fetchURL from '../../../api/AxiosInstance';
import { Link } from 'react-router-dom'
import { ReactNotifications, Store } from 'react-notifications-component';

const Vehicle = () => {

    const [residents, setResidents] = useState([])



    const getVehiclesByResident = async () => {
        try {
            const response = await fetch('http://localhost:8181/api/v1/resident');
            const data = await response.json();
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            setResidents(data.content);
            console.log(residents)
            Store.addNotification({
                title: "Lấy dữ liệu phương tiện thành công!",
                type: "success", // green color for success
                insert: "top",
                container: "top-left",
                dismiss: {
                    duration: 3000, // Auto-dismiss after 4 seconds
                    onScreen: true
                }
            });
        } catch (err) {
            Store.addNotification({
                title: "Lấy dữ liệu phương tiện thất bại!",
                type: "danger", // green color for success
                insert: "top",
                container: "top-left",
                dismiss: {
                    duration: 4000, // Auto-dismiss after 4 seconds
                    onScreen: true
                }
            });
        }
    };
    useEffect(() => {
        getVehiclesByResident();
    }, []);

    return (
        <div className='vehicle'
            style={{ height: '92vh' }}>
            <ReactNotifications />
            <div className='header p-3 w-100 bg-white d-flex justify-content-between align-items-center'>
                <h3 className='m-0'>Danh Sách Phương Tiện</h3>
                <Link className='pe-3' to={"/admin"}>
                    <b>Trở về</b>
                </Link>
            </div>

            <div className="table-content bg-white m-3 p-3">
                <div className="func-table d-flex justify-content-between align-items-center py-3">
                    <div className="select-group">
                        Hiển thị
                        <select name="" id="" className='mx-2'>
                            <option value="">10</option>
                            <option value="">20</option>
                            <option value="">30</option>
                            <option value="">50</option>
                        </select>
                        mục
                    </div>
                </div>

                <Table hover striped className='w-100 m-0 text-center'>
                    <thead>
                        <tr>
                            <th>Tên Chủ Sở Hữu</th>
                            <th>Tên Xe</th>
                            <th>Biển Số Xe</th>
                            <th>Loại Xe</th>
                            <th>Màu Sắc</th>
                            <th>Vị Trí Đỗ Xe</th>
                        </tr>
                    </thead>
                    <tbody>
                        {residents.length > 0 ? (
                            residents.map((resident, index) => {
                                // Lặp qua tất cả các xe của mỗi cư dân
                                return resident.vehicles.map((vehicle, vehicleIndex) => (
                                    <tr key={index}>
                                        {/* STT, tên cư dân chỉ hiển thị 1 lần cho mỗi cư dân */}
                                        <td>{resident.resident_name}</td>
                                        <td>{vehicle.vehicle_name}</td>
                                        <td>{vehicle.license_plate}</td>
                                        <td>{vehicle.vehicle_type}</td>
                                        <td>{vehicle.color}</td>
                                    </tr>
                                ));
                            })
                        ) : (
                            <tr className='text-center'>
                                <td colSpan="6">Không có cư dân nào</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>

            {/* Modal to add resident */}
            {/* <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm mới phương tiện</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Tên Phương Tiện</Form.Label>
                            <Form.Control
                                type="text"
                                name='vehicle_name'
                                value={newResident.resident_name}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Biển Số Xe</Form.Label>
                            <Form.Control
                                type="text"
                                name='license_plate'
                                value={newResident.email}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Loại Xe</Form.Label>
                            <Form.Control
                                type="text"
                                name='vehicle_type'
                                value={newResident.phone_number}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Màu Sắc</Form.Label>
                            <Form.Control
                                type="text"
                                name='color'
                                value={newResident.birthday}
                                onChange={handleChange}
                            />
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary" type="submit">
                        Lưu
                    </Button>
                </Modal.Footer>
            </Modal> */}
        </div>
    )
}

export default Vehicle
