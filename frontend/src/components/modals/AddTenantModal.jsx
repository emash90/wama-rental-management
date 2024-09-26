import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const AddTenantModal = ({ showTenantModal, handleCloseTenantModal, addTenant, houses }) => {
    const [tenantData, setTenantData] = useState({
        tenantHouse: '',
        tenantName: '',
        tenantPhone: '',
        tenantRent: ''
    });

    const handleTenantDataChange = (e) => {
        const { name, value } = e.target;
        setTenantData((prevData) => {
            let newData = { ...prevData, [name]: value };

            if (name === 'tenantHouse') {
                const selectedHouse = houses.find((house) => house._id === value);
                if (selectedHouse) {
                    newData.tenantRent = selectedHouse.house_price;
                } else {
                    newData.tenantRent = '';
                }
            }

            return newData;
        });
    };

    const handleAddTenant = (e) => {
        e.preventDefault();
        console.log("tenantData", tenantData);
        addTenant(tenantData);
    };

    return (
        <div>
            <Modal show={showTenantModal} onHide={handleCloseTenantModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Tenant</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleAddTenant}>
                        <Form.Group className="mb-3" controlId="tenantHouse">
                            <Form.Label>House Number</Form.Label>
                            <Form.Select name="tenantHouse" value={tenantData.tenantHouse} onChange={handleTenantDataChange}>
                                <option value=''>Select House</option>
                                {houses.map((house, index) => (
                                    <option key={index} value={house._id}>{house.house_number}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="tenantRent">
                            <Form.Label>Rent</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter tenant's rent"
                                name="tenantRent"
                                value={tenantData.tenantRent}
                                onChange={handleTenantDataChange}
                                disabled
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="tenantName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter tenant's name"
                                name="tenantName"
                                value={tenantData.tenantName}
                                onChange={handleTenantDataChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="tenantPhone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter tenant's phone"
                                name="tenantPhone"
                                value={tenantData.tenantPhone}
                                onChange={handleTenantDataChange}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Add Tenant
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default AddTenantModal;