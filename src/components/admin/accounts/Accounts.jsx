import React, { useEffect, useState } from 'react';
import { Button, Table, Form, Modal } from 'react-bootstrap';
import 'react-notifications-component/dist/theme.css';
import { ReactNotifications, Store } from 'react-notifications-component';


const Accounts = () => {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const [accounts, setAccounts] = useState([]);
    const [account, setNewAccount] = useState({
        email: "",
        password: "",
        role: ""
    });
    const [apartments, setApartments] = useState([]);
    const [selectedAccountId, setSelectedAccountId] = useState(null);
    const [selectedApartmentId, setSelectedApartmentId] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // Fetch danh sách tài khoản
    const fetchAccounts = async () => {
        const response = await fetch("http://localhost:8181/api/account");
        const data = await response.json();
        setAccounts(data)
        console.log(accounts)

    }

    const fetchApartments = async () => {
        const response = await fetch("http://localhost:8181/api/v1/apartment");
        const data = await response.json();
        setApartments(data)
        console.log(apartments)

    }


    // Gửi request gán tài khoản vào căn hộ
    const assignAccountToApartment = () => {
        fetch(`http://localhost:8181/api/account/${selectedAccountId}/assign-to-apartment/${selectedApartmentId}`, {
            method: "POST",
        })
            .then((res) => res.json())
            .then((data) => {
                setShowModal(false);
            });
        Store.addNotification({
            title: "Gán tài khoản thành công!",
            type: "success", // green color for success
            insert: "top",
            container: "top-left",
            dismiss: {
                duration: 2000, // Auto-dismiss after 4 seconds
                onScreen: true
            }
        });
    };

    useEffect(() => {
        fetchAccounts()
        fetchApartments();
        getAccounts();
    }, []);


    // get residents api
    const getAccounts = async () => {
        try {
            const response = await fetch('http://localhost:8181/api/account', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${localStorage.getItem('token')}` // Use token for protected routes
                },
            });

            const data = await response.json();
            if (response.ok) {
                setAccounts(data);
                console.log('Fetched accounts:', data);
                Store.addNotification({
                    title: "Get Account successfully!",
                    type: "success", // green color for success
                    insert: "top",
                    container: "top-left",
                    dismiss: {
                        duration: 2000, // Auto-dismiss after 4 seconds
                        onScreen: true
                    }
                });
            } else {
                console.error('Failed to fetch accounts:', data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    const handleSignup = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:8181/api/account', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(account)
        });
        const data = await response.json();
        console.log(data); // Hiển thị phản hồi từ API
        if (data.message === 'Account created successfully') {
            // Làm trống các ô nhập sau khi đăng ký thành công
            setNewAccount({
                username: '',
                email: '',
                password: '',
                role: ''
            });

            getAccounts(); // Lấy lại danh sách tài khoản
            handleClose(); // Đóng form nếu cần
        }
        getAccounts();
        handleClose();
    }

    // handle form input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewAccount((prevResident) => ({
            ...prevResident,
            [name]: value,
        }));
    };

    // handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Bạn có chắc muốn xoá tài khoản này không?");

        if (confirmDelete) {
            try {
                const response = await fetch(`http://localhost:8181/api/account/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (response.ok) {
                    alert("Xoá tài khoản thành công!");
                    // Thêm logic nếu cần, ví dụ: cập nhật danh sách người dùng
                    fetchAccounts();
                } else {
                    const errorData = await response.json();
                    alert("Xoá tài khoản thất bại: " + errorData.message || "Lỗi không xác định.");
                }
            } catch (error) {
                alert("Đã xảy ra lỗi khi xóa tài khoản: " + error.message);
            }
        }
    };

    return (
        <div className='accounts'
            style={{ height: '93vh' }}>
            <ReactNotifications />
            <div className='header p-3 w-100 bg-white d-flex justify-content-between align-items-center'>
                <h3 className='m-0'>Danh Sách Tài Khoản</h3>
                <Button onClick={handleShow}>Đăng ký tài khoản mới</Button>
            </div>

            <div className="table-content bg-white m-3 p-3">
                <div className="func-table d-flex justify-content-between align-items-center py-3">
                    <div className="select-group">
                        Hiển thị
                        <select name="" id="" className='mx-2'>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                        mục
                    </div>
                </div>

                <Table hover striped bordered className='m-0 w-100 text-center'>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th className='w-25'>Tên Tài Khoản</th>
                            <th className='w-25'>Vai Trò</th>
                            <th className='w-25'>Hành Động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {accounts.map((account, id) => (
                            <tr key={id}>
                                <td>{id + 1}</td>
                                <td>{account.email}</td>
                                <td>{account.role}</td>
                                <td className=''>
                                    <Button
                                        variant="primary"
                                        onClick={() => {
                                            setSelectedAccountId(account.id);
                                            setShowModal(true);
                                        }}
                                    >
                                        Thêm vào căn hộ
                                    </Button>
                                    <Button variant="danger" type="submit" onClick={() => handleDelete(id)}>Xoá tài khoản</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

            {/* Modal to add resident */}
            <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm mới tài khoản</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name='email'
                                value={account.email}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Mật Khẩu</Form.Label>
                            <Form.Control
                                type="text"
                                name='password'
                                value={account.password}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Vai Trò</Form.Label>
                            <Form.Select
                                name="role"
                                value={account.role}
                                onChange={handleChange}
                            >
                                <option>Chọn Vai Trò</option>
                                <option value="ADMIN">ADMIN</option>
                                <option value="USER">USER</option>
                                <option value="STAFF">STAFF</option>
                            </Form.Select>
                        </Form.Group>


                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary" type="submit" onClick={handleSignup}>
                        Lưu
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal chọn căn hộ */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Chọn căn hộ</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <select
                        className="form-select"
                        onChange={(e) => setSelectedApartmentId(e.target.value)}
                    >
                        <option value="">-- Chọn căn hộ --</option>
                        {apartments.content && apartments.content.length > 0 ? (
                            apartments.content.map((apartment) => (
                                <option key={apartment.apartment_id} value={apartment.apartment_id}>
                                    {apartment.apartment_name}
                                </option>
                            ))
                        ) : (
                            <option disabled>No apartments found</option>
                        )}
                        {/* {apartments.map((apartment) => (
                            <option key={apartment.id} value={apartment.id}>
                                {apartment.name}
                            </option>
                            <tr key={index}>
                                    <td>{apartment.apartment_name}</td>
                                    <td>{apartment.area} m<sup>2</sup></td>
                                    <td>{apartment.number_of_room}</td>
                                    <td>{apartment.apartmentStatus}</td>
                                    <td>{apartment.create_at}</td>
                                    <td>{apartment.update_at}</td>
                                    
                                </tr>
                        ))} */}
                    </select>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={assignAccountToApartment}>
                        Gán tài khoản
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}

export default Accounts
