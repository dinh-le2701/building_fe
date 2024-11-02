import { React, useState } from 'react'
import { Link } from 'react-router-dom'
import { Nav, Container, Image, Button } from 'react-bootstrap';
import { FaBicycle } from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { MdApartment } from "react-icons/md";
import { MdOutlineManageAccounts } from "react-icons/md";
import { CiMoneyBill } from "react-icons/ci";
import { FaUsers } from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";
import { MdOutlinePayment } from "react-icons/md";
import { MdDesignServices } from "react-icons/md";
import { IoMdNotifications } from "react-icons/io";

import './Sidebar.css'

const Sidebar = () => {
    const [menu, setMenu] = useState({
        residents: false,
        apartments: false,
        payment: false
    });

    const toggleMenu = (key) => {
        setMenu(prevMenu => ({
            ...prevMenu,
            [key]: !prevMenu[key]
        }));
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    };

    return (
        <div className='sidebar' >
            <div className="sidebar-content p-3">
                <div className="logo">
                    <Nav className="btn-click me-auto mb-3">
                        <Nav.Link className='w-100 text-center' href="/admin">
                            <Container >
                                <Image width={"70%"} height={"70%"} src='https://building-management-store-img.s3.amazonaws.com/2128c770dec2679c3ed3.jpg' roundedCircle />
                            </Container>
                        </Nav.Link>
                    </Nav>

                </div>
                <Container className="p-0 text-dark">
                    {/* Trang chủ */}
                    <Nav className="btn-click me-auto mb-3">
                        <Nav.Link className='form-control d-flex align-items-center text-dark' href="/admin">
                            <MdOutlineDashboard className='me-3' />
                            <span>Trang Chủ</span>
                        </Nav.Link>
                    </Nav>

                    {/* Cư dân */}
                    <Nav className="btn-click me-auto flex-column mb-3">
                        {/* Nút Cư Dân */}
                        <Nav.Link className='form-control d-flex align-items-center text-dark' onClick={() => toggleMenu('residents')}>
                            <FaRegUser className='me-3' />
                            <span>Cư Dân</span>
                        </Nav.Link>

                        {/* Hiển thị submenu nếu được bật */}
                        {menu.residents && (
                            <div style={{ paddingLeft: '20px' }}>
                                {/* <Link className='no-border form-control d-flex align-items-center text-dark my-3' to="/admin/resident">
                                    <FaRegUser className='me-3' />
                                    Cư Dân</Link> */}

                                <Nav.Link className='form-control d-flex align-items-center text-dark my-3' href="/admin/resident">
                                    <FaRegUser className='me-3' />
                                    Cư Dân
                                </Nav.Link>
                                {/* <Nav.Link className='form-control d-flex align-items-center text-dark my-3' href="admin/resident">

                                </Nav.Link> */}
                                <Nav.Link className='form-control d-flex align-items-center text-dark my-3' href="/admin/vehicle">
                                    <FaBicycle className='me-3' />
                                    Phương Tiện
                                </Nav.Link>
                                <Nav.Link className='form-control d-flex align-items-center text-dark my-3' href="/admin/contract">

                                    Hợp Đồng
                                </Nav.Link>
                            </div>
                        )}
                    </Nav>

                    {/* Căn hộ */}
                    <Nav className="btn-click me-auto flex-column mb-3">
                        {/* Nút Căn Hộ */}
                        <Nav.Link className='form-control d-flex align-items-center text-dark' onClick={() => toggleMenu('apartments')}>
                            <MdApartment className='me-3' />
                            <span>Căn Hộ</span>
                        </Nav.Link>

                        {/* Hiển thị submenu nếu được bật */}
                        {menu.apartments && (
                            <div style={{ paddingLeft: '20px' }}>
                                <Nav.Link className='form-control d-flex align-items-center text-dark my-3' href="/admin/apartment">
                                    <MdApartment className='me-3' />
                                    Căn Hộ
                                </Nav.Link>
                                <Nav.Link className='form-control d-flex align-items-center text-dark my-3' href="/admin/notification">
                                    <IoMdNotifications className='me-3' />
                                    Thông Báo
                                </Nav.Link>
                            </div>
                        )}
                    </Nav>

                    {/* Tài khoản */}
                    <Nav className="btn-click me-auto mb-3">
                        <Nav.Link className='form-control d-flex align-items-center text-dark' href="/admin/account">
                            <MdOutlineManageAccounts className='me-3' />
                            <span>Tài Khoản</span>
                        </Nav.Link>
                    </Nav>

                    {/* Chi phí */}
                    <Nav className="btn-click me-auto flex-column mb-3">
                        {/* Nút Chi phí */}
                        <Nav.Link className='form-control d-flex align-items-center text-dark' onClick={() => toggleMenu('payment')}>
                            <MdOutlinePayment className='me-3' />
                            <span>Thanh Toán</span>
                        </Nav.Link>

                        {/* Hiển thị submenu nếu được bật */}
                        {menu.payment && (
                            <div style={{ paddingLeft: '20px' }}>
                                <Nav.Link className='form-control d-flex align-items-center text-dark my-3' href="/admin/payment">
                                    <CiMoneyBill className='me-3' />
                                    Chi Phí
                                </Nav.Link>
                                <Nav.Link className='form-control d-flex align-items-center text-dark my-3' href="/admin/apartment">
                                    <CiMoneyBill className='me-3' />
                                    Hoá Đơn
                                </Nav.Link>
                                <Nav.Link className='form-control d-flex align-items-center text-dark my-3' href="/admin/services">
                                    <MdDesignServices className='me-3' />
                                    Dịch Vụ
                                </Nav.Link>
                            </div>
                        )}
                    </Nav>

                    <Nav className="btn-click me-auto mb-3">
                        <Nav.Link className='form-control d-flex align-items-center text-dark' href="/admin/staff">
                            <FaUsers className='me-3' />
                            <span>Nhân Viên</span>
                        </Nav.Link>
                    </Nav>

                    <Nav className="btn-click me-auto mb-3">
                        <Nav.Link className='form-control d-flex align-items-center text-dark' href="/admin/error">
                            <MdErrorOutline className='me-3' />
                            <span>Error Page</span>
                        </Nav.Link>
                    </Nav>
                </Container>
                <div className="logout text-center">
                    <Container>
                        <Button variant='secondary' onClick={handleLogout}>Đăng xuất</Button>
                    </Container>
                </div>
            </div>


        </div>
    )
}

export default Sidebar