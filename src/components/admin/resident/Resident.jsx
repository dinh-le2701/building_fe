import React, { useEffect, useState } from 'react';
import { Button, Table, Form, Modal } from 'react-bootstrap';
import Pagination from 'react-bootstrap/Pagination';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { ReactNotifications, Store } from 'react-notifications-component';
import { FaEye } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { CiTrash } from "react-icons/ci";

const Resident = () => {
    const [show, setShow] = useState(false);
    const [isEditing, setIsEditing] = useState(false); // Track if in edit mode
    const [residents, setResidents] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [loading, setLoading] = useState(true);
    // eslint-disable-next-line no-unused-vars
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [size, setSize] = useState(5); // Số mục trên mỗi trang, mặc định là 10
    const [newResident, setNewResident] = useState({
        resident_name: "",
        phone_number: "",
        email: "",
        birthday: "",
        move_in_date: "",
        vehicles: [
            {
                vehicle_name: "",
                license_plate: "",
                vehicle_type: "",
                color: "",
            },
        ],
    });

    const [currentResidentId, setCurrentResidentId] = useState(null); // To store the resident ID for editing

    // const formatDate = (dateString) => {
    //     // Chuyển đổi chuỗi "yyyy/MM/dd" thành "yyyy-MM-dd"
    //     const [year, month, day] = dateString.split('/');
    //     return `${year}-${month}-${day}`;
    // };

    useEffect(() => {
        fetchResidents(currentPage, size);
    }, [currentPage, size]);
    // Xử lý thay đổi trang
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

    const fetchResidents = async (page, size) => {
        try {
            const response = await fetch(`http://localhost:8181/api/v1/resident?page=${page}&size=${size}`);
            if (!response.ok) {
                throw new Error('Failed to fetch staff data');
            }
            const data = await response.json();
            setResidents(data.content); // Giả sử dữ liệu được trả về trong `data.content`
            setTotalPages(data.page.totalPages); // Giả sử dữ liệu tổng số trang là `data.totalPages`
            console.log(data);
            Store.addNotification({
                title: "Get Resident successfully!",
                type: "success", // green color for success
                insert: "top",
                container: "top-left",
                dismiss: {
                    duration: 2000, // Auto-dismiss after 4 seconds
                    onScreen: true
                }
            });
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const loadResidents = async (page, size) => {
        try {
            const response = await fetch(`http://localhost:8908/api/v1/resident`);

            if (!response.ok) {
                throw new Error('Failed to fetch staff data');
            }
            const data = await response.json();
            setResidents(data.content); // Giả sử dữ liệu được trả về trong `data.content`
            setTotalPages(data.totalPages);

        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    // Handle form submit
    const handleSubmits = (e) => {
        e.preventDefault();
        // Ensure date fields are formatted correctly before submitting
        const formattedResident = {
            ...newResident
        };
        handleResidentSubmit(formattedResident);
    };

    // Create or update resident API
    const handleResidentSubmit = async (residentData) => {
        try {
            let response;
            if (isEditing) {
                // Update existing resident
                response = await fetch(`http://localhost:8181/api/resident/${currentResidentId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(residentData),
                });
            } else {
                // Create new resident
                response = await fetch('http://localhost:8181/api/v1/resident', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(residentData),
                });
            }

            const data = await response.json();
            if (response.ok) {
                console.log(isEditing ? 'Resident updated successfully' : 'Resident created successfully', data);
                if (isEditing) {
                    setResidents((prev) => prev.map(res => res.id === currentResidentId ? data : res)); // Update resident in list
                } else {
                    setResidents([...residents, data]); // Add new resident to the list
                }
                handleClose(); // Close the modal after successful creation/update
            } else {
                console.error('Failed to save resident:', data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Handle form input change
    const handleChange = (e) => {
        const { name, value } = e.target;

        // Kiểm tra nếu input nằm trong phần vehicle
        if (["vehicle_name", "license_plate", "vehicle_type", "color"].includes(name)) {
            setNewResident((prevState) => ({
                ...prevState,
                vehicles: [
                    {
                        ...prevState.vehicles[0],  // Giữ lại thông tin cũ của vehicle
                        [name]: value,             // Cập nhật thông tin mới cho field cụ thể
                    },
                ],
            }));
        } else {
            setNewResident((prevState) => ({
                ...prevState,
                [name]: value,  // Cập nhật thông tin cho các trường khác của resident
            }));
        }
    };

    // Open modal for creating new resident
    const handleShowAdd = () => {
        setIsEditing(false); // Set to false to indicate adding a new resident
        setNewResident({
            resident_name: "",
            email: "",
            phone_number: "",
            birthday: "",
            move_in_date: "",
        });
        setShow(true);
    };

    // Open modal for editing resident
    const handleShowEdit = (resident) => {
        setIsEditing(true); // Set to true to indicate editing a resident
        setCurrentResidentId(resident.id); // Set the ID of the resident being edited
        setNewResident({
            resident_name: resident.resident_name,
            email: resident.email,
            phone_number: resident.phone_number,
            birthday: resident.birthday,
            move_in_date: resident.move_in_date,
        });
        setShow(true);
    };

    // handle delete api
    const deleteResidentById = async (resident_id) => {
        try {
            const response = await fetch(`http://localhost:8181/api/v1/resident/${resident_id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                console.log('Resident has id:' + resident_id + ' deleted successfully');
                fetchResidents(currentPage, size)
            } else {
                const errorData = await response.json();
                console.error('Failed to delete resident:', errorData.message);
            }
        } catch (error) {
            console.error('Error deleting resident:', error);
        }
    };

    const navigate = useNavigate(); // Hook điều hướng
    const handleResidentDetails = (resident_id) => {
        // Navigate to the resident details page with the ID in the URL
        navigate(`/admin/resident/${resident_id}`);
    };

    const handleClose = () => setShow(false);

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className='resident'
            style={{ height: '' }}>
            <ReactNotifications />
            <div className='header p-3 w-100 bg-white d-flex justify-content-between align-items-center'>
                <h3 className='m-0'>Danh Sách Cư Dân</h3>
            </div>

            <div className="table-content bg-white m-3 p-3">
                <div className="func-table d-flex justify-content-between align-items-center py-3">
                    <div className="select-group">
                        Hiển thị
                        <select name="" id="" className='mx-2' value={size} onChange={handlePageSizeChange}>
                            <option value="0">0</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                            <option value="50">50</option>
                        </select>
                        mục
                    </div>
                    <div>
                        <Button className='me-3' onClick={handleShowAdd}>Thêm mới</Button>
                        <Button variant='success' onClick={handlePrint}>In</Button>
                    </div>
                </div>

                <Table hover striped className='w-100 m-0 text-center'>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Họ Tên</th>
                            <th>Email</th>
                            <th>Số Điện Thoại</th>
                            <th>Ngày Sinh</th>
                            <th>Ngày Nhận Phòng</th>
                            <th>Hành Động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {residents.length > 0 ? (
                            residents.map((resident, id) => (
                                <tr key={id}>
                                    <td>{(currentPage - 0) * size + id + 1}</td>
                                    <td>{resident.resident_name}</td>
                                    <td>{resident.email}</td>
                                    <td>{resident.phone_number}</td>
                                    <td>{resident.birthday}</td>
                                    <td>{resident.move_in_date}</td>
                                    <td className='d-flex justify-content-around align-items-center'>
                                        <Button variant="secondary">
                                            <FaEye className='pb' onClick={() => handleResidentDetails(resident.resident_id)} />
                                        </Button>
                                        <Button variant="warning" onClick={() => handleShowEdit(resident)}>
                                            <CiEdit className='pb' />
                                        </Button>
                                        <Button variant="danger" onClick={() => deleteResidentById(resident.resident_id)}>
                                            <CiTrash className='pb' />
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center">No resident data available</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
                <div className="mt-3 pagination d-flex justify-content-center align-items-center">
                    <div className="mt-3 pagination d-flex justify-content-center align-items-center">
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
            </div>

            {/* Modal to add/edit resident */}
            <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{isEditing ? "Sửa cư dân" : "Thêm mới cư dân"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmits}>
                        <Form.Group className="mb-3">
                            <Form.Label>Họ Tên</Form.Label>
                            <Form.Control
                                type="text"
                                name='resident_name'
                                value={newResident.resident_name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name='email'
                                value={newResident.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Số Điện Thoại</Form.Label>
                            <Form.Control
                                type="text"
                                name='phone_number'
                                value={newResident.phone_number}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Ngày Sinh</Form.Label>
                            <Form.Control
                                type="date"
                                name='birthday'
                                value={newResident.birthday}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Ngày Đăng Ký Nhận Phòng</Form.Label>
                            <Form.Control
                                type="date"
                                name='move_in_date'
                                value={newResident.move_in_date}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Đóng
                            </Button>
                            <Button variant="primary" type="submit">
                                {isEditing ? "Cập nhật" : "Lưu"}
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>

        </div>
    );
};

export default Resident;
