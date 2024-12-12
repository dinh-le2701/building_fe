import React, { PureComponent } from 'react';
import { Container } from 'react-bootstrap';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class Example extends PureComponent {
    state = {
        data: [],  // Store data from API
    };

    componentDidMount() {
        this.fetchData();
    }

    // Fetch data from the API
    fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8181/api/v1/utility-usage');
            const result = await response.json();

            // Map the result into a format suitable for recharts
            const chartData = result.map(item => ({
                name: item.create_date,  // Using 'create_date' for X-axis labels
                "Tổng Điện Sử Dụng": item.electricityTotalUsage,  // Total electricity usage
                "Tổng Nước Sử Dụng": item.waterTotalUsage,  // Total water usage
                "Tổng Tiền": item.totalPrice,  // Total price (e.g., total cost)
            }));

            this.setState({ data: chartData });
        } catch (error) {
            this.showErrorToast('Lỗi khi tải dữ liệu biểu đồ.');
        }
    };

    showErrorToast = (message) => {
        toast.error(message, {
            position: toast.POSITION.TOP_RIGHT,
        });
    };

    render() {
        const { data } = this.state;

        return (
            <Container>
                <ToastContainer />
                <h1 className='text-center text-primary mb-5'>Thống Kê Tài Nguyên Sử Dụng</h1>
                {/* <LineChart
                    className='mx-auto'
                    title='Chi phí'
                    width={900}
                    height={500}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid vertical={true} horizontal={false} strokeDasharray="10" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line connectNulls type="monotone" dataKey="uv" stroke="#938569" fill="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="Tổng Tiền" stroke="#cf5820" activeDot={{ r: 8 }} />
                </LineChart> */}

                <LineChart
                    className='mx-auto'
                    title='Chi phí'
                    width={900}
                    height={500}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid vertical={true} horizontal={false} strokeDasharray="10" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line connectNulls type="monotone" dataKey="uv" stroke="#938569" fill="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="Tổng Điện Sử Dụng" stroke="#f5ac67" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="Tổng Nước Sử Dụng" stroke="#cf5820" activeDot={{ r: 8 }} />
                </LineChart>
            </Container>
        );
    }
}
