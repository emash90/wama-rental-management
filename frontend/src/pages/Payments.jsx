import React from 'react';
import NavBar from '../components/NavBar';
import SideNav from '../components/SideNav';
import PaymentFilters from '../components/PaymentFilters';
import AddPaymentModal from '../components/modals/AddPaymentModal';
import { Container, Row, Col, Table, Button, Spinner, Alert } from 'react-bootstrap';
import useFetchPayments from '../hooks/useFetchPayments'; // Import the custom hook

const Payments = ({ showPaymentModal, handleClosePaymentModal, handleShowPaymentModal, addPayment, allTenants }) => {
    const { payments, loading, error } = useFetchPayments(); // Use the custom hook
    console.log("payment data", payments)
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
                                    <h1>Payments</h1>
                                    <Button variant="primary" onClick={handleShowPaymentModal}>Add Payment</Button>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <h4>Filters</h4>
                            <Col className='mb-3'>
                                <PaymentFilters />
                            </Col>
                            <hr />
                        </Row>
                        {loading && (
                            <Row className="justify-content-center">
                                <Spinner animation="border" />
                                <p>Loading payments...</p>
                            </Row>
                        )}
                        {error && (
                            <Row>
                                <Col>
                                    <Alert variant="danger">
                                        Error loading payments: {error.message}
                                    </Alert>
                                </Col>
                            </Row>
                        )}
                        {!loading && !error && payments.length === 0 && (
                            <Row>
                                <Col>
                                    <Alert variant="info">No payments found.</Alert>
                                </Col>
                            </Row>
                        )}
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>House</th>
                                    <th>Tenant</th>
                                    <th>Amount</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {!loading && !error && payments.map((payment) => (
                                    <tr key={payment.paymentId}>
                                        <td>{payment.paymentId}</td>
                                        <td>{payment.house_id.house_number}</td>
                                        <td>{payment.tenant_id.tenantName}</td>
                                        <td>{payment.amount_paid}</td>
                                        <td>{payment.date_paid}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
            <AddPaymentModal 
                showPaymentModal={showPaymentModal} 
                handleClosePaymentModal={handleClosePaymentModal} 
                handleShowPaymentModal={handleShowPaymentModal} 
                addPayment={addPayment} 
                allTenants={allTenants} 
            />
        </>
    );
};

export default Payments;
