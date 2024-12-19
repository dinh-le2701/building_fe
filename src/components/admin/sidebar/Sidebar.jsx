import { React, useState } from 'react'
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
import { FaParking } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { FaAddressCard } from "react-icons/fa";
import { FaFireExtinguisher } from "react-icons/fa";



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
                                <Image width={"60%"} height={"60%"} src='https://building-management-store-img.s3.us-east-1.amazonaws.com/aa831607197aa324fa6b.jpg' roundedCircle />
                                <h1>KyotoEstate</h1>
                            </Container>
                        </Nav.Link>
                    </Nav>

                </div>
                <Container className="p-0">
                    {/* Trang chủ */}
                    <Nav className="btn-click me-auto mb-3">
                        <Nav.Link className='form-control d-flex align-items-center ' href="/admin">
                            <MdOutlineDashboard className='me-3' />
                            Trang Chủ
                        </Nav.Link>
                    </Nav>

                    {/* Căn hộ */}
                    <Nav className="btn-click me-auto flex-column mb-3">
                        {/* Nút Căn Hộ */}
                        <Nav.Link className='form-control d-flex align-items-center ' onClick={() => toggleMenu('apartments')}>
                            <MdApartment className='me-3' />
                            Căn Hộ
                        </Nav.Link>

                        {/* Hiển thị submenu nếu được bật */}
                        {menu.apartments && (
                            <div style={{ paddingLeft: '20px' }}>
                                <Nav.Link className='form-control d-flex align-items-center  my-3' href="/admin/apartment">
                                    <MdApartment className='me-3' />
                                    Căn Hộ
                                </Nav.Link>
                                <Nav.Link className='form-control d-flex align-items-center  my-3' href="/admin/notification">
                                    <IoMdNotifications className='me-3' />
                                    Thông Báo
                                </Nav.Link>
                            </div>
                        )}
                    </Nav>

                    {/* Cư dân */}
                    <Nav className="btn-click me-auto flex-column my-3">
                        {/* Nút Căn Hộ */}
                        <Nav.Link className='form-control d-flex align-items-center ' onClick={() => toggleMenu('resident')}>
                            <FaRegUser className='me-3' />
                            Cư Dân
                        </Nav.Link>

                        {/* Hiển thị submenu nếu được bật */}
                        {menu.resident && (
                            <div style={{ paddingLeft: '20px' }}>
                                <Nav.Link className='form-control d-flex align-items-center mt-3' href="/admin/resident">
                                    <FaRegUser className='me-3' />
                                    Cư Dân
                                </Nav.Link>
                                <Nav.Link className='form-control d-flex align-items-center  my-3' href="/admin/card">
                                    <FaAddressCard  className='me-3' />
                                    Thẻ
                                </Nav.Link>
                            </div>
                        )}
                    </Nav>


                    {/* Phương tiện */}
                    <Nav className="btn-click me-auto flex-column my-3">
                        {/* Nút Căn Hộ */}
                        <Nav.Link className='form-control d-flex align-items-center ' onClick={() => toggleMenu('vehicle')}>
                            <FaBicycle className='me-3' />
                            Phương Tiện
                        </Nav.Link>

                        {/* Hiển thị submenu nếu được bật */}
                        {menu.vehicle && (
                            <div style={{ paddingLeft: '20px' }}>
                                <Nav.Link className='form-control d-flex align-items-center mt-3' href="/admin/vehicle">
                                    <FaBicycle className='me-3' />
                                    Phương Tiện
                                </Nav.Link>
                                <Nav.Link className='form-control d-flex align-items-center  my-3' href="/admin/parking">
                                    <FaParking className='me-3' />
                                    Bãi Giữ Xe
                                </Nav.Link>
                            </div>
                        )}
                    </Nav>

                    {/* Tài khoản */}
                    <Nav className="btn-click me-auto mb-3">
                        <Nav.Link className='form-control d-flex align-items-center ' href="/admin/account">
                            <MdOutlineManageAccounts className='me-3' />
                            Tài khoản
                        </Nav.Link>
                    </Nav>

                    {/* Chi phí */}
                    <Nav className="btn-click me-auto flex-column mb-3">
                        {/* Nút Chi phí */}
                        <Nav.Link className='form-control d-flex align-items-center ' onClick={() => toggleMenu('payment')}>
                            <MdOutlinePayment className='me-3' />
                            Dịch Vụ
                        </Nav.Link>

                        {/* Hiển thị submenu nếu được bật */}
                        {menu.payment && (
                            <div style={{ paddingLeft: '20px' }}>
                                {/* <Nav.Link className='form-control d-flex align-items-center  my-3' href="/admin/convenient">
                                    <CiMoneyBill className='me-3' />
                                    Tiện Ích
                                </Nav.Link> */}
                                <Nav.Link className='form-control d-flex align-items-center  my-3' href="/admin/services">
                                    <MdDesignServices className='me-3' />
                                    Dịch Vụ
                                </Nav.Link>
                            </div>
                        )}
                    </Nav>

                    <Nav className="btn-click me-auto mb-3">
                        <Nav.Link className='form-control d-flex align-items-center ' href="/admin/staff">
                            <FaUsers className='me-3' />
                            Nhân Viên
                        </Nav.Link>
                    </Nav>

                    <Nav className="btn-click me-auto mb-3">
                        <Nav.Link className='form-control d-flex align-items-center ' href="/admin/fire_safe">
                            <FaFireExtinguisher className='me-3' />
                            PCCC
                        </Nav.Link>
                    </Nav>

                    <Nav className="btn-click me-auto mb-3">
                        <Nav.Link className='form-control d-flex align-items-center ' href="/admin/feedback">
                            <MdErrorOutline className='me-3' />
                            Phản Hồi
                        </Nav.Link>
                    </Nav>
                </Container>
                <div className="logout text-center mt-5">
                    <Container>
                        <Button variant='secondary' onClick={handleLogout}>
                            <span><CiLogout /></span>
                        </Button>
                    </Container>
                </div>
            </div>


        </div>
    )
}

export default Sidebar