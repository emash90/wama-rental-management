import React from 'react'
import NavBar from '../components/NavBar'
import SideNav from '../components/SideNav'
import { Container, Row, Col, Card } from 'react-bootstrap';

const Tenants = () => {
    const tenants = [
        {
            tenantName: 'John Doe',
            tenantPhone: '0712345678',
            tenantHouse: 1,
            tenantRent: 5000
        },
        {
            tenantName: 'Jane Doe',
            tenantPhone: '0712345678',
            tenantHouse: 2,
            tenantRent: 10000
        },
        {
            tenantName: 'Alice Doe',
            tenantPhone: '0712345678',
            tenantHouse: 3,
            tenantRent: 3000
        },
        {
            tenantName: 'Bob Doe',
            tenantPhone: '0712345678',
            tenantHouse: 4,
            tenantRent: 6000
        },
        {
            tenantName: 'Eve Doe',
            tenantPhone: '0712345678',
            tenantHouse: 5,
            tenantRent: 8000
        },
        {
            tenantName: 'Wendy Doe',
            tenantPhone: '0712345678',
            tenantHouse: 6,
            tenantRent: 4000
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
                <h1>Tenants</h1>
                <Row>
                    {tenants.map((tenant, index) => (
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
                                            <p>{tenant.tenantHouse}</p>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <p>Rent</p>
                                            <p>{tenant.tenantRent}</p>
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
    </>
  )
}

export default Tenants
