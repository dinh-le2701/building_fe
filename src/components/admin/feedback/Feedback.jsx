/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Pagination, Form } from 'react-bootstrap';
import { FaCircleCheck } from "react-icons/fa6";
import { Link } from 'react-router-dom'
import { FaRegEye } from "react-icons/fa";
import { ReactNotifications, Store } from 'react-notifications-component';
import "../icon.css"

const Feedback = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [size, setSize] = useState(20); // Số mục trên mỗi trang, mặc định là 20
  const [feedbacks, setFeedbacks] = useState([]);
  const [feedbackDetail, setFeedbackDetail] = useState([]);
  const [selectedApartmentName, setSelectedApartmentName] = useState(""); // Lưu tên căn hộ được chọn
  const [apartments, setApartments] = useState([]);

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  // Lấy danh sách căn hộ
  const fetchApartments = async () => {
    try {
      const response = await fetch("http://localhost:8181/api/v1/apartment");
      const data = await response.json();
      setApartments(data.content || []); // Xử lý nếu data.content tồn tại
    } catch (error) {
      console.error("Error fetching apartments:", error);
    }
  };

  // Lấy danh sách phản hồi
  const fetchFeedbacks = async () => {
    try {
      let url = `http://localhost:8181/api/v1/feedback?page=${currentPage}&size=${size}`;
      if (selectedApartmentName) {
        url = `http://localhost:8181/api/v1/feedback/apartment_name/${selectedApartmentName}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      // Lưu danh sách feedback vào state
      setFeedbacks(data.content || data); // Dữ liệu feedback có thể nằm trong `content` (phân trang)
      setTotalPages(data.page.totalPages);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    }
  };


  // Xem chi tiết phản hồi
  const showFeedbackId = async (id) => {
    try {
      const response = await fetch(`http://localhost:8181/api/v1/feedback/${id}`);
      const data = await response.json();
      setFeedbackDetail(data);
      console.log(data)
      handleShow();
    } catch (error) {
      console.error("Error fetching feedback detail:", error);
    }
  };

  // Cập nhật trạng thái phản hồi
  const handleUpdate = async (id) => {
    try {
      const response = await fetch(`http://localhost:8181/api/v1/feedback/update-status/${id}`, {
        method: "PUT",
      });

      if (response.ok && feedbackDetail.feedbackStatus !== "ĐÃ XÉT DUYỆT") {
        // Hiển thị thông báo thành công
        Store.addNotification({
          title: "Cập nhật thành công!",
          type: "success",
          insert: "top",
          container: "top-left",
          dismiss: {
            duration: 1000,
            onScreen: true,
          },
        });

        // Làm mới danh sách phản hồi
        fetchFeedbacks(currentPage, size, selectedApartmentName);
      } else {
        Store.addNotification({
          title: "Không thể cập nhật",
          message: "Phản hồi này đã được cập nhật trước đó.",
          type: "warning",
          insert: "top",
          container: "top-left",
          dismiss: {
            duration: 2500,
            onScreen: true,
          },
        });
      }
    } catch (error) {
      console.error("Error updating feedback status:", error);
    }
  };

  // Thay đổi trang
  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Thay đổi số mục trên mỗi trang
  const handlePageSizeChange = (event) => {
    setSize(Number(event.target.value));
    setCurrentPage(0); // Reset về trang đầu tiên
  };

  // Lấy dữ liệu khi thay đổi trang, kích thước, hoặc căn hộ
  useEffect(() => {
    fetchApartments();
    fetchFeedbacks(currentPage, size, selectedApartmentName);
    console.log(feedbacks)
    const intervalId = setInterval(() => {
      fetchApartments();
      fetchFeedbacks(currentPage, size, selectedApartmentName);
      console.log("feedback: " + feedbackDetail)
    }, 3000);
    return () => clearInterval(intervalId);
  }, [currentPage, size, selectedApartmentName]);


  return (
    <div className='feedback' style={{ height: "100vh" }}>
      <ReactNotifications />
      <div className='header p-3 w-100 bg-white d-flex justify-content-between align-items-center'>
        <h3 className='m-0'>Thông Tin Phản Hồi</h3>
        <Link className='pe-3' to={"/admin"}>
          <b>Trở về</b>
        </Link>
      </div>

      <div className="table-content bg-white m-3 p-3">
        <div className="func-table d-flex justify-content-between align-items-center py-3">
          <div className="select-group">
            Hiển thị
            <select className="mx-2" value={size} onChange={handlePageSizeChange}>
              <option value="1000">Toàn bộ</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            mục
          </div>

          <div className="select-group">
            Lọc theo tên căn hộ
            <select
              className="form-select"
              value={selectedApartmentName}
              onChange={(e) => {
                setSelectedApartmentName(e.target.value); // Lưu tên căn hộ được chọn
                setCurrentPage(0); // Reset về trang đầu tiên
              }}
            >
              <option value="">-- Chọn căn hộ --</option>
              {apartments.map((apartment) => (
                <option key={apartment.apartment_id} value={apartment.apartment_name}>
                  {apartment.apartment_name}
                </option>
              ))}
            </select>

          </div>
        </div>

        <Table hover striped bordered className="m-0 w-100 text-center">
          <thead>
            <tr>
              <th>STT</th>
              <th>Tiêu Đề</th>
              <th>Trạng Thái</th>
              <th>Ngày Tạo</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.length > 0 ? (
              feedbacks.map((feedback, index) => (
                <tr key={index}>
                  <td>{currentPage * size + index + 1}</td>
                  {/* <td>{feedback.apartmentName}</td>
                  <td>{feedback.id}</td> */}
                  <td>{feedback.title}</td>
                  <td>{feedback.feedbackStatus}</td>
                  <td>{feedback.createDate}</td>
                  <td>
                    <FaRegEye
                      onClick={() => showFeedbackId(feedback.id)}
                      className="icon fs-2 text-secondary me-3"
                      style={{ fontWeight: "bold" }}
                    />
                    <FaCircleCheck
                      onClick={() => handleUpdate(feedback.id)}
                      className="icon fs-4 text-success"
                      style={{ fontWeight: "bold" }}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">Không tìm thấy phản hồi</td>
              </tr>
            )}
          </tbody>
        </Table>

        <div className="mt-4 pagination d-flex justify-content-center align-items-center">
          <Pagination>
            <Pagination.First onClick={() => handlePageChange(0)} />
            <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} />
            <Pagination.Item>
              {currentPage + 1} / {totalPages}
            </Pagination.Item>
            <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} />
            <Pagination.Last onClick={() => handlePageChange(totalPages - 1)} />
          </Pagination>
        </div>
      </div>

      {/* Modal to add resident */}
      <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Chi Tiết Phản Hồi Của Căn Hộ</Modal.Title>
        </Modal.Header>
        <Modal.Body className='p-4'>
          <Table>
            <tr>
              <h5>Tên Căn Hộ:</h5>
              <th className='h3'>{feedbackDetail.apartmentName}</th>
            </tr>
            <tr>
              <h5>Tiêu đề:</h5>
              <td>{feedbackDetail.title}</td>
            </tr>
            <tr>
              <h5>Mô tả</h5>
              <td>{feedbackDetail.description}</td>
            </tr>
            <tr>
              <h5>Trạng Thái</h5>
              <td>{feedbackDetail.feedbackStatus}</td>
            </tr>
            <tr>
              <h5>Ngày Tạo</h5>
              <td>{feedbackDetail.createDate}</td>
            </tr>
            {/* <tr>
              <h5></h5>
              <td></td>
            </tr> */}
          </Table>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
        </Modal.Footer> */}
      </Modal>
    </div >
  )
}

export default Feedback
