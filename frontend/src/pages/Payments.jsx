import React from 'react'
import NavBar from '../components/NavBar'
import SideNav from '../components/SideNav'
import PaymentFilters from '../components/PaymentFilters'
import { Container, Row, Col, Table, Button, Form } from 'react-bootstrap';

const Payments = () => {
    const payments = [
        {
            paymentId: 1,
            paymentAmount: 5000,
            paymentDate: '2021-09-01',
            paymentTenant: 'John Doe',
            paymentHouse: 1
        },
        {
            paymentId: 2,
            paymentAmount: 10000,
            paymentDate: '2021-09-01',
            paymentTenant: 'Jane Doe',
            paymentHouse: 2
        },
        {
            paymentId: 3,
            paymentAmount: 3000,
            paymentDate: '2021-09-01',
            paymentTenant: 'Alice Doe',
            paymentHouse: 3
        },
        {
            paymentId: 4,
            paymentAmount: 6000,
            paymentDate: '2021-09-01',
            paymentTenant: 'Bob Doe',
            paymentHouse: 4
        },
        {
            paymentId: 5,
            paymentAmount: 8000,
            paymentDate: '2021-09-01',
            paymentTenant: 'Eve Doe',
            paymentHouse: 5
        },
        {
            paymentId: 6,
            paymentAmount: 4000,
            paymentDate: '2021-09-01',
            paymentTenant: 'Wendy Doe',
            paymentHouse: 6
        }
    ]
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
                            <Button variant="primary" >Add Payment</Button>
                        </div>
                    </Col>
                </Row>
                <Row >
                    <h4>Filters</h4>
                    <Col className='mb-3'>
                        < PaymentFilters />
                    </Col>
                    <hr></hr>
                </Row>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Tenant</th>
                            <th>House</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment, index) => (
                            <tr key={index}>
                                <td>{payment.paymentId}</td>
                                <td>{payment.paymentAmount}</td>
                                <td>{payment.paymentDate}</td>
                                <td>{payment.paymentTenant}</td>
                                <td>{payment.paymentHouse}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Col>
            </Row>
        </Container>
    </>
  )
}

export default Payments
