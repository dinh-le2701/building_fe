/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Button, Table, Form, Modal } from 'react-bootstrap';
import Pagination from 'react-bootstrap/Pagination';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { ReactNotifications, Store } from 'react-notifications-component';
import { FaEdit } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { CiTrash } from "react-icons/ci";
import { FaSquarePlus } from "react-icons/fa6";
import { IoReloadOutline } from "react-icons/io5";

import "../icon.css"


const Resident = () => {
    const [show, setShow] = useState(false);
    const handleChangeShow = () => setChangeShow(true);
    const handleChangeClose = () => setChangeShow(false)
    const [changeShow, setChangeShow] = useState(false)
    const [listApartment, setListApartment] = useState([])
    const [selectedApartmentName, setSelectedApartmentName] = useState("");
    const [isEditing, setIsEditing] = useState(false); // Track if in edit mode
    const [residents, setResidents] = useState([]);
    const [apartments, setApartments] = useState([]);
    const [residentId, setResidentId] = useState([])
    // eslint-disable-next-line no-unused-vars
    const [loading, setLoading] = useState(true);
    // eslint-disable-next-line no-unused-vars
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [size, setSize] = useState(1000); // Số mục trên mỗi trang, mặc định là 10
    const [newResident, setNewResident] = useState({
        resident_name: "",
        phone_number: "",
        cccd: "",
        email: "",
        birthday: "",
        vehicles: [
            {
                vehicle_name: "",
                license_plate: "",
                vehicle_type: "",
                color: "",
            },
        ],
    });
    const [searchTerm, setSearchTerm] = useState("");
    const [filterApartment, setFilterApartment] = useState("");
    const [filterAlphabet, setFilterAlphabet] = useState("");
    const filteredResidents = residents
        .filter(resident =>
            resident.resident_name.toLowerCase().includes(searchTerm.toLowerCase()) || // Tìm kiếm theo họ tên
            resident.phone_number.includes(searchTerm) || // Tìm kiếm theo số điện thoại
            (resident.apartment_name && resident.apartment_name.includes(searchTerm)) // Tìm kiếm theo căn hộ
        )
        .filter(resident =>
            filterApartment ? resident.apartment_name === filterApartment : true // Lọc theo căn hộ
        )
        .filter(resident =>
            filterAlphabet ? resident.resident_name.charAt(0).toUpperCase() === filterAlphabet : true // Lọc theo chữ cái đầu tiên
        );

    const fetchApartments = async () => {
        try {
            const response = await fetch("http://localhost:8181/api/v1/apartment");
            const data = await response.json();
            setListApartment(data.content); // Xử lý nếu data.content tồn tại
            console.log(data.content); // Log data sau khi lấy thông tin căn hộ
        } catch (error) {
            console.error("Error fetching apartments:", error);
        }
    };


    const [currentResidentId, setCurrentResidentId] = useState(null); // To store the resident ID for editing

    useEffect(() => {
        fetchResidents(currentPage, size);
        fetchApartments()
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
                title: "Thông tin toàn bộ cư dân!",
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
            // Create new resident
            response = await fetch('http://localhost:8181/api/v1/resident', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(residentData),
            });

            const data = await response.json();
            if (response.ok) {
                Store.addNotification({
                    title: "Tạo mới cư dân thành công!",
                    type: "success", // green color for success
                    insert: "top",
                    container: "top-left",
                    dismiss: {
                        duration: 2000, // Auto-dismiss after 4 seconds
                        onScreen: true
                    }
                });
                console.log(isEditing ? 'Resident updated successfully' : 'Resident created successfully', data);
                if (isEditing) {
                    setResidents((prev) => prev.map(res => res.id === currentResidentId ? data : res)); // Update resident in list
                } else {
                    setResidents([...residents, data]); // Add new resident to the list
                }
                handleClose(); // Close the modal after successful creation/update
            } else {
                console.error('Failed to save resident:', data.message);
                Store.addNotification({
                    title: "Tạo mới cư dân thất bại!",
                    message: data.message,
                    type: "danger", // green color for success
                    insert: "top",
                    container: "top-left",
                    dismiss: {
                        duration: 2000, // Auto-dismiss after 4 seconds
                        onScreen: true
                    }
                });
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
        // setIsEditing(true); // Set to false to indicate adding a new resident
        setShow(true);
    };

    // Open modal for editing resident
    const handleShowEdit = (resident, id) => {
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
        const confirmDelete = window.confirm("Bạn có chắc muốn xoá cư dân này không?");
        if (!confirmDelete) return;
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
    const handleChangeApartment = async (residentId, id) => {
        try {
            const response = await fetch(`http://localhost:8181/api/v1/resident/into/${id}/${residentId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(),  // Nếu có dữ liệu khác cần gửi thì thêm vào đây
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Resident changed successfully', data);
                handleChangeClose();  // Đóng Modal sau khi thành công
                Store.addNotification({
                    title: "Chuyển phòng cho cư dân thành công",
                    type: "success",
                    insert: "top",
                    container: "top-left",
                    dismiss: {
                        duration: 2000,
                        onScreen: true
                    }
                });
                fetchResidents(currentPage, size)
            } else {
                Store.addNotification({
                    title: "Chuyển phòng cho cư dân thất bại",
                    message: data.message,
                    type: "warning",
                    insert: "top",
                    container: "top-left",
                    dismiss: {
                        duration: 5000,
                        onScreen: true
                    }
                });
            }
        } catch (e) {
            Store.addNotification({
                title: "Lỗi khi chuyển phòng cho cư dân",
                type: "danger",
                insert: "top",
                container: "top-left",
                dismiss: {
                    duration: 2000,
                    onScreen: true
                }
            });
        }
    };

    return (
        <div className='resident'
            style={{ height: '' }}>
            <ReactNotifications />
            <div className='header p-3 w-100 bg-white d-flex justify-content-between align-items-center'>
                <h3 className='m-0'>Danh Sách Cư Dân</h3>
                <div>
                    <IoReloadOutline className='icon fs-3 me-4' onClick={() => navigate(0)} />
                    <Button onClick={() => handleShowAdd()}>Thêm</Button>
                </div>
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
                    <div className="d-flex">
                        {/* Tìm kiếm */}
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Tìm kiếm..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />

                        {/* Lọc theo chữ cái */}
                        <select
                            className="form-control mx-2"
                            value={filterAlphabet}
                            onChange={(e) => setFilterAlphabet(e.target.value)}
                        >
                            <option value="">-- Lọc theo chữ cái --</option>
                            {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => (
                                <option key={letter} value={letter}>{letter}</option>
                            ))}
                            {/* Add more options for the alphabet */}
                        </select>

                        {/* Lọc theo căn hộ */}
                        <select
                            className="form-control mx-2"
                            value={filterApartment}
                            onChange={(e) => setFilterApartment(e.target.value)}
                        >
                            <option value="">-- Lọc theo căn hộ --</option>
                            {apartments.map((apartment) => (
                                <option key={apartment.apartment_id} value={apartment.apartment_name}>
                                    {apartment.apartment_name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <Table hover striped className="w-100 m-0 text-center">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Họ Tên</th>
                            <th>Căn Cước Công Dân</th>
                            <th>Email</th>
                            <th>Số Điện Thoại</th>
                            <th>Ngày Sinh</th>
                            <th>Tên Căn Hộ Đang Ở</th>
                            <th>Ngày Nhận Phòng</th>
                            <th>Hành Động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredResidents.length > 0 ? (
                            filteredResidents.map((resident, id) => (
                                <tr key={id}>
                                    <td>{(currentPage - 0) * size + id + 1}</td>
                                    <td>{resident.resident_name}</td>
                                    <td>{resident.cccd}</td>
                                    <td>{resident.email}</td>
                                    <td>{resident.phone_number}</td>
                                    <td>{resident.birthday}</td>
                                    <td>{resident.apartment_name}</td>
                                    <td>{resident.move_in_date}</td>
                                    <td className="d-flex justify-content-around align-items-center">
                                        <FaRegEye className="icon fs-2 text-secondary me-2" onClick={() => handleResidentDetails(resident.resident_id)} style={{ fontWeight: "bold" }} />
                                        <FaEdit className="icon pb fs-3 text-warning" onClick={() => {
                                            setResidentId(resident.resident_id); // Lưu residentId của cư dân cần chuyển phòng
                                            handleChangeShow(); // Mở Modal
                                        }} />
                                        <CiTrash className="icon pb fs-3 text-danger" onClick={() => deleteResidentById(resident.resident_id)} />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" className="text-center">No resident data available</td>
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
                    <Modal.Title>Thêm mới cư dân</Modal.Title>
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
                            <Form.Label>Số Căn Cước Công Dân</Form.Label>
                            <Form.Control
                                type="text"
                                name='cccd'
                                value={newResident.cccd}
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

                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Đóng
                            </Button>
                            <Button variant="primary" type="submit">
                                Lưu
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>

            <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={changeShow} onHide={handleChangeClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Chuyển Phòng Cho Cư Dân</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={(e) => { e.preventDefault(); handleChangeApartment(residentId, selectedApartmentName); }}>
                        <Form.Group className="mb-5 container w-75">
                            <Form.Label>Chọn Phòng</Form.Label>
                            <Form.Select
                                className="form-select"
                                value={selectedApartmentName}
                                onChange={(e) => setSelectedApartmentName(e.target.value)}
                            >
                                <option>-- Chọn căn hộ --</option>
                                {listApartment.map((apartment) => (
                                    <option key={apartment.apartment_id} value={apartment.apartment_id}>
                                        {apartment.apartment_name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleChangeClose}>
                                Hủy
                            </Button>
                            <Button variant="primary" type="submit">
                                Xác Nhận
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Resident;
