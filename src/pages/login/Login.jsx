import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../Form.css';
import { Form, Container, Button, Row, Col } from 'react-bootstrap';
import { ReactNotifications, Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
// import 'animate.css/animate.min.css'; // Cần cho hiệu ứng của thông báo

const Login = () => {
  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8181/api/account/login', {
        
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        // If login fails, show error notification
        Store.addNotification({
          title: "Đăng nhập thất bại!",
          message: "Tài khoản đăng nhập không tồn tại.",
          type: "danger", // red color for error
          insert: "top",
          container: "top-left",
          dismiss: {
            duration: 3000, // Auto-dismiss after 3 seconds
            onScreen: true
          }
        });

      } else if (data.role !== "ADMIN"){
        Store.addNotification({
          title: "Đăng nhập thất bại!",
          message: "Bạn không có quyền truy cập!",
          type: "warning", // green color for success
          insert: "top",
          container: "top-left",
          dismiss: {
            duration: 2000, // Auto-dismiss after 4 seconds
            onScreen: true
          }
        });

        console.log(data.role)
      }
      
      else {
        // Successful login: Save the token to localStorage
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('role', data.role);

        // Success notification
        Store.addNotification({
          title: "Đăng nhập thành công!",
          message: "Tự động chuyển trang trong 1s",
          type: "success", // green color for success
          insert: "top",
          container: "top-left",
          dismiss: {
            duration: 1000, // Auto-dismiss after 4 seconds
            onScreen: true
          }
        });

        setTimeout(() => {
          navigate('/admin');
        }, 1000);
      }
    } catch (error) {
      console.error("Error during login:", error);
      // Notification for network/server error
      Store.addNotification({
        title: "Lỗi server!",
        message: "Không thể kết nối tới server. Vui lòng thử lại sau!.",
        type: "danger",
        insert: "top",
        container: "top-left",
        dismiss: {
          duration: 5000,
          onScreen: true
        }
      });
    }
  };


  return (
    <div className="signin">
      <ReactNotifications />
      <Container className='form-container d-flex justify-content-center align-items-center' style={{ minHeight: '100vh' }}>
        <Row className="w-100">
          <Col xs={12} sm={10} md={8} lg={6} className="mx-auto">
            <div className="form-control p-4">
              <h2 className='text-center'>Login</h2>
              <Form onSubmit={handleLogin}>
                <Form.Group className='mb-3'>
                  <Form.Label className='fw-bold'>Email</Form.Label>
                  <Form.Control
                    type='text'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    required />
                </Form.Group>

                <Form.Group className='mb-4'>
                  <Form.Label className='fw-bold'>Password</Form.Label>
                  <Form.Control
                    type='password'
                    name='password'
                    value={formData.password}
                    onChange={handleChange}
                    required />
                </Form.Group>

                <Form.Group className='mb-3 text-center'>
                  <Button className='w-50' type='submit'>Login</Button>
                </Form.Group>

                <Form.Group className='mb-3 text-center'>
                  <span className='ms-3'>Forgot password? <a href="/reset">Reset Password</a> <a href="/signup">Sign Up</a></span>
                </Form.Group>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
