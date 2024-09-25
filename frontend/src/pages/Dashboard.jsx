import React from 'react';
import NavBar from '../components/NavBar';
import SideNav from '../components/SideNav';
import HouseStatusChart from '../components/HouseStatusChart';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Dashboard = ({ houses }) => {
    const linkStyle = {
        textDecoration: 'none'
    }
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
                    <h1>Dashboard</h1>
                </Col>
            </Row>
            <Row className="mt-3" xs={1} md={2} >
                <Col>
                    <Link to={'/houses'} style={linkStyle} >
                        <Card className="mb-3" >
                            <Card.Body>
                                <Card.Title>Houses</Card.Title>
                                <Card.Text>
                                    <div className="d-flex justify-content-between">
                                        <p>Number of houses</p>
                                        <p>10</p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <p>Number of occupied houses</p>
                                        <p>5</p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <p>Number of vacant houses</p>
                                        <p>5</p>
                                    </div>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>
                <Col>
                    <HouseStatusChart data={houses} />
                </Col>
                <Col>
                    <Link to={'/tenants'} style={linkStyle} >
                        <Card className="mb-3">
                            <Card.Body>
                                <Card.Title>Tenants</Card.Title>
                                <Card.Text>
                                    <div className="d-flex justify-content-between">
                                        <p>Number of tenants</p>
                                        <p>10</p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <p>Number of active tenants</p>
                                        <p>5</p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <p>Number of inactive tenants</p>
                                        <p>5</p>
                                    </div>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>
                <Col>
                    <Link to={'/payments'} style={linkStyle}>
                        <Card className="mb-3">
                            <Card.Body>
                                <Card.Title>Payments</Card.Title>
                                <Card.Text>
                                    <div className="d-flex justify-content-between">
                                        <p>Number of payments</p>
                                        <p>10</p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <p>Amount paid</p>
                                        <p>100000</p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <p>Amount pending</p>
                                        <p>50000</p>
                                    </div>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
