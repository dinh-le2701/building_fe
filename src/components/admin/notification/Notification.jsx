/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Button, Table, Form } from 'react-bootstrap';
import 'react-notifications-component/dist/theme.css';
import { ReactNotifications, Store } from 'react-notifications-component';
import { Link } from 'react-router-dom'

const Notification = () => {
  const [emailList, setEmailList] = useState(""); // Danh sách email người nhận
  const [message, setMessage] = useState(""); // Tiêu đề thông báo
  const [newMail, setNewMail] = useState({ text: "" }); // Nội dung thông báo
  const [selectedApartments, setSelectedApartments] = useState([]); // Danh sách căn hộ được chọn
  const [tableData, setTableData] = useState([]); // Dữ liệu căn hộ

  // Lấy dữ liệu căn hộ từ API
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8181/api/v1/apartment');
      if (!response.ok) {
        throw new Error("Không thể lấy dữ liệu từ API");
      }
      const data = await response.json();
      const extractedData = data.content.map((apartment) => ({
        apartmentId: apartment.apartment_id,
        apartmentName: apartment.apartment_name,
        emails: apartment.accounts
          ? apartment.accounts.map((account) => account.email).join(", ")
          : "N/A",
      }));
      Store.addNotification({
        title: "Lấy dữ liệu thành công",
        type: "success", // màu xanh cho thành công
        insert: "top",
        container: "top-left",
        dismiss: {
          duration: 3000, // Tự động đóng sau 3 giây
          onScreen: true
        }
      });
      setTableData(extractedData);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };

  // Gửi email qua API
  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailListArray = emailList.split(",").map((email) => email.trim());

    // Dữ liệu gửi tới API
    const emailData = {
      to: emailListArray,
      subject: message,
      text: newMail.text,
    };

    try {
      const response = await fetch('http://localhost:8181/api/mail', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData), // Chuyển đổi đối tượng thành JSON
      });

      if (response.ok) {
        const result = await response.json();
        Store.addNotification({
          title: "Email đã được gửi thành công",
          type: "success", // màu xanh cho thành công
          insert: "top",
          container: "top-left",
          dismiss: {
            duration: 3000, // Tự động đóng sau 3 giây
            onScreen: true
          }
        });
        console.log("Kết quả:", result);

        // Xóa dữ liệu form sau khi gửi thành công
        setEmailList("");
        setMessage("");
        setNewMail({ text: "" });
        setSelectedApartments([]);
      } else {
        const error = await response.json();
        Store.addNotification({
          title: "Gửi email thất bại, vui lòng thử lại!",
          type: "danger", // màu đỏ cho lỗi
          insert: "top",
          container: "top-left",
          dismiss: {
            duration: 3000, // Tự động đóng sau 3 giây
            onScreen: true
          }
        });
        console.error("Lỗi:", error);
      }
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu:", error);
      Store.addNotification({
        title: "Đã xảy ra lỗi khi gửi email. Vui lòng kiểm tra kết nối hoặc thử lại sau!",
        type: "warning", // màu vàng cho cảnh báo
        insert: "top",
        container: "top-left",
        dismiss: {
          duration: 3000, // Tự động đóng sau 3 giây
          onScreen: true
        }
      });
    }
  };

  const handleSelectAll = (isChecked) => {
    if (isChecked) {
      // Nếu checkbox "chọn tất cả" được tích, chọn tất cả các căn hộ
      setSelectedApartments(tableData);
      const allEmails = tableData.flatMap((apt) =>
        apt.emails ? apt.emails.split(", ") : []
      );
      setEmailList(allEmails.join(", "));
    } else {
      // Nếu checkbox "chọn tất cả" bị bỏ tích, bỏ chọn tất cả
      setSelectedApartments([]);
      setEmailList("");
    }
  };



  // Xử lý thay đổi khi checkbox được chọn
  const handleCheckboxChange = (apartmentName, emails) => {
    setSelectedApartments((prev) => {
      const isAlreadySelected = prev.find((apt) => apt.apartmentName === apartmentName);

      if (isAlreadySelected) {
        // Nếu đã chọn, bỏ chọn
        const updated = prev.filter((apt) => apt.apartmentName !== apartmentName);
        updateEmailList(updated);
        return updated;
      } else {
        // Nếu chưa chọn, thêm vào
        const updated = [...prev, { apartmentName, emails }];
        updateEmailList(updated);
        return updated;
      }
    });
  };

  // Cập nhật danh sách email khi chọn căn hộ
  const updateEmailList = (apartments) => {
    const allEmails = apartments.flatMap((apt) => apt.emails.split(", "));
    setEmailList(allEmails.join(", "));
  };

  // Xử lý thay đổi nội dung thông báo
  const handleChange = (e) => {
    setNewMail({ ...newMail, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetchData(); // Lấy dữ liệu căn hộ khi component mount
  }, []);

  return (
    <div>
      <div className='header p-3 w-100 bg-white d-flex justify-content-between align-items-center'>
        <h3 className='m-0'>Thông Báo</h3>
        <Link className='pe-3' to={"/admin"}>
          <b>Trở về</b>
        </Link>
      </div>
      <div className="table-content form p-3 bg-white m-3">
        <ReactNotifications />
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label className="h4">Người nhận (Email)</Form.Label>
            <Form.Control
              as="textarea"
              name="to"
              value={emailList}
              onChange={(e) => setEmailList(e.target.value)}
              placeholder="Nhập email người nhận"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="h4">Tiêu Đề</Form.Label>
            <Form.Control
              type="text"
              name="subject"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Nhập tiêu đề ở đây"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="h4">Nội Dung Thông Báo</Form.Label>
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

          <Form.Group className='text-center'>
            <Button type="submit" className="text-center bg-primary text-white w-25">
              Gửi
            </Button>
          </Form.Group>
        </Form>
      </div>

      <div className="table-content bg-white m-3 p-3">
        <Table striped hover bordered className="m-0 w-100 text-center">
          <thead>
            <tr>
              <th className='d-flex justify-content-center align-items-center'>Chọn Tất Cả
                <Form.Check
                className='ms-1'
                  type="checkbox"
                  onChange={(e) => handleSelectAll(e.target.checked)}
                />
              </th>
              <th>Tên Căn Hộ</th>
              <th>Tài Khoản</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                <td>
                  <Form.Check
                    type="checkbox"
                    onChange={() => handleCheckboxChange(row.apartmentName, row.emails)}
                  />
                </td>
                <td>{row.apartmentName}</td>
                <td>{row.emails}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Notification;
