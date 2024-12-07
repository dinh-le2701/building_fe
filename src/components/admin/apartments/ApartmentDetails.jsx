/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Button, Table, Form, Modal } from 'react-bootstrap'
import { useParams } from 'react-router-dom'; // Hook để lấy params từ URL
import { Link } from 'react-router-dom'
import fetchURL from '../../../api/AxiosInstance';
import { ReactNotifications, Store } from 'react-notifications-component';

const ApartmentDetails = () => {
    const { id } = useParams();
    const [show, setShow] = useState(false);
    const [apartments, setApartments] = useState([]);
    const [residentApartment, setResidentApartment] = useState([])
    const [accountId, setAccountId] = useState(null);
    const [selectedApartmentId, setSelectedApartmentId] = useState(null);
    const [newResident, setNewResident] = useState({
        resident_name: "",
        email: "",
        cccd: "",
        phone_number: "",
        birthday: ""
    });
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const fetchApartmentDetails = async () => {
        try {
            const response = await fetch(`http://localhost:8181/api/v1/apartment/${id}`);
            const data = await response.json();

            // Kiểm tra nếu phản hồi có đúng dữ liệu
            if (data && data.residents) {
                setResidentApartment(data.residents); // Giả sử bạn đang lưu danh sách cư dân vào state residents
                setApartments(data); // Cập nhật thông tin căn hộ nếu cần
                console.log(data)
            }

            Store.addNotification({
                title: "Thông tin chi tiết căn hộ",
                type: "success", // green color for success
                insert: "top",
                container: "top-left",
                dismiss: {
                    duration: 4000, // Auto-dismiss after 4 seconds
                    onScreen: true
                }
            });

        } catch (err) {
            console.error(err.message);
        }
    };


    useEffect(() => {
        fetchApartmentDetails();
    }, [id]);


    if (!apartments) {
        return <div>Loading...</div>;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        createResidentInApartment(newResident); // Gửi thông tin căn hộ mới
    };
    const createResidentInApartment = async (residentData) => {
        try {
            const response = await fetch(`http://localhost:8181/api/v1/apartment/${id}/resident`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(residentData),
            });
            const data = await response.json();
            if (response.ok) {
                console.log('Resident created successfully', data);
                handleClose(); // Close the modal after successful creation
                // setNewResident({
                //     resident_name: "",
                //     email: "",
                //     cccd: "",
                //     phone_number: "",
                //     birthday: ""
                // })
                fetchApartmentDetails();
                Store.addNotification({
                    title: "Thêm mới cư dân thành công",
                    type: "success", // green color for success
                    insert: "top",
                    container: "top-left",
                    dismiss: {
                        duration: 4000, // Auto-dismiss after 4 seconds
                        onScreen: true
                    }
                });
            }
            fetchApartmentDetails();
        } catch (e) {
            Store.addNotification({
                title: "Lỗi khi thêm mới cư dân",
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
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewResident(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleDelete = async (residentId) => {
        const url = `http://localhost:8181/api/v1/resident/${residentId}`;
        const confirmDelete = window.confirm("Bạn có chắc muốn xóa cư dân này không?");

        if (!confirmDelete) return; // Người dùng không xác nhận

        try {
            const response = await fetch(url, {
                method: "DELETE",
            });

            if (response.ok) {
                Store.addNotification({
                    title: "Xoá cư dân thành công!",
                    type: "success", // green color for success
                    insert: "top",
                    container: "top-left",
                    dismiss: {
                        duration: 4000, // Auto-dismiss after 4 seconds
                        onScreen: true
                    }
                });
                fetchApartmentDetails();
            } else {
                const errorMessage = await response.text();
                alert(`Xóa cư dân thất bại: ${errorMessage}`);
            }
        } catch (error) {
            console.error("Đã xảy ra lỗi:", error);
            alert("Đã xảy ra lỗi khi xóa cư dân.");
        }
    };

    // http://localhost:8181/api/account/{accountId}/delete-from-apartment/{apartmentId}

    const handleDeleteAccount = async (accountId, apartmentId) => {
        const url = `http://localhost:8181/api/account/{accountId}/delete-from-apartment/{id}`;
        const confirmDelete = window.confirm("Bạn có chắc muốn xóa tài khoản này không?");

        if (!confirmDelete) return; // Người dùng không xác nhận

        try {
            const response = await fetch(url, {
                method: "DELETE",
            });

            if (response.ok) {
                Store.addNotification({
                    title: "Xoá tài khoản thành công!",
                    type: "success", // green color for success
                    insert: "top",
                    container: "top-left",
                    dismiss: {
                        duration: 4000, // Auto-dismiss after 4 seconds
                        onScreen: true
                    }
                });
                fetchApartmentDetails();
            } else {
                const errorMessage = await response.text();
                // Store.addNotification({
                //     title: "Xoá tài khoản thất bại!",
                //     message: errorMessage,
                //     type: "danger", // green color for success
                //     insert: "top",
                //     container: "top-left",
                //     dismiss: {
                //         duration: 4000, // Auto-dismiss after 4 seconds
                //         onScreen: true
                //     }
                // });
                console.log(accountId)
            }
        } catch (error) {
            console.error("Đã xảy ra lỗi:", error);
            alert("Đã xảy ra lỗi khi xóa tài khoản.");
            Store.addNotification({
                title: "Xoá tài khoản thành công!",
                message: error,
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

    return (
        <div className='resident-details'>
            <ReactNotifications />
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
                <h2 className='text-center'>Thông tin căn hộ</h2>
                <div className='container w-50'>
                    <Table className='w-75' hover responsive>
                        <tbody>
                            <tr>
                                <th>Tên Căn Hộ: </th>
                                <td>{apartments.apartment_name}</td>
                            </tr>
                            <tr>
                                <th>Diện Tích:</th>
                                <td>{apartments.area} m2</td>
                            </tr>
                            <tr>
                                <th>Số Phòng:</th>
                                <td>{apartments.number_of_room} phòng ngủ</td>
                            </tr>
                            <tr>
                                <th>Trạng Thái Phòng:</th>
                                <td>{apartments.apartmentStatus}</td>
                            </tr>
                            <tr>
                                <th>Ngày Cập Nhật:</th>
                                <td>{apartments.update_at}</td>
                            </tr>

                        </tbody>
                    </Table>
                </div>
            </div>

            <div className="apartment-resident-details bg-white m-3 p-3">
                <h4 className="text-center">Thông tin cư dân trong căn hộ</h4>

                <Table className='w-100 text-center' hover responsive>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên Phòng</th>
                            <th>Tên Người Dân</th>
                            <th>Số ĐT</th>
                            <th>Email</th>
                            <th>Ngày Nhận Phòng</th>
                            <th>Hành Động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {residentApartment.length > 0 ? (
                            residentApartment.map((resident, id) => (
                                <tr key={id}>
                                    <td>{id + 1}</td>
                                    <td>{apartments.apartment_name}</td>
                                    <td>{resident.resident_name}</td>
                                    <td>{resident.phone_number}</td>
                                    <td>{resident.email}</td>
                                    <td>{resident.move_in_date}</td>
                                    <td>
                                        <Button variant='danger' onClick={() => {
                                            setAccountId(apartments.account)
                                            handleDelete(resident.resident_id)
                                        }}>Xoá</Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr className='text-center'>
                                <td colSpan="9">No apartments found</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>

            {/* Account */}
            <div className="apartment-resident-details bg-white m-3 p-3">
                <h4 className="text-center">Thông tin tài khoản cho căn hộ</h4>

                <Table className='w-100 text-center' hover responsive>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Email</th>
                            <th>Quyền</th>
                            <th>Trạng thái</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {apartments && apartments.accounts && apartments.accounts.length > 0 ? (
                            apartments.accounts.map((account) => (
                                <tr key={account.id}>
                                    <td>{account.id}</td>
                                    <td>{account.email}</td>
                                    <td>{account.role}</td>
                                    <td>{account.status}</td>
                                    <td>
                                        <Button variant="danger" onClick={() => handleDeleteAccount(account.accountId)}>Xóa</Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">No accounts available</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>

            {/* Modal */}
            <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm Mới Cư Dân</Modal.Title>
                </Modal.Header>
                <Modal.Body className='p-3'>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Tên Công Dân</Form.Label>
                            <Form.Control
                                type="text"
                                name='resident_name'
                                value={newResident.resident_name}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="text"
                                name='email'
                                value={newResident.email}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Số Điện Thoại</Form.Label>
                            <Form.Control
                                type="text"
                                name='phone_number'
                                value={newResident.phone_number}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Căn Cước Công Dân</Form.Label>
                            <Form.Control
                                type="text"
                                name='cccd'
                                value={newResident.cccd}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Ngày Sinh</Form.Label>
                            <Form.Control
                                type="date"
                                name='birthday'
                                value={newResident.birthday}
                                onChange={handleChange}
                                required
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
    );
};

export default ApartmentDetails;
