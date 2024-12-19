import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ReactNotifications, Store } from 'react-notifications-component';

const Vehicle = () => {
    const [residents, setResidents] = useState([]);
    const [apartments, setApartments] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterByAlphabet, setFilterByAlphabet] = useState('');
    const [filterByApartment, setFilterByApartment] = useState('');
    const [filterByResident, setFilterByResident] = useState('');

    const getVehiclesByResident = async () => {
        try {
            const response = await fetch('http://localhost:8181/api/v1/resident/vehicles');
            const data = await response.json();
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            setResidents(data.content);
            console.log(residents)
            Store.addNotification({
                title: "Lấy dữ liệu phương tiện thành công!",
                type: "success",
                insert: "top",
                container: "top-left",
                dismiss: {
                    duration: 3000,
                    onScreen: true,
                },
            });
        } catch (err) {
            Store.addNotification({
                title: "Lấy dữ liệu phương tiện thất bại!",
                type: "danger",
                insert: "top",
                container: "top-left",
                dismiss: {
                    duration: 4000,
                    onScreen: true,
                },
            });
        }
    };
    const fetchApartments = async () => {
        try {
            const response = await fetch("http://localhost:8181/api/v1/apartment");
            const data = await response.json();
            setApartments(data.content); // Xử lý nếu data.content tồn tại
            console.log(data.content); // Log data sau khi lấy thông tin căn hộ
        } catch (error) {
            console.error("Error fetching apartments:", error);
        }
    };

    useEffect(() => {
        getVehiclesByResident();
        fetchApartments()
    }, []);
    useEffect(() => {
        console.log(residents)
    }, []);

    const filteredResidents = residents.filter((resident) => {
        const matchesSearchTerm =
            resident.resident_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            resident.vehicle_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            resident.vehicle_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
            resident.license_plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
            resident.color.toLowerCase().includes(searchTerm.toLowerCase()) ||
            resident.apartment_name.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesAlphabet =
            !filterByAlphabet || resident.resident_name.toLowerCase().startsWith(filterByAlphabet.toLowerCase());

        const matchesApartment = !filterByApartment || resident.apartment_name === filterByApartment;
        const matchesResident = !filterByResident || resident.resident_name === filterByResident;

        return matchesSearchTerm && matchesAlphabet && matchesApartment && matchesResident;
    });

    return (
        <div className="vehicle" style={{ height: '92vh' }}>
            <ReactNotifications />
            <div className="header p-3 w-100 bg-white d-flex justify-content-between align-items-center">
                <h3 className="m-0">Danh Sách Phương Tiện</h3>
                <Link className="pe-3" to={"/admin"}>
                    <b>Trở về</b>
                </Link>
            </div>

            <div className="table-content bg-white m-3 p-3">
                <div className="filters d-flex justify-content-between align-items-center mb-3">
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Tìm kiếm theo tên xe, cư dân, căn hộ, loại xe..."
                            className="form-control"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="alphabet-filter">
                        <select
                            className="form-select"
                            value={filterByAlphabet}
                            onChange={(e) => setFilterByAlphabet(e.target.value)}
                        >
                            <option value="">Lọc theo chữ cái</option>
                            {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => (
                                <option key={letter} value={letter}>{letter}</option>
                            ))}
                        </select>
                    </div>

                    <div className="apartment-filter">
                        <select
                            className="form-select"
                            value={filterByApartment}
                            onChange={(e) => setFilterByApartment(e.target.value)}
                        >
                            <option value="">Lọc theo căn hộ</option>
                            {apartments.map((apartment) => (
                                <option key={apartment.apartment_id} value={apartment.apartment_name}>
                                    {apartment.apartment_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="resident-filter">
                        <select
                            className="form-select"
                            value={filterByResident}
                            onChange={(e) => setFilterByResident(e.target.value)}
                        >
                            <option value="">Lọc theo cư dân</option>
                            {[...new Set(residents.map(r => r.resident_name))].map(name => (
                                <option key={name} value={name}>{name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Tên Căn Hộ</th>
                            <th>Tên cư dân</th>
                            <th>Tên phương tiện</th>
                            <th>Biển số</th>
                            <th>Loại phương tiện</th>
                            <th>Màu sắc</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredResidents.length > 0 ? (
                            filteredResidents.map((resident, index) => (
                                <tr key={index}>
                                    <td>{resident.apartment_name}</td>
                                    <td>{resident.resident_name}</td>
                                    <td>{resident.vehicle_name}</td>
                                    <td>{resident.license_plate}</td>
                                    <td>{resident.vehicle_type}</td>
                                    <td>{resident.color}</td>
                                </tr>
                            ))
                        ) : (
                            <tr className="text-center">
                                <td colSpan="6">Không có dữ liệu cư dân</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default Vehicle;
