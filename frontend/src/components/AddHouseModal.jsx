import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const AddHouseModal = ({ show, handleClose }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add House</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formHouseNumber">
                        <Form.Label>House Number</Form.Label>
                        <Form.Control type="text" placeholder="Enter house number" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formHouseType">
                        <Form.Label>House Type</Form.Label>
                        <Form.Control type="text" placeholder="Enter house type" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formHouseLocation">
                        <Form.Label>House Location</Form.Label>
                        <Form.Control type="text" placeholder="Enter house location" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formHousePrice">
                        <Form.Label>House Price</Form.Label>
                        <Form.Control type="text" placeholder="Enter house price" />
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
