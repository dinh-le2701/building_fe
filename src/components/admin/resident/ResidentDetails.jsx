/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Button, Table, Container, Modal, Form } from 'react-bootstrap'
import { useParams } from 'react-router-dom'; // Hook để lấy params từ URL
import { Link } from 'react-router-dom'
import fetchURL from '../../../api/AxiosInstance';

const ResidentDetails = () => {
  const { id } = useParams(); // Lấy id từ URL
  const [resident, setResident] = useState(null);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [vehicle, setVehicle] = useState([])
  const [newVehicle, setNewVehicle] = useState({
    vehicle_name: "",
    license_plate: "",
    vehicle_type: "",
    color: ""
  });

  const createVehicle = async (apartmentData) => {
    try {
      const response = await fetch(`http://localhost:8181/api/v1/resident/${id}/vehicles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apartmentData),
      });

      const data = await response.json();
      if (response.ok) {
        setVehicle([...vehicle, data]); // Thêm căn hộ mới vào danh sách
        handleClose(); // Đóng modal sau khi thêm thành công
        fetchResidentDetails(); // Cập nhật lại danh sách căn hộ
      } else {
        console.error('Failed to create apartment:', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewVehicle(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createVehicle(newVehicle); // Gửi thông tin căn hộ mới
  };


  useEffect(() => {
    fetchResidentDetails();
  }, [id]);

  const fetchResidentDetails = async () => {
    try {
      const response = await fetchURL(`/api/v1/resident/${id}`);
      setResident(response.data);
      console.log(response.data)
    } catch (err) {
      console.error(err.message);
      console.log(resident)
    }
  };

  if (!resident) {
    return <div>Loading...</div>;
  }

  return (
    <div className='resident-details'>
      <div className='header p-3 w-100 bg-white d-flex justify-content-between align-items-center'>
        <h3 className='m-0'>Chi Tiết Cư Dân</h3>
        <div>
          <Link className='pe-3' to={"/admin/resident"}>
            <b>Trở về</b>
          </Link>

          <Button onClick={handleShow}>Thêm xe</Button>
        </div>
      </div>

      <div className='info bg-white m-3 p-5'>
        <div className=''>
          <div>
            <h4 className='text-center'>Thông tin cá nhân</h4>
          </div>
          <Container className='w-50'>
            <Table hover responsive className='w-75'>
              <tbody>
                <tr>
                  <th>Họ Tên: </th>
                  <td>{resident.resident_name}</td>
                </tr>
                <tr>
                  <th>Email:</th>
                  <td>{resident.email}</td>
                </tr>
                <tr>
                  <th>Số Điện Thoại:</th>
                  <td>{resident.phone_number}</td>
                </tr>
                <tr>
                  <th>Số Căn Cước Công Dân</th>
                  <td>{resident.cccd}</td>
                </tr>

                <tr>
                  <th>Ngày Sinh:</th>
                  <td>{resident.birthday}</td>
                </tr>
                <tr>
                  <th>
                    Ngày Đăng Ký Nhận Phòng:</th>
                  <td>{resident.move_in_date}</td>
                </tr>
              </tbody>

            </Table>
            <h4 className='text-center'>Thông Tin Phương Tiện Cá Nhân</h4>
            <Table>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tên Phương Tiện</th>
                  <th>Loại Phương Tiện</th>
                  <th>Biển Số</th>
                  <th>Màu Sắc</th>
                </tr>
              </thead>
              {resident.vehicles.map((vehicle, id) => (
                <tbody className='mt-5'>
                  <tr key={id}>
                    <td>{id + 1}</td>
                    <td>{vehicle.vehicle_name}</td>
                    <td>{vehicle.vehicle_type}</td>
                    <td>{vehicle.license_plate}</td>
                    <td>{vehicle.color}</td>
                  </tr>
                </tbody>
              ))}
            </Table>
          </Container>
        </div>


      </div>

      <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm Mới Phương Tiện</Modal.Title>
        </Modal.Header>
        <Modal.Body className='p-4'>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Tên Phương Tiện</Form.Label>
              <Form.Control
                type="text"
                name='vehicle_name'
                value={newVehicle.vehicle_name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Biển Số Xe</Form.Label>
              <Form.Control
                type="text"
                name='license_plate'
                value={newVehicle.license_plate}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Loại Xe</Form.Label>
              <Form.Select
                name="vehicle_type"
                value={newVehicle.vehicle_type}
                onChange={handleChange}
              >
                <option>Chọn Loại Xe</option>
                <option value="Xe Máy">Xe Máy</option>
                <option value="Xe Hơi">Xe Hơi</option>
                <option value="Xe Đạp">Xe Đạp</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Màu Xe</Form.Label>
              <Form.Control
                type="text"
                name='color'
                value={newVehicle.color}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </div>

  );
};

export default ResidentDetails;
