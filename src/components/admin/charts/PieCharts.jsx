import React, { useEffect, useState } from 'react'
import { PieChart, Pie, Tooltip, Cell } from 'recharts';



const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const PieCharts = () => {
    const [apartment, setApartments] = useState([])
    const [data, setData] = useState([])
    const [error, setError] = useState([])
    const [loading, setLoading] = useState([])

    const data01 = [
        { name: 'Group B', value: data }
    ];

    const data02 = [
        { name: 'Số căn phòng trống', value: 100 },
        { name: 'Số căn phòng đang sử dụng', value: 100 },
        { name: 'Số căn phòng đang sửa chữa', value: 100 },
    ];

    const fetchApartments = async (page, size) => {
        try {
            const response = await fetch(`http://localhost:8181/api/v1/apartment`); // Thực hiện lấy danh sách căn hộ
            if (!response.ok) {

                throw new Error('Failed to fetch apartment data');
            }
            const data = await response.json();
            setApartments(data.content); // Lưu dữ liệu căn hộ
            setData(data.page.totalElements)
            console.log("Data: ", data.page.totalElements)
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApartments();
    }, []);
    return (
        <div>
            <PieChart width={300} height={300} className=' d-flex justify-content-between'>
                <Pie data={data01} dataKey="value" cx="50%" cy="50%" innerRadius={90} />
            7<Pie data={data02} dataKey="value" cx="50%" cy="50%" innerRadius={50} outerRadius={70} fill="#42cbf5" label />
                <Tooltip />
            </PieChart>
        </div>
    )
}

export default PieCharts
