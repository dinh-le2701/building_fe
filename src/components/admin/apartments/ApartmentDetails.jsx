/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Button, Table, Form, Modal } from 'react-bootstrap'
import { useParams } from 'react-router-dom'; // Hook để lấy params từ URL
import { Link } from 'react-router-dom'
import fetchURL from '../../../api/AxiosInstance';

const ApartmentDetails = () => {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const { id } = useParams(); // Lấy id từ URL
    const [apartments, setApartments] = useState(null);
    const [newApartment, setNewApartment] = useState({
        apartment_name: "",
        area: "",
        number_of_room: "",
        price: "",
        status: "TRỐNG",
        create_at: new Date().toISOString().slice(0, 19).replace('T', ' '), // Tạo giá trị cho create_at,
        update_at: null
    });

    useEffect(() => {
        fetchApartmentDetails();
    }, [id]);

    const fetchApartmentDetails = async () => {
        try {
            const response = await fetchURL(`http://localhost:8909/api/v1/apartment/${id}`);
            setApartments(response.data);
            console.log(response.data)
        } catch (err) {
            console.error(err.message);
        }
    };

    if (!apartments) {
        return <div>Loading...</div>;
    }

    const handleSubmit = () => {

    }
    const handleChange = () => {

    }
    return (
        <div className='resident-details'
            style={{ height: '92vh' }}>
            <div className='header p-3 w-100 bg-white d-flex justify-content-between align-items-center'>
                <h3 className='m-0'>Chi Tiết Căn Hộ</h3>
                <div>
                    <Link className='px-3' to={"/admin/apartment"}>
                        <b>Trở về</b>
                    </Link>
                    <Button onClick={handleShow}>Thêm Cư Dân</Button>
                </div>
            </div>

            <div className='info bg-white m-3 p-3'>
                <h4 className='text-center'>Thông tin căn hộ</h4>
                <div className='container w-50'>
                    <Table className='w-75' hover responsive>
                        <tbody>
                            <tr>
                                <th>Tên Căn Hộ: </th>
                                <td>{apartments.apartment_name}</td>
                            </tr>
                            <tr>
                                <th>Diện Tích:</th>
                                <td>{apartments.area}</td>
                            </tr>
                            <tr>
                                <th>Số Phòng:</th>
                                <td>{apartments.number_of_room}</td>
                            </tr>
                            <tr>
                                <th>Giá Phòng:</th>
                                <td>{apartments.price}</td>
                            </tr>
                            <tr>
                                <th>Trạng Thái Phòng:</th>
                                <td>{apartments.status}</td>
                            </tr>
                            <tr>
                                <th>Ngày Cập Nhật:</th>
                                <td>{apartments.update_at}</td>
                            </tr>

                        </tbody>
                    </Table>
                </div>
            </div>

            <div className="payment bg-white m-3 p-3">

                <h4 className="text-center">Thông tin cư dân trong căn hộ</h4>
            </div>

            <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm Mới Căn Hộ</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Tên Căn Hộ</Form.Label>
                            <Form.Control
                                type="text"
                                name='apartment_name'
                                value={newApartment.apartment_name}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Diện Tích</Form.Label>
                            <Form.Control
                                type="number"
                                name='area'
                                value={newApartment.area}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Số Phòng</Form.Label>
                            <Form.Control
                                type="number"
                                name='number_of_room'
                                value={newApartment.number_of_room}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Giá</Form.Label>
                            <Form.Control
                                type="number"
                                name='price'
                                value={newApartment.price}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Trạng Thái</Form.Label>
                            <Form.Select
                                name="status"
                                value={newApartment.status}
                                onChange={handleChange}
                            >
                                <option value="TRỐNG">TRỐNG</option>
                                <option value="ĐANG_SỬ_DỤNG">ĐANG SỬ DỤNG</option>
                                <option value="ĐANG_SỬA_CHỮA">ĐANG SỬA CHỮA</option>
                            </Form.Select>
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
    );
};

export default ApartmentDetails;
