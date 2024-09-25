import React, { useEffect, useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { houseAPI } from '../APIs/Apis';

const AddHouseModal = ({ showModal, handleCloseModal, handleHouseAdded, houseToEdit, editHouse }) => {
    const [houseData, setHouseData] = useState({
        house_number: '',
        house_type: '',
        house_location: '',
        house_price: ''
    });

    useEffect(() => {
        if (houseToEdit) {
            setHouseData({
                house_number: houseToEdit.house_number,
                house_type: houseToEdit.house_type,
                house_location: houseToEdit.house_location,
                house_price: houseToEdit.house_price
            });
        } else {
            setHouseData({
                house_number: '',
                house_type: '',
                house_location: '',
                house_price: ''
            });
        }
    }, [houseToEdit]);

    const handleHouseDataChange = (e) => {
        const { name, value } = e.target;
        setHouseData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    const handleAddHouse = (e) => {
        e.preventDefault();
        const saveHouse = async () => {
            try {
                let response;
                if (houseToEdit) {
                    response = await houseAPI.updateHouse(houseToEdit.id, houseData); // Assuming `updateHouse` API method exists
                } else {
                    response = await houseAPI.addHouse(houseData);
                }
                if (response.status === 200 || response.status === 201) {
                    handleCloseModal();
                    handleHouseAdded();
                }
            } catch (error) {
                console.error("error", error);
            }
        }
        saveHouse();
    }
    const updateHouse = (e) => {
        e.preventDefault();
        editHouse(houseData, houseToEdit._id);
    }
    return (
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>{houseToEdit ? 'Edit House' : 'Add House'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={houseToEdit ? updateHouse : handleAddHouse}>
                    <Form.Group className="mb-3" controlId="formHouseNumber">
                        <Form.Label>House Number</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter house number"
                            name="house_number"
                            value={houseData.house_number}
                            onChange={handleHouseDataChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formHouseType">
                        <Form.Label>House Type</Form.Label>
                        <Form.Select
                            name="house_type"
                            value={houseData.house_type}
                            onChange={handleHouseDataChange}
                        >
                            <option value="">Select house type</option>
                            <option value="0">Residential</option>
                            <option value="1">Commercial</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formHouseLocation">
                        <Form.Label>House Location</Form.Label>
                        <Form.Select
                            name="house_location"
                            value={houseData.house_location}
                            onChange={handleHouseDataChange}
                        >
                            <option value="">Select house location</option>
                            <option value='main homestead'>Main Homestead</option>
                            <option value='behind county offices'>Behind County Offices</option>
                            <option value='stage area'>Stage Area</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formHousePrice">
                        <Form.Label>House Price</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter house price"
                            name="house_price"
                            value={houseData.house_price}
                            onChange={handleHouseDataChange}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddHouseModal;
