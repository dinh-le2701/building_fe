import React, { useEffect, useState } from 'react';
import { Button, Table, Form, Container } from 'react-bootstrap';
import { ReactNotifications, Store } from 'react-notifications-component';

import './Service.css'

const Service = () => {
    const [selectedApartmentName, setSelectedApartmentName] = useState("");
    const [latestUtilityUsage, setLatestUtilityUsage] = useState(null);
    const [selectedApartmentId, setSelectedApartmentId] = useState("");
    const [apartments, setApartments] = useState([]);
    const [electricityNew, setElectricityNew] = useState('');
    const [waterNew, setWaterNew] = useState('');

    const fetchApartments = async () => {
        try {
            const response = await fetch("http://localhost:8181/api/v1/apartment");
            const data = await response.json();
            setApartments(data.content); // Xử lý nếu data.content tồn tại
            console.log(data.content); // Log data sau khi lấy thông tin căn hộ
        } catch (error) {
            console.error("Error fetching apartments:", error);
        }
    };



    useEffect(() => {
        fetchApartments();
    }, []); // Chỉ gọi fetchApartments khi component mount

    // const handleApartmentChange = (e) => {
    //     const apartmentName = e.target.value;
    //     setSelectedApartmentName(apartmentName); // Cập nhật tên căn hộ được chọn
    //     console.log("Căn hộ đã chọn:", apartmentName); // Log tên căn hộ được chọn
    // };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedApartmentName || !electricityNew || !waterNew) {
            alert('Vui lòng điền đầy đủ thông tin.');
            return;
        }

        const apartmentId = selectedApartmentName;  // Assume selectedApartmentName contains the apartment ID

        try {
            const response = await fetch(`http://localhost:8181/api/v1/utility-usage/${apartmentId}/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    electricity_new: electricityNew,
                    water_new: waterNew,
                }),
            });

            if (!response.ok) {
                throw new Error('Lỗi khi tạo hoá đơn');
            }

            const data = await response.json();
            console.log('Response:', data);
            Store.addNotification({
                title: "Đã Gửi Thành Công!",
                message: "Đã tính toán chi phí dịch vụ và gửi thông báo về email cho căn hộ.",
                type: "success", // green color for success
                insert: "top",
                container: "top-left",
                dismiss: {
                    duration: 4000, // Auto-dismiss after 4 seconds
                    onScreen: true
                }
            });
        } catch (error) {
            console.error('Error:', error);
            Store.addNotification({
                title: "Gửi Thất Bại!",
                message: "Tính toán chi phí dịch vụ và gửi thông báo về cho căn hộ thất bại.",
                type: "warning", // green color for success
                insert: "top",
                container: "top-left",
                dismiss: {
                    duration: 4000, // Auto-dismiss after 4 seconds
                    onScreen: true
                }
            });
        }
    };

    const handleApartmentChange = async (apartmentId) => {
        setSelectedApartmentId(apartmentId);

        if (apartmentId) {
            try {
                const response = await fetch(`http://localhost:8181/api/v1/utility-usage/latest/${apartmentId}`);
                if (response.ok) {
                    const data = await response.json();
                    setLatestUtilityUsage(data); // Cập nhật bản ghi gần nhất
                } else {
                    console.error("Failed to fetch utility usage");
                    setLatestUtilityUsage(null); // Xóa dữ liệu nếu không tìm thấy
                }
            } catch (error) {
                console.error("Error fetching utility usage:", error);
                setLatestUtilityUsage(null);
            }
        }
    };

    return (
        <div className='service'>
            <ReactNotifications />

            <div className='header p-3 w-100 bg-white d-flex justify-content-between align-items-center'>
                <h3 className='m-0'>Chi phí dịch vụ</h3>
            </div>

            <div className="table-content bg-white m-3 p-4 text-center">
                <Table hover striped className="text-center">
                    <thead>
                        <tr>
                            <th className='fs-2' colSpan={3}>Bảng Giá Điện Cho Sinh Hoạt</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th className='h4'>Bậc</th>
                            <th className='h4'>Số điện / h (kWh)</th>
                            <th className='h4'>Giá điện (đồng / kWh)</th>
                        </tr>
                        <tr>
                            <th>Bậc 1</th>
                            <td>Từ 0 - 50 kWh</td>
                            <td>1.893 đồng / kWh</td>
                        </tr>
                        <tr>
                            <th>Bậc 2</th>
                            <td>Từ 51 - 100 kWh</td>
                            <td>1.956 đồng / kWh</td>
                        </tr>
                        <tr>
                            <th>Bậc 3</th>
                            <td>Từ 101 - 200 kWh</td>
                            <td>2.271 đồng / kWh</td>
                        </tr>
                        <tr>
                            <th>Bậc 4</th>
                            <td>Từ 201 - 300 kWh</td>
                            <td>2.860 đồng / kWh</td>
                        </tr>
                        <tr>
                            <th>Bậc 5</th>
                            <td>Từ 301 - 400 kWh</td>
                            <td>3.197 đồng / kWh</td>
                        </tr>
                        <tr>
                            <th>Bậc 6</th>
                            <td>Từ 401 trở lên kWh</td>
                            <td>3.302 đồng / kWh</td>
                        </tr>
                    </tbody>
                </Table>

                <Table hover striped className="table-content text-center">
                    <thead>
                        <tr><th className='fs-2' colSpan={3}>Bảng Giá Nước Sạch Sinh Hoạt</th></tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th className='h4'>Mức</th>
                            <th className='h4 w-50'>Số m<sup>3</sup> tiêu thụ (m<sup>3</sup>)</th>
                            <th className='h4 w-50'>Giá nước (đồng / m<sup>3</sup>)</th>
                        </tr>
                        <tr>
                            <td>Mức 1</td>
                            <td>0 - 10 m<sup>3</sup> đầu tiên</td>
                            <td>4.500 đồng / m<sup>3</sup></td>
                        </tr>
                        <tr>
                            <td>Mức 2</td>
                            <td>trên mức 10 - 20 m<sup>3</sup></td>
                            <td>5.600 đồng / m<sup>3</sup></td>
                        </tr>
                        <tr>
                            <td>Mức 3</td>
                            <td>trên mức 20 - 30 m<sup>3</sup></td>
                            <td>6.700 đồng / m<sup>3</sup></td>
                        </tr>
                        <tr>
                            <td>Mức 4</td>
                            <td> trên mức 30 m<sup>3</sup></td>
                            <td>9.200 đồng / m<sup>3</sup></td>
                        </tr>
                    </tbody>
                </Table>

                <Table hover striped className="text-center">
                    <thead>
                        <tr><th className='fs-2' colSpan={3}>Các Phí Khác</th></tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>Phí Vệ Sinh</th>
                            <td>100.000 đồng</td>
                        </tr>
                        <tr>
                            <th>Phí Quản Lý</th>
                            <td>150.000 đồng</td>
                        </tr>

                        <tr>
                            <th colSpan={2}>Phí Phương Tiện</th>
                        </tr>
                        <tr>
                            <th>Xe Máy</th>
                            <th>Xe Hơi</th>
                        </tr>
                        <tr>
                            <td>80000 đồng</td>
                            <td>100000 đồng</td>
                        </tr>
                    </tbody>
                </Table>

            </div>

            <div>
                <Container className="table-content bg-white py-3">
                    <div>
                        {latestUtilityUsage ? (
                            <div className="mt-4 container">
                                <h5 className="text-primary">Thông Tin Sử Dụng Gần Nhất</h5>
                                <table className="table table-bordered table-hover">
                                    <thead className="thead-light">
                                        <tr>
                                            <th>#</th>
                                            <th>Thông Tin</th>
                                            <th>Giá Trị</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>Ngày Tạo</td>
                                            <td>{latestUtilityUsage.createDate}</td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>Ngày Cập Nhật</td>
                                            <td>{latestUtilityUsage.updateDate}</td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>Điện (Cũ - Mới)</td>
                                            <td>{latestUtilityUsage.electricity_old} - {latestUtilityUsage.electricity_new}</td>
                                        </tr>
                                        <tr>
                                            <td>4</td>
                                            <td>Tổng Sử Dụng Điện</td>
                                            <td>{latestUtilityUsage.electricityTotalUsage} kWh</td>
                                        </tr>
                                        <tr>
                                            <td>5</td>
                                            <td>Tổng Tiền Điện</td>
                                            <td>{latestUtilityUsage.electricTotalPrice} VND</td>
                                        </tr>
                                        <tr>
                                            <td>6</td>
                                            <td>Nước (Cũ - Mới)</td>
                                            <td>{latestUtilityUsage.water_old} - {latestUtilityUsage.water_new}</td>
                                        </tr>
                                        <tr>
                                            <td>7</td>
                                            <td>Tổng Sử Dụng Nước</td>
                                            <td>{latestUtilityUsage.waterTotalUsage} m³</td>
                                        </tr>
                                        <tr>
                                            <td>8</td>
                                            <td>Tổng Tiền Nước</td>
                                            <td>{latestUtilityUsage.waterTotal_price} VND</td>
                                        </tr>
                                        <tr>
                                            <td>9</td>
                                            <td>Phí Vệ Sinh</td>
                                            <td>{latestUtilityUsage.hygiene_price} VND</td>
                                        </tr>
                                        <tr>
                                            <td>10</td>
                                            <td>Phí Quản Lý</td>
                                            <td>{latestUtilityUsage.manage_price} VND</td>
                                        </tr>
                                        <tr>
                                            <td>11</td>
                                            <td>Tổng Lượng Điện - Nước Sử Dụng</td>
                                            <td>{latestUtilityUsage.totalUsage} VND</td>
                                        </tr>
                                        <tr>
                                            <td>12</td>
                                            <td>Tổng Tiền Thanh Toán</td>
                                            <td>{latestUtilityUsage.totalPrice} VND</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="mt-7 text-center">Không có dữ liệu nào để hiển thị.</div>
                        )}

                    </div>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="exampleForm.SelectCustom" className=" mb-3 w-75">
                            {/* Optional */}
                        </Form.Group>
                        <Form.Group className="mb-2 container w-75">
                            <Form.Label>Chọn Phòng</Form.Label>
                            <Form.Select
                                className="form-select"
                                value={selectedApartmentId}
                                onChange={(e) => handleApartmentChange(e.target.value)}
                            >
                                <option value="">-- Chọn căn hộ --</option>
                                {apartments.map((apartment) => (
                                    <option key={apartment.apartment_id} value={apartment.apartment_id}>
                                        {apartment.apartment_name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-2 container w-75">
                            <Form.Label>Nhập Số Điện Mới: </Form.Label>
                            <Form.Control
                                type="number"
                                value={electricityNew}
                                onChange={(e) => setElectricityNew(e.target.value)}
                                placeholder="Nhập số điện mới"
                            />
                        </Form.Group>

                        <Form.Group className="mb-4 container w-75">
                            <Form.Label>Nhập Số Nước Mới: </Form.Label>
                            <Form.Control
                                type="number"
                                value={waterNew}
                                onChange={(e) => setWaterNew(e.target.value)}
                                placeholder="Nhập số nước mới"
                            />
                        </Form.Group>

                        <Form.Group className="mb-2 container w-50 text-center">
                            <Button className="bg-primary text-light w-75" type="submit">
                                Tính
                            </Button>
                        </Form.Group>
                    </Form>
                </Container>
            </div>

        </div>
    );
};

export default Service;
