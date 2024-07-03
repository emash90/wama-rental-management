import React, { useState } from 'react'
import { Form, Row, Col, InputGroup, Button } from 'react-bootstrap'

const HouseFilters = () => {
    const [filters, setFilters] = useState({
        status: '',
        type: '',
        tenantName: ''
    })

    const handleFilterChange = (e) => {
        const { name, value } = e.target
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value
        }))
    }

    const filterHouses = () => {
        console.log("filters", filters)
    }

    return (
        <div>
            <Row>
                <Col className='mb-3' md={4}>
                    <Form.Select size='sm' name="status" value={filters.status} onChange={handleFilterChange}>
                        <option value=''>All Houses</option>
                        <option value='vacant'>Vacant Houses</option>
                        <option value='occupied'>Occupied Houses</option>
                    </Form.Select>
                </Col>
                <Col className='mb-3' md={4}>
                    <Form.Select size='sm' name="type" value={filters.type} onChange={handleFilterChange}>
                        <option value=''>All types</option>
                        <option value='0'>Residential</option>
                        <option value='1'>Commercial</option>
                    </Form.Select>
                </Col>
                <Col>
                    <InputGroup className="mb-3">
                        <Form.Control
                            placeholder="Enter Tenant's Name"
                            aria-label="Tenant's Name"
                            size='sm'
                            name="tenantName"
                            value={filters.tenantName}
                            onChange={handleFilterChange}
                        />
                    </InputGroup>
                </Col>
            </Row>
            <Row>
                <Col className='mb-3' md={4}>
                    <Button variant='secondary' size='sm' onClick={filterHouses}>
                        Go
                    </Button>
                </Col>
            </Row>
        </div>
    )
}

export default HouseFilters
