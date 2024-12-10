/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Pagination, Form } from 'react-bootstrap';
import { FaCircleCheck } from "react-icons/fa6";
import { Link } from 'react-router-dom'
import { FaRegEye } from "react-icons/fa";
import { ReactNotifications, Store } from 'react-notifications-component';

const Feedback = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [size, setSize] = useState(20); // Số mục trên mỗi trang, mặc định là 5
  const [feedbacks, setFeedbacks] = useState([])

  // get api
  const fetchFeedbackByApartmentName = async () => {
    const response = await fetch("http://localhost:8181/api/v1/feedback")
    const data = await response.json();
    setFeedbacks(data.content);
    console.log(feedbacks)
  }
  const handleCheck = async (id) => {
    const response = await fetch(`http://localhost:8181/api/v1/feedback/${id}`)
    console.log(id)
  }

  // update api
  const handleUpdate = async (id) => {
    try {
      const response = await fetch(`http://localhost:8181/api/v1/feedback/update-status/${id}`, {method: "PUT"});
      if (response.ok) {
        Store.addNotification({
          title: "Cập nhật thành công!",
          type: "success", // green color for success
          insert: "top",
          container: "top-left",
          dismiss: {
            duration: 1000, // Auto-dismiss after 4 seconds
            onScreen: true
          }
        });
        fetchFeedbackByApartmentName(currentPage, size);
      } else {
        Store.addNotification({
          title: "Cập nhật thất bại!",
          type: "warning", // green color for success
          insert: "top",
          container: "top-left",
          dismiss: {
            duration: 1000, // Auto-dismiss after 4 seconds
            onScreen: true
          }
        });
      }
    } catch (error) {
      console.error(error);
      alert("Có lỗi xảy ra khi cập nhật!");
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
      console.log(newPage)
      console.log(currentPage)
    }
  };

  const handlePageSizeChange = (event) => {
    setSize(Number(event.target.value)); // Cập nhật pageSize
    setCurrentPage(0); // Reset về trang đầu tiên
  };
  useEffect(() => {
    fetchFeedbackByApartmentName();
  }, [])
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
            <select name="" id="" className='mx-2'>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            mục
          </div>
        </div>

        <Table hover striped bordered className='m-0 w-100 text-center'>
          <thead>
            <tr>
              <th>STT</th>
              <th>Tiêu Đề</th>
              <th>Trạng Thái</th>
              <th>Ngày Tạo</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.length > 0 ? (
              feedbacks.map((feedback, index) => (
                <tr key={index}>
                  {/* <td>{(currentPage - 0) * size + index + 1}</td> */}
                  <td>{index + 1}</td>
                  <td>{feedback.title}</td>
                  <td>{feedback.feedbackStatus}</td>
                  <td>{feedback.createDate}</td>
                  {/* <td>
                    <Button onClick={() => handleCheck(feedback.id)}>hi</Button>
                  </td> */}
                  <td>
                    <FaRegEye onClick={() => handleCheck(feedback.id)} className='fs-2 text-success me-3' style={{ fontWeight: "bold" }} />

                    <FaCircleCheck onClick={() => handleUpdate(feedback.id)} className='fs-4 text-success' style={{ fontWeight: "bold" }} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9">Không tìm thấy phản hồi</td>
              </tr>
            )}
          </tbody>
        </Table>

        <div className="mt-4 pagination d-flex justify-content-center align-items-center">
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
    </div >
  )
}

export default Feedback
