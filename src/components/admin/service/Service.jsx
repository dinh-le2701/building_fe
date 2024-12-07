import React from 'react';
import { Button, Table, Form } from 'react-bootstrap';
import './Service.css'

const Service = () => {



    return (
        <div className='service'>
            <div className='header p-3 w-100 bg-white d-flex justify-content-between align-items-center'>
                <h3 className='m-0'>Chi phí dịch vụ</h3>
            </div>

            <div className="table-content bg-white m-3 p-4 text-center">
                <Table hover striped bordered className="text-center">
                    <thead>
                        <tr>
                            <th className='fs-2' colSpan={3}>Bảng Giá Bán Lẻ Điện Cho Sinh Hoạt</th>
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
                            <td>1.893</td>
                        </tr>
                        <tr>
                            <th>Bậc 2</th>
                            <td>Từ 51 - 100 kWh</td>
                            <td>1.956</td>
                        </tr>
                        <tr>
                            <th>Bậc 3</th>
                            <td>Từ 101 - 200 kWh</td>
                            <td>2.271</td>
                        </tr>
                        <tr>
                            <th>Bậc 4</th>
                            <td>Từ 201 - 300 kWh</td>
                            <td>2.860</td>
                        </tr>
                        <tr>
                            <th>Bậc 5</th>
                            <td>Từ 301 - 400 kWh</td>
                            <td>3.197</td>
                        </tr>
                        <tr>
                            <th>Bậc 6</th>
                            <td>Từ 401 trở lên kWh</td>
                            <td>3.302</td>
                        </tr>

                        <tr class="text-center">
                            <th>Phí quản Lý</th>
                            <td colspan="3">300000</td>
                        </tr>

                        <tr class="text-center">
                            <th>Tiền nước</th>
                            <td colspan="3">100000</td>
                        </tr>

                        <tr class="text-center">
                            <th rowSpan={2} >Tiền Phương Tiện</th>
                            <th>Xe Máy</th>
                            <th>Xe Ô tô</th>
                        </tr>
                        <tr class="text-center">
                            <td>80000</td>
                            <td>120000</td>
                        </tr>
                    </tbody>
                </Table>

                <Table hover striped bordered className="text-center">
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

            </div>
            <div className='p-3 bg-white m-3'>
                <Form>
                    <Form.Group className='mb-2'>
                        <Form.Label>Nhập số điện tiêu thụ:</Form.Label>
                        <div className="d-flex justify-content-between align-items-center">
                            <Form.Control className='me-4'></Form.Control>
                            <Button>Tính</Button>
                        </div>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Tổng:</Form.Label>
                        <Form.Control type='span'></Form.Control>
                    </Form.Group>
                </Form>
            </div>
        </div>
    )
}

export default Service
