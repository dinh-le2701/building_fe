
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { PieChart, Pie, Tooltip } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const TotalChart = () => {
    const [data, setData] = useState([])
    const [error, setError] = useState([])
    const [loading, setLoading] = useState([])

    const fetchTotalPrice = async () => {
        try {
            setLoading(true); // Bắt đầu loading
            const response = await fetch(`http://localhost:8181/api/v1/utility-usage/total-statistic`);
            if (!response.ok) {
                throw new Error('Failed to fetch apartment data');
            }

            const data = await response.json();

            // Giả sử API trả về các trường: vacantCount, inUseCount, repairCount
            const formattedData = [
                { name: 'Tổng Chi Phí Thu Về', value: data },
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
        fetchTotalPrice();
    }, []);
    return (
        <div>
            <h1>Tổng Tiền Thu Về</h1>
            <PieChart width={300} height={300}>
                <Pie
                    dataKey="value"
                    startAngle={360}
                    endAngle={0}
                    data={data}
                    cx="50%"
                    cy="65%"
                    outerRadius={100}
                    fill="#64bfd2"
                    label
                />
                <Tooltip />
            </PieChart>
            {/* <PieChart width={400} height={400}>
                <Pie
                    dataKey="value"
                    isAnimationActive={false}
                    data={data01}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                />
                <Pie dataKey="value" data={data02} cx={500} cy={200} innerRadius={40} outerRadius={80} fill="#82ca9d" />
                <Tooltip />
            </PieChart> */}

        </div>
    )
}

export default TotalChart
