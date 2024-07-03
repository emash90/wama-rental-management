import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import SideNav from '../components/SideNav';
import HouseFilters from '../components/HouseFilters'
import AddHouseModal from '../components/AddHouseModal';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const Houses = () => {
    const [showModal, setShowModal] = useState(false);

    const houses = [
        {
            houseNumber: 1,
            houseType: 'Bungalow',
            houseLocation: 'Kileleshwa',
            housePrice: 50000
        },
        {
            houseNumber: 2,
            houseType: 'Mansion',
            houseLocation: 'Karen',
            housePrice: 100000
        },
        {
            houseNumber: 3,
            houseType: 'Apartment',
            houseLocation: 'Kilimani',
            housePrice: 30000
        },
        {
            houseNumber: 4,
            houseType: 'Bungalow',
            houseLocation: 'Runda',
            housePrice: 60000
        },
        {
            houseNumber: 5,
            houseType: 'Mansion',
            houseLocation: 'Lavington',
            housePrice: 80000
        },
        {
            houseNumber: 6,
            houseType: 'Apartment',
            houseLocation: 'Westlands',
            housePrice: 40000
        }
    ];

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    return (
        <>
            <NavBar />
            <Container fluid>
                <Row className="vh-100">
                    <Col md={3} className="bg-body-secondary p-0">
                        <SideNav />
                    </Col>
                    <Col md={9} className="p-3">
                        <Row>
                            <Col>
                                <div className="d-flex justify-content-between" style={{ marginBottom: '1rem' }}>
                                    <h1>Houses</h1>
                                    <Button variant="primary" onClick={handleShowModal}>Add House</Button>
                                </div>
                            </Col>
                        </Row>
                        <Row >
                            <h4>Filters</h4>
                            <Col className='mb-3'>
                                < HouseFilters />
                            </Col>
                            <hr></hr>
                        </Row>
                        <Row className="mb-3">
                            {houses.map((house, index) => (
                                <Col key={index} md={6}>
                                    <Card className="mb-3">
                                        <Card.Body>
                                            <Card.Title>House {house.houseNumber}</Card.Title>
                                            <Card.Text>
                                                <div className="d-flex justify-content-between">
                                                    <p>Type</p>
                                                    <p>{house.houseType}</p>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                    <p>Location</p>
                                                    <p>{house.houseLocation}</p>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                    <p>Price</p>
                                                    <p>{house.housePrice}</p>
                                                </div>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>
            </Container>
            <AddHouseModal show={showModal} handleClose={handleCloseModal} />
        </>
    );
};

export default Houses;
