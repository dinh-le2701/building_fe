/* eslint-disable no-const-assign */
import React, { useState } from 'react';
import { Button, Table, Form, Pagination } from 'react-bootstrap';
import 'react-notifications-component/dist/theme.css';

const Notification = () => {
  // send email
  const [mail, setMail] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages] = useState(0);
  const [size, setSize] = useState(5); // Số mục trên mỗi trang, mặc định là 5

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Xử lý khi người dùng thay đổi số lượng mục hiển thị trên mỗi trang
  const handlePageSizeChange = (event) => {
    setSize(Number(event.target.value)); // Cập nhật pageSize
    setCurrentPage(0); // Reset về trang đầu tiên
  };

  const [newMail, setNewMail] = useState({
    to: "",
    subject: "",
    text: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMail((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendEmail(newMail);
  };
  const nullMail = () => {
    setMail = ""
  }
  const sendEmail = async (emailData) => {
    try {
      // Chuyển đổi đối tượng emailData thành chuỗi x-www-form-urlencoded
      const urlEncodedData = new URLSearchParams();
      urlEncodedData.append('to', emailData.to);
      urlEncodedData.append('subject', emailData.subject);
      urlEncodedData.append('text', emailData.text);

      const response = await fetch('http://localhost:8902/api/mail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: urlEncodedData.toString(),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Email sent successfully', data);
        setMail([...mail, data]); // Add the new email to the list
        setNewMail({
          to: "",
          subject: "",
          text: ""
        });
        nullMail();
      } else {
        console.error('Failed to send email:', data.message);
        nullMail();
      }
    } catch (error) {
      console.error('Error:', error);
      nullMail();
    }
  };

  return (
    <div className='notifications'>
      <div className='header p-3 w-100 bg-white d-flex justify-content-between align-items-center'>
        <h3 className='m-0'>Thông Báo</h3>
      </div>

      <div className="form p-3 bg-white m-3">
        <Form onSubmit={handleSubmit}>
          <Form.Group className='mb-3'>
            <Form.Label className='h4'>Người nhận (Email)</Form.Label>
            <Form.Control
              type='email'
              name="to"
              value={newMail.to}
              onChange={handleChange}
              placeholder="Nhập email người nhận"
              required
            />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label className='h4'>Tiêu Đề</Form.Label>
            <Form.Control
              type='text'
              name="subject"
              value={newMail.subject}
              onChange={handleChange}
              placeholder="Nhập tiêu đề ở đây"
              required
            />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label className='h4'>Nội Dung Thông Báo</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              name="text"
              value={newMail.text}
              onChange={handleChange}
              placeholder="Nhập thông báo ở đây"
              required
            />
          </Form.Group>

          <Form.Group>
            <Button type="submit" className='bg-primary text-white'>
              Gửi
            </Button>
          </Form.Group>
        </Form>
      </div>

      <div className="table-content bg-white m-3 p-3">
        <div className="func-table d-flex justify-content-between align-items-center py-3">
          <div className="select-group">
            Hiển thị
            <select name="" id="" className="mx-2" value={size} onChange={handlePageSizeChange}>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="50">50</option>
            </select>
            mục
          </div>
        </div>

        <Table striped hover bordered className='m-0 w-100 text-center'>
          <thead>
            <tr>
              <th>Chọn</th>
              <th>Tên Căn Hộ</th>
              <th>Tài Khoản</th>
              <th>Trạng Thái</th>
              <th></th>
            </tr>
          </thead>
          <tbody>

            <tr >
              <td>
                <Form.Check />
              </td>
              <td>1</td>
              <td>2</td>
              <td>Đã gửi</td>
              <td></td>
            </tr>
          </tbody>
        </Table>
        <div className="mt-3 pagination d-flex justify-content-center align-items-center">
                    <Pagination className=''>
                        <Pagination.First onClick={() => handlePageChange(0)} />
                        <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} />
                        <Pagination.Item>{currentPage + 1} / {totalPages}</Pagination.Item>
                        {/* <Pagination.Item>{totalPages}</Pagination.Item> */}
                        <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
                        <Pagination.Last onClick={() => handlePageChange(totalPages - 1)} />
                    </Pagination>
                </div>
      </div>
    </div>
  );
};

export default Notification;
