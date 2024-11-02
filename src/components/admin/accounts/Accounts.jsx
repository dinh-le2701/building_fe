import React, { useEffect, useState } from 'react';
import { Button, Table, Form, Modal } from 'react-bootstrap';
import { ReactNotifications } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

const Accounts = () => {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const [accounts, setAccounts] = useState([]);
    const [account, setNewAccount] = useState({
        email: "",
        password: ""
    });

    useEffect(() => {
        getAccounts();
    }, []);


    // get residents api
    const getAccounts = async () => {
        try {
            const response = await fetch('http://localhost:1999/api/accounts', {
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
            } else {
                console.error('Failed to fetch accounts:', data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    const handleSignup = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:1999/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(account)
        });
        const data = await response.json();
        console.log(data); // Hiển thị phản hồi từ API
        getAccounts()
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

    const handleDelete = async () => {

    }
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
                            <th>Tên Tài Khoản</th>
                            <th>Quyền</th>
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
                                    <Button className='me-1' variant="danger" type="submit" onClick={handleDelete}>Xoá tài khoản</Button>
                                    <Button variant='primary'>Thêm vào căn hộ</Button>
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
        </div>
    )
}

export default Accounts
