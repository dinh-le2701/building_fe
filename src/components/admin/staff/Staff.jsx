import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Pagination, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { FaEye } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { CiTrash } from "react-icons/ci";
import { MdDateRange } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { ReactNotifications, Store } from 'react-notifications-component';


const Staff = () => {
    const [staffs, setStaffs] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [size, setSize] = useState(""); // Số mục trên mỗi trang, mặc định là 10

    // state for modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShowAdd = () => {

        setShow(true);
    };

    // new staff
    const [newStaff, setNewStaff] = useState({})
    const handleSubmits = (e) => {
        e.preventDefault();
        // Ensure date fields are formatted correctly before submitting
        const formattedResident = {
            ...newStaff
        };
        handleResidentSubmit(formattedResident);
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewStaff(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleResidentSubmit = async (apartmentData) => {
        try {
            const response = await fetch('http://localhost:8181/api/v1/staff', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(apartmentData),
            });

            const data = await response.json();
            if (response.ok) {
                console.log('Resident created successfully', data);
                setStaffs([...staffs, data]); // Add the new resident to the list
                handleClose(); // Close the modal after successful creation


                Store.addNotification({
                    title: "Create new staff successful!",
                    type: "success", // green color for success
                    insert: "top",
                    container: "top-left",
                    dismiss: {
                        duration: 4000, // Auto-dismiss after 4 seconds
                        onScreen: true
                    }
                });
                getAllStaff(currentPage, size);
            } else {
                console.error('Failed to create resident:', data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            Store.addNotification({
                title: "Create new staff has failed!",
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



    // Hàm gọi API với phân trang
    const getAllStaff = async (page, size) => {
        try {
            const response = await fetch(`http://localhost:8181/api/v1/staff?page=${page}&size=${size}`);
            if (!response.ok) {
                throw new Error('Failed to fetch staff data');
            }
            const data = await response.json();
            setStaffs(data.content); // Giả sử dữ liệu được trả về trong `data.content`
            setTotalPages(data.page.totalPages); // Giả sử dữ liệu tổng số trang là `data.totalPages`
            console.log(data)
            console.log(data.page.totalPages)
            Store.addNotification({
                title: "Get all staff Successful!",
                type: "success", // green color for success
                insert: "top",
                container: "top-left",
                dismiss: {
                    duration: 2000, // Auto-dismiss after 4 seconds
                    onScreen: true
                }
            });
            setTimeout(() => {
            }, 2000);

        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };


    // Gọi hàm API khi trang hoặc pageSize thay đổi
    useEffect(() => {
        getAllStaff(currentPage, size);
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

    const navigate = useNavigate(); // Hook điều hướng
    const handleResidentDetails = (staff_id) => {
        // Navigate to the resident details page with the ID in the URL
        navigate(`/admin/staff/${staff_id}`);
    };

    const deleteStaffById = async (id) => {
        try {
            const response = await fetch(`http://localhost:8181/api/v1/staff/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                console.log('Staff deleted successfully');
                getAllStaff(currentPage, size); // Cập nhật lại danh sách căn hộ sau khi xóa
                Store.addNotification({
                    title: "Delete successfully!",
                    type: "success", // green color for success
                    insert: "top",
                    container: "top-left",
                    dismiss: {
                        duration: 2000, // Auto-dismiss after 4 seconds
                        onScreen: true
                    }
                });

                setTimeout(() => {
                }, 2000);
            } else {
                const errorData = await response.json();
                console.error('Failed to delete staff:', errorData.message);
            }
        } catch (error) {
            console.error('Error deleting staff:', error);
        }
    }

    return (

        <div className='staff'>
            <ReactNotifications />
            <div className='header p-3 w-100 bg-white d-flex justify-content-between align-items-center'>
                <h3 className='m-0'>Danh Sách Nhân Viên</h3>
                <Button className='me-3' onClick={handleShowAdd}>Thêm mới</Button>
            </div>

            <div className="table-content bg-white m-3 p-3">
                {/* Dropdown chọn số lượng mục */}
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

                <div className="func-table d-flex justify-content-end align-items-center py-3">
                    <div>
                        <Button variant='success'>In</Button>
                    </div>
                </div>

                {/* Bảng hiển thị dữ liệu */}
                <Table hover striped className='w-100 m-0 text-center'>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên Nhân Viên</th>
                            <th>Mã Nhân Viên</th>
                            <th>Email</th>
                            <th>Số Điện Thoại</th>
                            <th>Ngày Sinh</th>
                            <th>Hành Động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading && (
                            <tr>
                                <td colSpan="8">Loading...</td>
                            </tr>
                        )}
                        {!loading && error && (
                            <tr>
                                <td colSpan="8">Error: {error}</td>
                            </tr>
                        )}
                        {!loading && !error && staffs.length > 0 && (
                            staffs.map((staff, index) => (
                                <tr key={index}>
                                    <td>{(currentPage - 0) * size + index + 1}</td>
                                    <td>{staff.staff_name}</td>
                                    <td>{staff.staff_code}</td>
                                    <td>{staff.email}</td>
                                    <td>{staff.phone}</td>
                                    <td>{staff.birthday}</td>
                                    <td className="d-flex justify-content-around align-items-center">
                                        <FaRegEye className='icon fs-2 text-secondary me-2' onClick={() => handleResidentDetails(staff.staff_id)} style={{ fontWeight: "bold" }} />
                                        <CiEdit className="icon pb-1 fs-2 me-1 text-warning"  />
                                        <CiTrash className='icon pb fs-2 text-danger' onClick={() => deleteStaffById(staff.staff_id)}/>
                                        
                                    </td>
                                </tr>
                            ))
                        )}
                        {!loading && !error && staffs.length === 0 && (
                            <tr>
                                <td colSpan="8" className="text-center">No staff data available</td>
                            </tr>
                        )}
                    </tbody>

                </Table>
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
            {/* Modal to add/edit resident */}
            <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    {/* // isEditing ? "Sửa cư dân" :  */}
                    <Modal.Title>{"Thêm mới nhân viên"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form
                        onSubmit={handleSubmits}
                    >
                        <Form.Group className="mb-3">
                            <Form.Label>Tên Nhân Viên</Form.Label>
                            <Form.Control
                                type="text"
                                name='staff_name'
                                value={newStaff.staff_name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Vị Trí Làm Việc</Form.Label>
                            <Form.Select
                                name="staff_position"
                                value={newStaff.staff_position}
                                onChange={handleChange}
                            >
                                <option value="NHÂN VIÊN LỄ TÂN">NHÂN VIÊN LỄ TÂN</option>
                                <option value="NHÂN VIÊN KỸ THUẬT">NHÂN VIÊN KỸ THUẬT</option>
                                <option value="NHÂN VIÊN VỆ SINH">NHÂN VIÊN VỆ SINH</option>
                                <option value="NHÂN VIÊN BẢO VỆ">NHÂN VIÊN BẢO VỆ</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Số Điện Thoại</Form.Label>
                            <Form.Control
                                type="text"
                                name='phone'
                                value={newStaff.phone}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name='email'
                                value={newStaff.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Ngày Sinh</Form.Label>
                            <Form.Control
                                type="date"
                                name='birthday'
                                value={newStaff.birthday}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>


                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Đóng
                            </Button>
                            <Button variant="success" type="submit"> Lưu
                                {/* {isEditing ? "Cập nhật" : "Lưu"} */}
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Staff;
