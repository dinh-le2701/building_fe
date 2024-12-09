/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Button, Table, Form, Modal, Container } from 'react-bootstrap'
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
        sex: "",
        phone_number: "",
        birthday: ""
    });
    const initialResidentState = {
        resident_name: '',
        email: '',
        phone_number: '',
        cccd: '',
        sex: '',
        birthday: '',
    };
    const newErrors = [];
    if (!/^0[0-9]{9}$/.test(newResident.phone_number)) {
        newErrors.push('Số điện thoại phải bắt đầu bằng 0 và theo sau là 9 số.');
    }
    if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(newResident.email)) {
        newErrors.push('Email phải đúng định dạng: @gmail.com.');
    }
    if (!/^\d{12}$/.test(newResident.cccd)) {
        newErrors.push('Số CCCD phải gồm đúng 12 chữ số.');
    }
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
                console.log(apartments.apartment_name)
            }
            Store.addNotification({
                title: "Thông tin chi tiết căn hộ",
                type: "success", // green color for success
                insert: "top",
                container: "top-left",
                dismiss: {
                    duration: 1000, // Auto-dismiss after 4 seconds
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
                handleClose();
                fetchApartmentDetails();
                Store.addNotification({
                    title: "Thêm mới cư dân thành công",
                    type: "success", // green color for success
                    insert: "top",
                    container: "top-left",
                    dismiss: {
                        duration: 2000, // Auto-dismiss after 4 seconds
                        onScreen: true
                    }
                });
                setNewResident(initialResidentState)
            } else {
                Store.addNotification({
                    title: "Thêm cư dân lỗi",
                    message: newErrors.join("\n"),
                    type: "warning", // green color for success
                    insert: "top",
                    container: "top-left",
                    dismiss: {
                        duration: 5000, // Auto-dismiss after 4 seconds
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
                    duration: 2000, // Auto-dismiss after 4 seconds
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
        // Thay thế {accountId} và {apartmentId} trong URL bằng giá trị thực
        const url = `http://localhost:8181/api/account/${accountId}/delete-from-apartment/${apartmentId}`;
        const confirmDelete = window.confirm("Bạn có chắc muốn xóa tài khoản này không?");

        if (!confirmDelete) return; // Người dùng không xác nhận

        try {
            const response = await fetch(url, {
                method: "DELETE",
            });

            if (response.ok) {
                // Hiển thị thông báo thành công
                Store.addNotification({
                    title: "Xóa tài khoản thành công!",
                    type: "success",
                    insert: "top",
                    container: "top-left",
                    dismiss: {
                        duration: 4000, // Auto-dismiss sau 4 giây
                        onScreen: true,
                    },
                });
                fetchApartmentDetails(); // Gọi lại hàm để load dữ liệu mới
            } else {
                const errorData = await response.json();
                console.error("Lỗi khi xóa tài khoản:", errorData);
                alert("Đã xảy ra lỗi khi xóa tài khoản.");
            }
        } catch (error) {
            console.error("Đã xảy ra lỗi:", error);
            Store.addNotification({
                title: "Xóa tài khoản thất bại!",
                message: "Đã xảy ra lỗi khi kết nối với server.",
                type: "danger",
                insert: "top",
                container: "top-left",
                dismiss: {
                    duration: 4000,
                    onScreen: true,
                },
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
                                <td>{apartments.area} m<sup>2</sup></td>
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
                <Container className='w-75'>
                    <h4 className="text-center">Thông tin cư dân trong căn hộ</h4>

                    <Table className='w-100 text-center' hover responsive>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Tên Phòng</th>
                                <th>Tên Người Dân</th>
                                <th>Giới Tính</th>
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
                                        <td>{resident.sex}</td>
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
                </Container>
            </div>

            {/* Account */}
            <div className="apartment-resident-details bg-white m-3 p-3">
                <Container className='w-75'>
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
                                            <Button
                                                variant="danger"
                                                onClick={() => handleDeleteAccount(account.id, apartments.apartment_id)}
                                            >
                                                Xóa
                                            </Button>
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
                </Container>
            </div>

            {/* Thông tin dịch vụ sử dụng cho căn hộ */}
            <div className="apartment-resident-details bg-white m-3 p-3">
                <Container className='w-75'>
                    <h4 className="text-center">Thông tin dịch vụ sử dụng</h4>

                    <Table className='w-100 text-center' hover responsive>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Tên Dịch Vụ</th>
                                <th>Trạng thái</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {apartments && apartments.accounts && apartments.accounts.length > 0 ? (
            apartments.accounts.map((account) => (
                <tr key={account.id}>
                    <td>{account.id}</td>
                    <td>{account.email}</td>
                    <td>{account.status}</td>
                    <td>
                        <Button
                            variant="danger"
                            onClick={() => handleDeleteAccount(account.id, apartments.apartment_id)}
                        >
                            Xóa
                        </Button>
                    </td>

                </tr>
            ))
        ) : (
            <tr>
                <td colSpan="5">No accounts available</td>
            </tr>
        )} */}
                        </tbody>
                    </Table>
                </Container>
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
                                pattern="^[a-zA-Z0-9._%+-]+@gmail\.com$"
                                title="Email phải có dạng @gmail.com"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Số Điện Thoại</Form.Label>
                            <Form.Control
                                type="text"
                                name='phone_number'
                                value={newResident.phone_number}
                                onChange={handleChange}
                                pattern="^0[0-9]{9}$"
                                title="Số điện thoại phải là 10 số và bắt đầu bằng 0"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Căn Cước Công Dân</Form.Label>
                            <Form.Control
                                type="text"
                                name='cccd'
                                value={newResident.cccd}
                                onChange={handleChange}
                                pattern="^\d{12}$"
                                title="Số CCCD phải gồm đúng 12 chữ số"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Giới Tính</Form.Label>
                            <Form.Select
                                name="sex"
                                value={newResident.sex}
                                onChange={handleChange}
                            >
                                <option>Chọn Giới Tính</option>
                                <option value="Nam">Nam</option>
                                <option value="Nữ">Nữ</option>
                            </Form.Select>
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
