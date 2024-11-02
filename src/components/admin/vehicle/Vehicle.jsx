import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import fetchURL from '../../../api/AxiosInstance';
import { Link } from 'react-router-dom'

const Vehicle = () => {

    const [residents, setResidents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newResident, setNewVehicle] = useState({
        vehicle_name: "",
        license_plate: "",
        vehicle_type: "",
        color: "",
    });

    useEffect(() => {
        // Fetch resident data from your API
        fetchResident();
        console.log(residents + "hi")
    }, []);

    const fetchResident = async () => {
        try {
            const response = await fetchURL('http://localhost:8908/api/v1/resident');
            const data = await response.json();
            setResidents(data.content); // Lưu dữ liệu residents vào state
            setLoading(false);
            console.log(response.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='vehicle'
            style={{ height: '92vh' }}>
            <div className='header p-3 w-100 bg-white d-flex justify-content-between align-items-center'>
                <h3 className='m-0'>Danh Sách Phương Tiện</h3>
                <Link className='pe-3' to={"/resident"}>
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
                            <th>STT</th>
                            <th>Tên Phương Tiện</th>
                            <th>Biển Số Xe</th>
                            <th>Loại Xe</th>
                            <th>Màu Sắc</th>
                            <th>Người Sở Hữu</th>
                        </tr>
                    </thead>
                    <tbody>
                        {residents.length > 0 ? (
                            residents.map((resident, residentIndex) => (
                                residents.vehicles.map((vehicle, vehicleIndex) => (
                                    <tr key={vehicle.vehicle_id}>
                                        <td>{residentIndex + 1}</td>
                                        <td>{vehicle.vehicle_name}</td>
                                        <td>{vehicle.license_plate}</td>
                                        <td>{vehicle.vehicle_type}</td>
                                        <td>{vehicle.color}</td>
                                        <td>{resident.resident_name}</td>
                                    </tr>
                                ))
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center">Không có dữ liệu phương tiện</td>
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
