import React from 'react';
import NavBar from '../components/NavBar';
import SideNav from '../components/SideNav';
import AddTenantModal from '../components/modals/AddTenantModal';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import useFetchTenants from '../hooks/useFetchTenants'; // Import the custom hook

const Tenants = ({ houses, showTenantModal, handleCloseTenantModal, handleShowTenantModal, addTenant }) => {
    const { tenants, loading, error } = useFetchTenants(); // Use the custom hook

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
                            <Col className="d-flex justify-content-between">
                                <h1>Tenants</h1>
                                <Button variant="primary" className="mb-3" onClick={handleShowTenantModal}>Add Tenant</Button>
                            </Col>
                        </Row>
                        <Row>
                            {loading && (
                                <Col className="text-center">
                                    <Spinner animation="border" />
                                    <p>Loading tenants...</p>
                                </Col>
                            )}
                            {error && (
                                <Col>
                                    <Alert variant="danger">
                                        Error loading tenants: {error.message}
                                    </Alert>
                                </Col>
                            )}
                            {!loading && !error && tenants.length === 0 && (
                                <Col>
                                    <Alert variant="info">No tenants found.</Alert>
                                </Col>
                            )}
                            {!loading && !error && tenants.map((tenant, index) => (
                                <Col key={index} md={4}>
                                    <Card className="mb-3">
                                        <Card.Body>
                                            <Card.Title>{tenant.tenantName}</Card.Title>
                                            <Card.Text>
                                                <div className="d-flex justify-content-between">
                                                    <p>Phone</p>
                                                    <p>{tenant.tenantPhone}</p>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                    <p>House</p>
                                                    <p>{tenant.house_number}</p>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                    <p>Rent</p>
                                                    <p>{tenant.house_price}</p>
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
            <AddTenantModal 
                showTenantModal={showTenantModal} 
                handleCloseTenantModal={handleCloseTenantModal} 
                handleShowTenantModal={handleShowTenantModal} 
                houses={houses} 
                addTenant={addTenant} 
            />
        </>
    );
};

export default Tenants;
