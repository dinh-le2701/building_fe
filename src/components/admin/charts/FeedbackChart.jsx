/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Tooltip } from 'recharts';

const FeedbackChart = () => {
    const [data, setData] = useState([]); // Dữ liệu biểu đồ
    const [error, setError] = useState(null); // Xử lý lỗi
    const [loading, setLoading] = useState(false); // Trạng thái loading

    // Fetch dữ liệu từ API
    const fetchFeedbacks = async () => {
        try {
            setLoading(true); // Bắt đầu quá trình loading
            const response = await fetch(`http://localhost:8181/api/v1/feedback`); // API lấy feedback
            const dataFeedback = await response.json();
            console.log(dataFeedback)

            if (!response.ok) {
                throw new Error('Failed to fetch feedback data');
            }

            // Giả sử API trả về dữ liệu feedback với trường feedbackStatus
            const approvedCount = dataFeedback.content.filter(feedback => feedback.feedbackStatus === "ĐÃ XÉT DUYỆT").length;
            const pendingCount = dataFeedback.content.filter(feedback => feedback.feedbackStatus === "ĐANG CHỜ XEM XÉT").length;

            console.log("approvedCount: " + approvedCount + " pendingCount: " + pendingCount)
            // Cập nhật dữ liệu để hiển thị biểu đồ
            const formattedData = [
                { name: 'ĐÃ XÉT DUYỆT', value: approvedCount },
                { name: 'ĐANG CHỜ XEM XÉT', value: pendingCount },
            ];

            setData(formattedData); // Cập nhật dữ liệu biểu đồ
        } catch (error) {
            setError(error.message); // Cập nhật lỗi
        } finally {
            setLoading(false); // Kết thúc quá trình loading
        }
    };

    useEffect(() => {
        fetchFeedbacks(); // Gọi hàm lấy dữ liệu khi component mount
    }, []);

    return (
        <div>
            {loading && <p>Đang tải dữ liệu...</p>}
            {error && <p style={{ color: 'red' }}>Lỗi: {error}</p>}
            
            <PieChart width={300} height={300}>
                <Pie
                    dataKey="value"
                    startAngle={180}
                    endAngle={0}
                    data={data} // Sử dụng data đã được xử lý
                    cx="50%"
                    cy="65%"
                    outerRadius={80}
                    fill="#64bfd2"
                    label
                />
                <Tooltip />
            </PieChart>
        </div>
    );
};

export default FeedbackChart;
