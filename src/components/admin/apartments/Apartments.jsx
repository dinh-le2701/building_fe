/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Button, Table, Form, Modal, Pagination } from 'react-bootstrap';
import AxiosInstance from '../../../api/AxiosInstance';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { FaEye } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { CiTrash } from "react-icons/ci";
import './Apartment.css'


const Apartments = () => {
    const [show, setShow] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [size, setSize] = useState(5); // Số mục trên mỗi trang, mặc định là 5
    const [apartments, setApartments] = useState([]);
    const [newApartment, setNewApartment] = useState({
        apartment_name: "",
        area: "",
        number_of_room: "",
        price: "",
        status: "TRỐNG",
        create_at: new Date().toISOString().slice(0, 19).replace('T', ' '), // Tạo giá trị cho create_at,
        update_at: null
    });

    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault(); // Prevent form submission reload
        try {
            const response = await AxiosInstance.get(`/api/v1/apartment/search`, {
                params: { name: searchTerm }
            });
            setResults(response.data); // Set results based on response
            console.log("Search results:", response.data);
        } catch (error) {
            console.error("Error searching apartments:", error);
        }
    };
    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            setCurrentPage(newPage);
        }
    };

    // Xử lý khi người dùng thay đổi số lượng mục hiển thị trên mỗi trang
    const handlePageSizeChange = (event) => {
        setSize(Number(event.target.value)); // Cập nhật pageSize
        setCurrentPage(0); // Reset về trang đầu tiên
    };


    const fetchApartments = async (page, size) => {
        try {
            const response = await fetch(`http://localhost:8909/api/v1/apartment`); //?page=${page}&size=${size}
            if (!response.ok) {
                throw new Error('Failed to fetch staff data');
            }
            const data = await response.json();
            setApartments(data.content); // Giả sử dữ liệu được trả về trong `data.content`
            setTotalPages(data.totalPages); // Giả sử dữ liệu tổng số trang là `data.totalPages`
            console.log(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchApartments(currentPage, size);
    }, [currentPage, size]);

    // create new resident api
    const createResident = async (apartmentData) => {
        try {
            const response = await fetch('http://localhost:8909/api/v1/apartment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(apartmentData),
            });

            const data = await response.json();
            if (response.ok) {
                console.log('Resident created successfully', data);
                setApartments([...apartments, data]); // Add the new resident to the list
                handleClose(); // Close the modal after successful creation
                fetchApartments();
            } else {
                console.error('Failed to create resident:', data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // handle form input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewApartment(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        createResident(newApartment); // Pass the new resident data to the API
    };

    // update apartment by id
    const updateApartmentById = async (id) => {

    }

    // delete apartment by id
    const deleteApartmentById = async (id) => {
        try {
            const response = await fetch(`http://localhost:8909/api/apartment/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                console.log('Apartment deleted successfully');
                fetchApartments(); // Cập nhật lại danh sách căn hộ sau khi xóa
            } else {
                const errorData = await response.json();
                console.error('Failed to delete apartment:', errorData.message);
            }
        } catch (error) {
            console.error('Error deleting apartment:', error);
        }
    };


    const navigate = useNavigate(); // Hook điều hướng
    const handleResidentDetails = (apartment_id) => {
        navigate(`/admin/apartment/${apartment_id}`);
    };

    return (
        <div className='apartment'>
            <div className='header p-3 w-100 bg-white d-flex justify-content-between align-items-center'>
                <h3 className='m-0'>Danh Sách Căn Hộ</h3>
                <Button onClick={handleShow}>Thêm mới</Button>
            </div>

            <div className="table-content bg-white m-3 p-3">
                <div className="func-table d-flex justify-content-between align-items-center py-3">
                    <div className="select-group">
                        Hiển thị
                        <select name="" id="" className="mx-2" value={size} onChange={handlePageSizeChange}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                            <option value="50">50</option>
                        </select>
                        mục
                    </div>

                    <div className="search">
                        <Form className='d-flex' onSubmit={handleSearch}>
                            <Form.Group>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter apartment name"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </Form.Group>
                            <Button type='submit'>Tìm</Button>
                        </Form>
                    </div>
                </div>

                <Table hover striped className='w-100 m-0 text-center'>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên Căn Hộ</th>
                            <th>Diện Tích (m2)</th>
                            <th>Số Phòng</th>
                            <th>Giá</th>
                            <th>Trạng Thái</th>
                            <th>Ngày Tạo</th>
                            <th>Ngày Cập Nhật</th>
                            <th>Hành Động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {apartments.length > 0 ? (
                            apartments.map((apartment, id) => (
                                <tr key={id}>
                                    <td>{(currentPage - 0) * size + id + 1}</td>
                                    <td>{apartment.apartment_name}</td>
                                    <td>{apartment.area}</td>
                                    <td>{apartment.number_of_room}</td>
                                    <td>{apartment.price}</td>
                                    <td>{apartment.status}</td>
                                    <td>{apartment.create_at}</td>
                                    <td>{apartment.update_at}</td>
                                    <td className='d-flex justify-content-around align-items-center'>
                                        <Button variant="secondary">
                                            <FaEye className='pb-1' onClick={() => handleResidentDetails(apartment.apartment_id)} />
                                        </Button>
                                        <Button variant="warning" onClick={() => updateApartmentById(apartment.apartment_id)}>
                                            <CiEdit className='pb-1' />
                                        </Button>
                                        <Button variant="danger" onClick={() => deleteApartmentById(apartment.apartment_id)}>
                                            <CiTrash className='pb-1' />
                                        </Button>
                                        <Button variant='primary'>Thanh Toán</Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9">No apartments found</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
                <div className="mt-4 pagination d-flex justify-content-center align-items-center">
                    <Pagination className=''>
                        <Pagination.First onClick={() => handlePageChange(0)} />
                        <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} />
                        <Pagination.Item>{currentPage + 1} / {totalPages}</Pagination.Item>
                        {/* <Pagination.Item>{totalPages}</Pagination.Item> */}
                        <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
                        <Pagination.Last onClick={() => handlePageChange(totalPages - 1)} />
                    </Pagination>
                </div>
            </div>

            {/* Modal to add resident */}
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
    )
}

export default Apartments
