/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from 'react';
import { Table, Form } from 'react-bootstrap'
import { useParams } from 'react-router-dom'; // Hook để lấy params từ URL
import { Link } from 'react-router-dom'
import fetchURL from '../../../api/AxiosInstance';

const StaffDetail = () => {
  const { id } = useParams(); // Lấy id từ URL
  const [staffs, setStaffs] = useState(null);

  useEffect(() => {
    fetchResidentDetails();
  }, [id]);

  const fetchResidentDetails = async () => {
    try {
      const response = await fetchURL(`http://localhost:8907/api/v1/staff/${id}`);
      setStaffs(response.data);
      console.log(response.data)
    } catch (err) {
      console.error(err.message);
      console.log(staffs)
    }
  };

  if (!staffs) {
    return <div>Loading...</div>;
  }

  const handleFileUpload = async (event) => {
    const file = event.target.files[0]; // Lấy file đã chọn
  
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
  
      try {
        // Gửi request để upload ảnh
        const response = await fetchURL.post(`http://localhost:8907/api/v1/upload/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        // Cập nhật lại thông tin nhân viên với URL mới
        if (response.data && response.data.staff_img) {
          setStaffs((prevStaff) => ({
            ...prevStaff,
            staff_img: response.data.staff_img,
          }));
          alert("Cập nhật ảnh thành công!");
        }
      } catch (error) {
        console.error('Upload ảnh thất bại:', error);
        alert('Có lỗi xảy ra khi upload ảnh!');
      }
    }
    fetchResidentDetails();
  };
  

  return (
    <div className='resident-details'
      style={{ height: '92vh' }}>
      <div className='header p-3 w-100 bg-white d-flex justify-content-between align-items-center'>
        <h3 className='m-0'>Chi Tiết Nhân Viên</h3>
        <Link className='pe-3' to={"/admin/staff"}>
          <b>Trở về</b>
        </Link>
      </div>

      <div className='info bg-white m-3 p-5 d-flex justify-content-around '>
        <div className="img">
          <Form.Control
            width={"100px"}
            height={"100px"}
            type="file"
            onChange={handleFileUpload}
          />

          {/* <Form.Control width={"100px"} height={"100px"} type="file" src="https://inkythuatso.com/uploads/thumbnails/800/2023/03/9-anh-dai-dien-trang-inkythuatso-03-15-27-03.jpg">

          </Form.Control> */}
          <img
            alt="Sample"
            src={staffs.staff_img}
            width={"300px"}
            height={"400px"}
          />
        </div>

        <div className="personal-info w-50">
          <Table className='w-100'>
            <tbody>
              <tr>
                <th>Họ tên</th>
                <td>{staffs.staff_name}</td>
              </tr>
              <tr>
                <th>Vị trí</th>
                <td>{staffs.staff_position}</td>
              </tr>
              <tr>
                <th>Số điện thoại: </th>
                <td>{staffs.phone}</td>
              </tr>
              <tr>
                <th>Email:</th>
                <td>{staffs.email}</td>
              </tr>
              <tr>
                <th>Ngày sinh:</th>
                <td>{staffs.birthday}</td>
              </tr>
              <tr>
                <th>Số giờ làm việc:</th>
                <td>{staffs.work_time}</td>
              </tr>
              <tr>
                <th>Trạng thái:</th>
                <td>{staffs.status}</td>
              </tr>
              <tr>
                <th>Ngày bắt đầu:</th>
                <td>{staffs.create_date}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>



    </div>
  );
};

export default StaffDetail;
