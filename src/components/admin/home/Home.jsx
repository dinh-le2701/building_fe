import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import './Home.css';
import LineCharts from '../charts/LineCharts.jsx';
import BarCharts from '../charts/BarCharts.jsx';
import PieCharts from '../charts/PieCharts.jsx';
import { MdApartment } from "react-icons/md";
import { FaPeopleGroup } from "react-icons/fa6";
import { MdEmojiTransportation } from "react-icons/md";
import { GrUserWorker } from "react-icons/gr";



const Home = () => {
    const [residents, setResidents] = useState([]);
    const [apartments, setApartments] = useState([]);
    const [staffs, setStaffs] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState()

    const getApartments = async () => {
        try {
            const response = await fetch('http://localhost:8181/api/v1/apartment');
            if (!response.ok) {
                throw new setError(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setApartments(data);
            console.log(data.page.totalElements + " apartment")
            setLoading(false);
        } catch (err) {
            setLoading(false);
            // toast.error('Không thể tải dữ liệu, vui lòng thử lại sau.');
            console.error("Error fetching apartments:", err);
        }
    };

    const getResidents = async () => {
        try {
            const response = await fetch('http://localhost:8181/api/v1/resident');

            const data = await response.json();
            setResidents(data);
            console.log(data.page.totalElements + " resident")
            setLoading(false);
        } catch (err) {
            setLoading(false);
            // toast.error('Không thể tải dữ liệu, vui lòng thử lại sau.');
            console.error("Error fetching residents:", err);
        }
    };

    const getStaffs = async () => {
        try {
            const response = await fetch('http://localhost:8181/api/v1/staff');
            if (!response.ok) {
                throw new setError(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setStaffs(data);
            console.log(data.page.totalElements + " staff")
            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.error("Error fetching residents:", err);
        }
    };

    const getVehicles = async () => {
        try {
            const response = await fetch('http://localhost:8181/api/v1/resident/vehicles');
            if (!response.ok) {
                throw new setError(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setVehicles(data);
            console.log(data.page.totalElements + " vehicles")
            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.error("Error fetching residents:", err);
        }
    };
    useEffect(() => {
        getApartments();
        getResidents();
        getStaffs();
        getVehicles()
    }, []);

    return (
        <div className='home'>
            {/* <ToastContainer /> */}
            <div className='header p-3 w-100 bg-white d-flex justify-content-around align-items-center'>
                <h1 className='m-0 fw-bold'>Trang Chủ</h1>
            </div>

            <div className='p-4'>
                <div className="statistical d-flex justify-content-between align-items-center text-center">
                    <div className="count resident-count bg-white">
                        <h2 className='d-flex justify-content-center align-items-center text-secondary'>
                            <FaPeopleGroup className='fs-1 me-3' />Cư Dân
                        </h2>
                        <div className='d-flex justify-content-center align-items-center'>
                            <span className='h4 text-primary text-dark fs-1'>
                                {loading ? 'Đang tải...' : residents?.page?.totalElements || 0}
                            </span>
                        </div>
                    </div>
                    <div className="count apartment-count bg-white">
                        <h2 className='d-flex justify-content-center align-items-center text-secondary'>
                            <MdApartment className='fs-1 me-3' />Căn Hộ
                        </h2>
                        <div className='d-flex justify-content-center align-items-center'>
                            <span className='h4 text-primary text-dark fs-1'>
                                {loading ? 'Đang tải...' : apartments?.page?.totalElements || 0}
                            </span>
                        </div>
                    </div>
                    <div className="count vehicle-count bg-white">
                        <h2 className='d-flex justify-content-center align-items-center text-secondary'>
                            <MdEmojiTransportation className='fs-1 me-3' />Phương Tiện
                        </h2>
                        <div className='d-flex justify-content-center align-items-center'>
                            <span className='h4 text-primary text-dark fs-1'>
                                {loading ? 'Đang tải...' : vehicles?.page?.totalElements || 0}
                            </span>
                        </div>
                    </div>
                    <div className="count staff-count bg-white">
                        <h2 className='d-flex justify-content-center align-items-center text-secondary'>
                            <GrUserWorker className='fs-2 me-3' /> Nhân Viên
                        </h2>
                        <div className='d-flex justify-content-center align-items-center'>
                            <span className='h4 text-primary text-dark fs-1'>
                                {loading ? 'Đang tải...' : staffs?.page?.totalElements || 0}
                            </span>
                        </div>
                    </div>
                </div>
            </div>


            <div className="charts">
                <div className='d-flex justify-content-between align-items-center'>
                    <div className="pie-charts w-25 bg-white ms-4 text-center">
                        <PieCharts />
                    </div>
                    <div className="pie-charts w-75 bg-white mx-4 text-center">
                        <BarCharts />
                    </div>
                </div>

                <Row>
                    <Col>
                        <div className="charts bg-white m-4">
                            <LineCharts />
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default Home;
