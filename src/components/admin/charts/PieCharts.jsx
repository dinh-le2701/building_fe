/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { PieChart, Pie, Tooltip } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const PieCharts = () => {
    const [data, setData] = useState([])
    const [error, setError] = useState([])
    const [loading, setLoading] = useState([])

    const fetchEquipments = async () => {
        try {
            setLoading(true); // Bắt đầu loading
            const response = await fetch(`http://localhost:8181/api/fire-safety-equipment/status-summary`);
            if (!response.ok) {
                throw new Error('Failed to fetch apartment data');
            }

            const data = await response.json();

            // Giả sử API trả về các trường: vacantCount, inUseCount, repairCount
            const formattedData = [
                { name: 'Thiết bị đang hoạt động', value: data.ACTIVE },
                { name: 'Thiết bị đang bảo trì', value: data.MAINTENANCE },
                { name: 'Thiết bị không hoạt động', value: data.INACTIVE },
            ];

            setData(formattedData); // Lưu dữ liệu vào state `data`
            console.log(formattedData); // Kiểm tra dữ liệu trên console
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false); // Kết thúc loading
        }
    };


    useEffect(() => {
        fetchEquipments();
    }, []);
    return (
        <div>
            <PieChart width={300} height={300}>
                <Pie
                    dataKey="value"
                    startAngle={180}
                    endAngle={0}
                    data={data}
                    cx="50%"
                    cy="65%"
                    outerRadius={80}
                    fill="#64bfd2"
                    label
                />
                <Tooltip />
            </PieChart>
            {/* <PieChart width={300} height={300} className=' d-flex justify-content-between'>
                <Pie data={data} dataKey="value" cx="50%" cy="50%" innerRadius={50} outerRadius={70} fill="#42cbf5" label />
                <Tooltip />
            </PieChart> */}
        </div>
    )
}

export default PieCharts
