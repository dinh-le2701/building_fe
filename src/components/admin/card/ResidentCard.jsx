/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Button, Table, Container, Modal, Form } from 'react-bootstrap'
import { useParams } from 'react-router-dom'; // Hook để lấy params từ URL
import { Link } from 'react-router-dom'
import { ReactNotifications, Store } from 'react-notifications-component';

const ResidentCard = () => {
    const [searchTerm, setSearchTerm] = useState([])
    const handleSearch = () => {

    }

    const [cards, setCards] = useState([])
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [size, setSize] = useState(5);
    const [error, setError] = useState([])
    const [loading, setLoading] = useState([])

    const fetchCards = async (page, size) => {
        try {
            const response = await fetch(`http://localhost:8181/api/v1/resident/cards`);
            if (!response.ok) {
                throw new Error('Failed to fetch staff data');
            }
            const data = await response.json();
            setCards(data.content); // Giả sử dữ liệu được trả về trong `data.content`
            setTotalPages(data.page.totalPages); // Giả sử dữ liệu tổng số trang là `data.totalPages`
            console.log(data);
            Store.addNotification({
                title: "Get Resident successfully!",
                type: "success", // green color for success
                insert: "top",
                container: "top-left",
                dismiss: {
                    duration: 2000, // Auto-dismiss after 4 seconds
                    onScreen: true
                }
            });
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCards()
    }, [])
    return (
        <div className='resident_card'>
            <ReactNotifications />
            <div className="header p-3 w-100 bg-white d-flex justify-content-between align-items-center">
                <h3 className="m-0">Danh Sách Thẻ Cư Dân</h3>
                <Button>Thêm mới</Button>
            </div>

            <div className="table-content bg-white m-3 p-3">
                <div className="func-table d-flex justify-content-between align-items-center py-3">
                    <div className="search">
                        <Form className="d-flex" onSubmit={handleSearch}>
                            <Form.Group>
                                <Form.Control
                                    type="text"
                                    placeholder="Nhập mã thẻ"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </Form.Group>
                            <Button type="submit">Tìm</Button>
                        </Form>
                    </div>
                </div>

                <Table hover striped className="w-100 m-0 text-center">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Mã Thẻ</th>
                            <th>Trạng Thái</th>
                            <th>Ngày Tạo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cards.length > 0 ? (
                            cards.map((card, id) => (
                                <tr key={id}>
                                    <td>{(currentPage - 0) * size + id + 1}</td>
                                    <td>{card.cardCode}</td>
                                    <td>{card.card_status}</td>
                                    <td>{card.createDate}</td>
                                    {/* <td className='d-flex justify-content-around align-items-center'>
                                        <Button variant="secondary">
                                            <FaEye className='pb' onClick={() => handleResidentDetails(resident.resident_id)} />
                                        </Button>
                                        <Button variant="warning" onClick={() => handleShowEdit(resident)}>
                                            <CiEdit className='pb' />
                                        </Button>
                                        <Button variant="danger" onClick={() => deleteResidentById(resident.resident_id)}>
                                            <CiTrash className='pb' />
                                        </Button>
                                    </td> */}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center">Không thẻ nào có sẵn</td>
                            </tr>
                        )}

                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default ResidentCard
