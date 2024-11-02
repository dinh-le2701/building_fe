import React, { PureComponent } from 'react';
import { Container } from 'react-bootstrap';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const data = [
    {
        name: '',
        uv: 0,
        pv: 0,
        amt: 0,
    },
    {
        name: 'Tháng 1',
        uv: 4000,
        pv: 6670,
        amt: 2400,
    },
    {
        name: 'Tháng 2',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Tháng 3',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Tháng 4',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Tháng 5',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Tháng 6',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Tháng 7',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
    {
        name: 'Tháng 8',
        uv: 4590,
        pv: 3730,
        amt: 1270,
    },
    {
        name: 'Tháng 9',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
    {
        name: 'Tháng 10',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
    {
        name: 'Tháng 11',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
    {
        name: 'Tháng 12',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];

export default class Example extends PureComponent {
    static demoUrl = 'https://codesandbox.io/p/sandbox/line-chart-width-xaxis-padding-8v7952';
    componentDidMount() {
        // Giả lập thông báo lỗi
        this.simulateError();
    }

    simulateError = () => {
        try {
            // Thực hiện giả lập lỗi
            const isError = false; // Đổi sang true để thử nghiệm thông báo lỗi
            if (isError) {
                throw new Error('Đã xảy ra lỗi khi tải dữ liệu biểu đồ.');
            }
        } catch (error) {
            this.showErrorToast(error.message);
        }
    };

    showErrorToast = (message) => {
        toast.error(message, {
            position: toast.POSITION.TOP_RIGHT,
        });
    };
    render() {
        return (
            <Container>
                <ToastContainer />
                <h1 className='text-center text-danger'>Tổng Doanh Thu Hàng Tháng</h1>
                <LineChart
                title='Chi phí'
                    width={1300}
                    height={550}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="uv" stroke="#82ca9d" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="amt" stroke="#000" activeDot={{ r: 8 }} />
                </LineChart>
            </Container>
        );
    }
}
