import React, { useEffect, useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { ReactNotifications, Store } from 'react-notifications-component';
import '../parking/Parking.css'

const Parking = () => {
    const [parking, setParking] = useState([])

    const fetchParking = async () => {
        try {
            const response = await fetch("http://localhost:8181/api/v1/parking");
            const data = await response.json();
            setParking(data)
            console.log(parking)
            Store.addNotification({
                title: "Lấy dữ liệu chỗ gửi xe thành công!",
                type: "success", // green color for success
                insert: "top",
                container: "top-left",
                dismiss: {
                    duration: 3000, // Auto-dismiss after 4 seconds
                    onScreen: true
                }
            });
        } catch (error) {
            Store.addNotification({
                title: "Lấy dữ liệu chỗ gửi xe thất bại!",
                type: "danger", // green color for success
                insert: "top",
                container: "top-left",
                dismiss: {
                    duration: 3000, // Auto-dismiss after 4 seconds
                    onScreen: true
                }
            });
        }
    }

    const showDetails = () => {
        console.log("first")
    }

    useEffect(() => {
        fetchParking();
    }, [])
    return (
        <div className='parking' style={{ height: "100vh" }}>
            <ReactNotifications />
            <div className='header p-3 w-100 bg-white d-flex justify-content-between align-items-center'>
                <h3 className='m-0'>Thông Tin Hầm Giữ Xe</h3>
                <Link className='pe-3' to={"/admin"}>
                    <b>Trở về</b>
                </Link>
            </div>

            <div className="table-content bg-white m-3 p-3" style={{ height: "90vh" }}>

                <Row>
                    {parking.length > 0 ? (
                        parking.map((park, index) => (
                            <Col key={index} md={4} className="mb-4" onClick={showDetails} >
                                {/* Mỗi khối */}
                                <Card className="h-100 shadow-sm ">
                                    <Card.Body className="text-center">
                                        <Card.Text>ID: {park.id}</Card.Text>
                                        <Card.Text className='fw-bold'>{park.park_name}</Card.Text>
                                        <Card.Text>{park.park_type}</Card.Text>
                                        <Card.Text>{park.park_description}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <p>Loading parking data...</p>
                    )}
                </Row>
            </div >
        </div >
    )
}

export default Parking
