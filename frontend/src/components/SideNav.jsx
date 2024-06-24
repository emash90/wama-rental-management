import React, { useState } from 'react';
import { Container, Row, Col, Nav, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const SideNav = () => {
  const [isHousesDropdownOpen, setIsHousesDropdownOpen] = useState(false);

  const handleToggleDropdown = () => {
    setIsHousesDropdownOpen(!isHousesDropdownOpen);
  };

  return (
    <Container fluid>
      <Row>
        <Col md={3} className="bg-body-secondary vh-100 p-3">
          <div className="d-flex flex-column">
            <hr />
            <Nav className="flex-column mb-auto" variant="pills">
              <Nav.Item>
                <Nav.Link as={Link} to="/">Dashboard</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/houses">Houses</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/tenants">Tenants</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/payments">Payments</Nav.Link>
              </Nav.Item>
            </Nav>
            <hr />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SideNav;
