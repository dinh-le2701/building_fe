/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Button, Table, Container, Modal, Form } from 'react-bootstrap'
import { useParams } from 'react-router-dom'; // Hook để lấy params từ URL
import { Link } from 'react-router-dom'
import fetchURL from '../../../api/AxiosInstance';
import { MdDeleteForever } from "react-icons/md";
import { ReactNotifications, Store } from 'react-notifications-component';

const ResidentDetails = () => {
  const { id } = useParams(); // Lấy id từ URL
  const [residents, setResidents] = useState([]);
  const [cards, setCards] = useState([])
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [vehicles, setVehicles] = useState([])
  const [newVehicle, setNewVehicle] = useState({
    vehicle_name: "",
    license_plate: "",
    vehicle_type: "",
    color: ""
  });


  const [totalPages, setTotalPages] = useState([])
  const [error, setError] = useState([])
  const [loading, setLoading] = useState([])

  const fetchResidentDetails = async () => {
    try {
      const response = await fetch(`http://localhost:8181/api/v1/resident/${id}`);
      const data = await response.json();

      // Kiểm tra nếu phản hồi có đúng dữ liệu
      if (data && data.cards) {
        setCards(data.cards); // Giả sử bạn đang lưu danh sách cư dân vào state residents
        setVehicles(data.vehicles)
        setResidents(data); // Cập nhật thông tin căn hộ nếu cần
        console.log(data)
      }
      Store.addNotification({
        title: "Thông tin chi tiết căn hộ",
        type: "success", // green color for success
        insert: "top",
        container: "top-left",
        dismiss: {
          duration: 1000, // Auto-dismiss after 4 seconds
          onScreen: true
        }
      });
      console.log(data)
      console.log(residents.resident_name)
    } catch (err) {
      console.error(err.message);
    }
  };


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
        setVehicles([...vehicles, data]); // Thêm căn hộ mới vào danh sách
        handleClose(); // Đóng modal sau khi thêm thành công
        fetchResidentDetails(); // Cập nhật lại danh sách căn hộ
        Store.addNotification({
          title: "Tạo mới phương tiện thành công!",
          type: "success", // green color for success
          insert: "top",
          container: "top-left",
          dismiss: {
            duration: 1000, // Auto-dismiss after 4 seconds
            onScreen: true
          }
        });
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



  if (!residents) {
    return <div className='fs-1'>Loading...</div>;
  }

  const handleDeleteCard = async (id) => {
    const url = `http://localhost:8181/api/v1/resident/card/${id}`;
    const confirmDelete = window.confirm("Bạn có chắc muốn thẻ của cư dân này không?");

    if (!confirmDelete) return; // Người dùng không xác nhận

    try {
      const response = await fetch(url, {
        method: "DELETE",
      });

      if (response.ok) {
        Store.addNotification({
          title: "Xoá thẻ cư dân thành công!",
          type: "success", // green color for success
          insert: "top",
          container: "top-left",
          dismiss: {
            duration: 4000, // Auto-dismiss after 4 seconds
            onScreen: true
          }
        });
        fetchResidentDetails();
      } else {
        const errorMessage = await response.text();
        alert(`Xóa thẻ cư dân thất bại: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Đã xảy ra lỗi:", error);
      alert("Đã xảy ra lỗi khi xóa thẻ của cư dân.");
    }
  }

  return (
    <div className='resident-details'>
      <ReactNotifications />
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
        <div>
          <h4 className='text-center'>Thông tin cá nhân</h4>
        </div>
        <Container className='w-50'>
          <Table hover responsive className='w-75'>
            <tbody>
              <tr>
                <th>Họ Tên: </th>
                <td>{residents.resident_name}</td>
              </tr>
              <tr>
                <th>Email:</th>
                <td>{residents.email}</td>
              </tr>
              <tr>
                <th>Số Điện Thoại:</th>
                <td>{residents.phone_number}</td>
              </tr>
              <tr>
                <th>Số Căn Cước Công Dân</th>
                <td>{residents.cccd}</td>
              </tr>

              <tr>
                <th>Ngày Sinh:</th>
                <td>{residents.birthday}</td>
              </tr>
              <tr>
                <th>
                  Ngày Đăng Ký Nhận Phòng:</th>
                <td>{residents.move_in_date}</td>
              </tr>
            </tbody>
          </Table>
        </Container>
      </div>

      <div className=' bg-white m-3 p-5'>
        <Container className='w-75'>
          <h4 className='text-center'>Thông Tin Phương Tiện Cá Nhân</h4>
          <Table hover className='text-center'>
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên Phương Tiện</th>
                <th>Loại Phương Tiện</th>
                <th>Biển Số</th>
                <th>Màu Sắc</th>
              </tr>
            </thead>
            <tbody>
              {
                vehicles.length > 0 ? (
                  vehicles.map((vehicle, id) => (
                    <tr key={id}>
                      <td>{id + 1}</td>
                      <td>{vehicle.vehicle_name}</td>
                      <td>{vehicle.vehicle_type}</td>
                      <td>{vehicle.license_plate}</td>
                      <td>{vehicle.color}</td>
                      {/* <td>
                        <Button variant='danger' onClick={() => { handleDeleteCard(card.id) }}>Xoá</Button>
                      </td> */}
                    </tr>
                  ))
                ) : (
                  <tr className='text-center'>
                    <td colSpan="9">Không tìm thấy phương tiện</td>
                  </tr>
                )}
            </tbody>
          </Table>
        </Container>
      </div>
      <div className=' bg-white m-3 p-5 w-100'>
        <Container className='w-75'>
          <h4 className='text-center'>Thẻ Cho Cư Dân</h4>
          <Table hover className='text-center w-100'>
            <thead>
              <tr>
                <th>STT</th>
                <th>Mã Thẻ</th>
                <th>Trạng Thái</th>
                <th>Ngày Tạo</th>
                <th></th>
              </tr>
            </thead>
            {
              cards.length > 0 ? (
                cards.map((card, id) => (
                  <tr key={id}>
                    <td>{id + 1}</td>
                    <td>{card.cardCode}</td>
                    <td>{card.card_status}</td>
                    <td>{card.create_date}</td>
                    <td>
                      <Button variant='danger' onClick={() => { handleDeleteCard(card.id) }}>Xoá</Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className='text-center'>
                  <td colSpan="9">Không tìm thấy phương tiện</td>
                </tr>
              )}
          </Table>
        </Container>
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
                <option value="Xe Đạp Điện">Xe Đạp Điện</option>
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
