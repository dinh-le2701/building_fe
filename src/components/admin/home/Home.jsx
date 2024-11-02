import React, { useEffect, useState } from 'react';
import './Home.css';
import  LineCharts  from '../charts/LineCharts.jsx';

const Home = () => {
    const [apartments, setApartments] = useState([]);
    const [loading, setLoading] = useState(true);

    const getApartments = async () => {
        try {
            const response = await fetch('http://localhost:8888/api/apartments');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setApartments(data);
            setLoading(false);
            // toast.success('Dữ liệu đã được tải thành công!');
        } catch (err) {
            setLoading(false);
            // toast.error('Không thể tải dữ liệu, vui lòng thử lại sau.');
            console.error("Error fetching apartments:", err);
        }
    };

    useEffect(() => {
        getApartments();
    }, []);

    return (
        <div className='home'>
            {/* <ToastContainer /> */}
            <div className='header p-3 w-100 bg-white d-flex justify-content-between align-items-center'>
                <h2 className='m-0'>Trang Chủ</h2>
            </div>

            <div className='p-4'>
                <div className="statistical d-flex justify-content-between align-items-center text-center">
                    <div className="count resident-count bg-light">
                        <h2>Resident</h2>
                        <span className='h4 text-warning'></span>
                    </div>
                    <div className="count apartment-count bg-light">
                        <h2>Apartment</h2>
                        <span className='h4 text-warning'>{loading ? 'Đang tải...' : apartments.total || 0}</span>
                    </div>
                    <div className="count vehicle-count bg-light">
                        <h3>Vehicle</h3>
                        <span className='h4 text-warning'>3</span>
                    </div>
                    <div className="count vehicle-count bg-light">
                        <h3>Cont</h3>
                        <span className='h4 text-warning'>3</span>
                    </div>
                </div>
            </div>

            <div className="charts bg-light mx-4 pt-5">
                <LineCharts />
            </div>
        </div>
    );
};

export default Home;
