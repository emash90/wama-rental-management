import React from 'react';
import { Form, Row, Col, InputGroup, Button } from 'react-bootstrap';

const PaymentFilters = () => {
  return (
    <div>
      <Row>
        <Col className='mb-3'>
          {/* Date range filter */}
          <Form.Group className="mb-3" controlId="formDateRange">
            <Form.Label>Date Range</Form.Label>
            <Row>
              <Col>
                <Form.Label>From</Form.Label>
                <Form.Control type="date" />
              </Col>
              <Col>
                <Form.Label>To</Form.Label>
                <Form.Control type="date" />
              </Col>
            </Row>
          </Form.Group>
        </Col>
        <Col className='mb-3' md={4}>
          <Form.Group className="mb-3" controlId="formTenantName">
            <Form.Label>Tenant's Name</Form.Label>
            <InputGroup>
              <Form.Control
                placeholder="Enter Tenant's Name"
                aria-label="Tenant's Name"
                size='sm'
              />
            </InputGroup>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col className='mb-3' md={4}>
          <Button variant='secondary' size='sm'>
            Go
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default PaymentFilters;
