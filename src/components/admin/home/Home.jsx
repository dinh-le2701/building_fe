/* eslint-disable no-unused-vars */
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
import { FaFireExtinguisher } from "react-icons/fa";
import { MdFeedback } from "react-icons/md";
import FeedbackChart from '../charts/FeedbackChart.jsx';
import TotalChart from '../charts/TotalChart.jsx';




const Home = () => {
    const [residents, setResidents] = useState([]);
    const [apartments, setApartments] = useState([]);
    const [staffs, setStaffs] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [equipment, setEquipments] = useState([])
    const [feedback, setFeedback] = useState([])
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
            console.error("Error fetching staff:", err);
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
            console.error("Error fetching vehicles:", err);
        }
    };

    const getEquipments = async () => {
        try {
            const response = await fetch('http://localhost:8181/api/fire-safety-equipment');
            if (!response.ok) {
                throw new setError(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setEquipments(data);
            console.log(data.page.totalElements + " equipments")
            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.error("Error fetching vehicles:", err);
        }
    };

    const getFeedbacks = async () => {
        try {
            const response = await fetch('http://localhost:8181/api/v1/feedback');
            if (!response.ok) {
                throw new setError(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setFeedback(data);
            console.log(data.page.totalElements + " feedbacks")
            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.error("Error fetching feedback:", err);
        }
    };

    useEffect(() => {
        getApartments();
        getResidents();
        getStaffs();
        getVehicles();
        getEquipments();
        getFeedbacks();
    }, []);

    return (
        <div className='home'>
            {/* <ToastContainer /> */}
            <div className='header p-3 w-100 bg-white d-flex justify-content-around align-items-center'>
                <h1 className='m-0 fw-bold'>Trang Chủ</h1>
            </div>

            <div className="my-5">
                <div className='p-4'>
                    <div className="statistical d-flex justify-content-between align-items-center text-center">
                        <div className="count resident-count">
                            <h2 className='d-flex justify-content-center align-items-center'>
                                <FaPeopleGroup className='icon-text fs-1 me-3' />Cư Dân
                            </h2>
                            <div className='d-flex justify-content-center align-items-center'>
                                <span className='h4 fs-1'>
                                    {loading ? 'Đang tải...' : residents?.page?.totalElements || 0}
                                </span>
                            </div>
                        </div>
                        <div className="count apartment-count">
                            <h2 className='d-flex justify-content-center align-items-center'>
                                <MdApartment className='icon-text fs-1 me-3' />Căn Hộ
                            </h2>
                            <div className='d-flex justify-content-center align-items-center'>
                                <span className='h4 fs-1'>
                                    {loading ? 'Đang tải...' : apartments?.page?.totalElements || 0}
                                </span>
                            </div>
                        </div>
                        <div className="count vehicle-count">
                            <h2 className='d-flex justify-content-center align-items-center'>
                                <MdEmojiTransportation className='icon-text fs-1 me-3' />Phương Tiện
                            </h2>
                            <div className='d-flex justify-content-center align-items-center'>
                                <span className='h4 fs-1'>
                                    {loading ? 'Đang tải...' : vehicles?.page?.totalElements || 0}
                                </span>
                            </div>
                        </div>
                        <div className="count staff-count">
                            <h2 className='d-flex justify-content-center align-items-center'>
                                <GrUserWorker className='icon-text fs-2 me-3' /> Nhân Viên
                            </h2>
                            <div className='d-flex justify-content-center align-items-center'>
                                <span className='h4 fs-1'>
                                    {loading ? 'Đang tải...' : staffs?.page?.totalElements || 0}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-4">
                    <div className="statistical d-flex justify-content-between align-items-center text-center">
                        <div className="w-50 count staff-count d-flex justify-content-between align-items-center me-3">
                            <h2 className='d-flex justify-content-center align-items-center'>
                                <FaFireExtinguisher className='icon-text fs-2 me-3' /> Thiết Bị PCCC
                            </h2>
                            <div className='d-flex justify-content-center align-items-center '>
                                <span className='h4 fs-1'>
                                    {loading ? 'Đang tải...' : equipment?.page?.totalElements || 0}
                                </span>
                            </div>
                            <PieCharts />
                        </div>

                        <div className="w-50 count staff-count d-flex justify-content-between align-items-center ms-3">
                            <h2 className='d-flex justify-content-center align-items-center'>
                                <MdFeedback className='icon-text fs-2 me-3' /> Phản Hồi
                            </h2>
                            <div className='d-flex justify-content-center align-items-center '>
                                <span className='h4 fs-1'>
                                    {loading ? 'Đang tải...' : feedback?.page?.totalElements || 0}
                                </span>
                            </div>
                            <FeedbackChart />
                        </div>
                    </div>

                </div>
            </div>


            {/* <div className="charts">
                <Row>
                    <Col>
                        <div className="charts bg-white m-4 py-5 d-flex justify-content-between align-items-center">
                            <LineCharts/>
                            <TotalChart/>
                        </div>
                    </Col>
                </Row>
            </div> */}
        </div>
    );
};

export default Home;
