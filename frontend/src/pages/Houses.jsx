import React from 'react';
import NavBar from '../components/NavBar';
import SideNav from '../components/SideNav';
import HouseFilters from '../components/HouseFilters';
import AddHouseModal from '../components/modals/AddHouseModal';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import useFetchHouses from '../hooks/useFetchHouses'

const Houses = ({ handleHouseAdded, handleEditHouse, handleDeleteHouse, handleCloseModal, handleShowModal, showModal }) => {
    const { houses, loading, error } = useFetchHouses(); // Use the custom hook

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
                        <Row>
                            <h4>Filters</h4>
                            <Col className='mb-3'>
                                <HouseFilters />
                            </Col>
                            <hr />
                        </Row>
                        <Row className="mb-3">
                            {loading && (
                                <Col className="text-center">
                                    <Spinner animation="border" />
                                    <p>Loading houses...</p>
                                </Col>
                            )}
                            {error && (
                                <Col>
                                    <Alert variant="danger">
                                        Error loading houses: {error.message}
                                    </Alert>
                                </Col>
                            )}
                            {!loading && !error && houses.length === 0 && (
                                <Col>
                                    <Alert variant="info">No houses found.</Alert>
                                </Col>
                            )}
                            {!loading && !error && houses.map((house, index) => (
                                <Col key={index} md={6}>
                                    <Card className="mb-3">
                                        <Card.Body>
                                            <Card.Title>House number {house.house_number}</Card.Title>
                                            <Card.Text>
                                                <div className="d-flex justify-content-between">
                                                    <p>Type</p>
                                                    <p>{house.house_type === 0 ? 'Residential' : 'Commercial'}</p>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                    <p>Location</p>
                                                    <p>{house.house_location}</p>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                    <p>Price</p>
                                                    <p>{house.house_price}</p>
                                                </div>
                                            </Card.Text>
                                        </Card.Body>
                                        <Card.Footer className="d-flex justify-content-end">
                                            <Button variant="primary" className='me-2' onClick={() => handleEditHouse(house)}>Edit</Button>
                                            <Button variant="danger" onClick={() => handleDeleteHouse(house._id)}>Delete</Button>
                                        </Card.Footer>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>
            </Container>
            <AddHouseModal showModal={showModal} handleCloseModal={handleCloseModal} handleHouseAdded={handleHouseAdded} />
        </>
    );
};

export default Houses;
