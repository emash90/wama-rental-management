import React from 'react';
import NavBar from '../components/NavBar';
import SideNav from '../components/SideNav';
import { Container, Row, Col } from 'react-bootstrap';
import { Card } from 'react-bootstrap';

const Dashboard = () => {
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
            <Row>
                <Col>
                    <Card>
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
                </Col>
                <Col>
                    <Card>
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
                    </Col>
                    </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
