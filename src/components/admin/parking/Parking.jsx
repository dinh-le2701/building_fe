/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Modal, Table, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { MdLibraryAdd } from "react-icons/md";

import { ReactNotifications, Store } from 'react-notifications-component';
import '../parking/Parking.css'

const Parking = () => {
    const [parking, setParking] = useState([]);
    const [show, setShow] = useState(false);
    const [showAdd, setShowAdd] = useState(false)
    const handleShow = () => setShowAdd(true);
    const [selectedParking, setSelectedParking] = useState(null);
    const [newParking, setNewParking] = useState({
        park_name: "",
        park_type: "",
        park_description: ""
    })


    const fetchParking = () => {
        fetch("http://localhost:8181/api/v1/parking") // Thay bằng endpoint của bạn
            .then((response) => response.json())
            .then((data) => setParking(data))
            .catch((error) => console.error("Lỗi khi lấy dữ liệu:", error));
    }
    // Giả sử bạn đã fetch dữ liệu từ API và lưu vào state parking
    useEffect(() => {
        fetchParking()
    }, []);

    // Mở modal khi nhấn vào bãi đỗ
    const showFeedbackId = (id) => {
        const selected = parking.find((park) => park.id === id);
        setSelectedParking(selected);
        setShow(true);
    };

    // Đóng modal
    const handleClose = () => setShow(false);
    const handleAddClose = () => setShowAdd(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        createParking(newParking); // Gửi thông tin căn hộ mới
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewParking(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const createParking = async (parkingData) => {
        try {
            const response = await fetch('http://localhost:8181/api/v1/parking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(parkingData),
            });

            const data = await response.json();
            if (response.ok) {
                setParking([...parking, data]); // Thêm căn hộ mới vào danh sách
                handleAddClose(); // Đóng modal sau khi thêm thành công
                fetchParking(); // Cập nhật lại danh sách căn hộ
                console.log(parkingData)
            } else {
                console.error('Failed to create apartment:', data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    return (
        <div className='parking'>
            <ReactNotifications />
            <div className='header p-3 w-100 bg-white d-flex justify-content-between align-items-center'>
                <h3 className='m-0'>Thông Tin Hầm Giữ Xe</h3>
                <div>
                    <Link className='pe-3' to={"/admin"}>
                        <b>Trở về</b>
                    </Link>
                    <MdLibraryAdd className='fs-2 text-primary' onClick={() => handleShow()}/>
                </div>
            </div>

            <div className="table-content bg-white m-3 p-3">
                <Row>
                    {parking.length > 0 ? (
                        parking.map((park, index) => (
                            <Col key={index} md={4} className="mb-4" onClick={() => showFeedbackId(park.id)}>
                                {/* Mỗi khối */}
                                <Card className="h-100 shadow-sm ">
                                    <Card.Body className="text-center">
                                        <Card.Text>ID: {park.id}</Card.Text>
                                        <Card.Text className="fw-bold">{park.park_name}</Card.Text>
                                        <Card.Text>{park.park_type}</Card.Text>
                                        <Card.Text>{park.park_description}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <p>Loading parking data...</p>
                    )}
                </Row>

                {/* Modal hiển thị thông tin xe trong bãi đỗ */}
                <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Thông tin xe trong hầm</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="p-4">
                        {selectedParking ? (
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Tên phương tiện</th>
                                        <th>Biển số</th>
                                        <th>Loại phương tiện</th>
                                        <th>Màu sắc</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedParking.vehicles.length > 0 ? (
                                        selectedParking.vehicles.map((vehicle) => (
                                            <tr key={vehicle.vehicle_id}>
                                                <td>{vehicle.vehicle_name}</td>
                                                <td>{vehicle.license_plate}</td>
                                                <td>{vehicle.vehicle_type}</td>
                                                <td>{vehicle.color}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className='text-center'>Không có phương tiện nào trong bãi đỗ này.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        ) : (
                            <p>Loading vehicle data...</p>
                        )}
                    </Modal.Body>
                </Modal>

                {/* Thêm mới bãi đỗ */}
                <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={showAdd} onHide={handleAddClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Thêm Mới Căn Hộ</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='p-4'>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Tên Bãi Đỗ</Form.Label>
                                <Form.Control
                                    type="text"
                                    name='park_name'
                                    value={newParking.park_name}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                            <Form.Label>Loại Bãi Đỗ</Form.Label>
                            <Form.Select
                                name="park_type"
                                value={newParking.park_type || "DEFAULT"}
                                onChange={handleChange}
                            >
                                {!newParking.park_type && (
                                    <option value="DEFAULT" disabled hidden>
                                        Chọn Loại Bãi Đỗ
                                    </option>
                                )}
                                <option value="Dành cho xe máy">Dành cho xe máy</option>
                                <option value="Dành cho xe hơi">Dành cho xe hơi</option>
                                <option value="Dành cho nhân viên">Dành cho nhân viên</option>
                                <option value="Dành cho khách vãng lai">Dành cho khách vãng lai</option>
                            </Form.Select>
                        </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Mô Tả</Form.Label>
                                <Form.Control
                                    type="text"
                                    name='park_description'
                                    value={newParking.park_description}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Đóng
                        </Button>
                        <Button variant="primary" type="submit" onClick={handleSubmit}>
                            Lưu
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div >
    )
}

export default Parking
