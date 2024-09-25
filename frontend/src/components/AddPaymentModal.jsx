import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const AddPaymentModal = ({ showPaymentModal, handleClosePaymentModal, addPayment, paymentToEdit, allTenants }) => {
    const [paymentData, setPaymentData] = useState({
        tenant_id: '',
        house_number: '',
        amount_paid: '',
        amount_due: '',
        full_payment: false,
        balance: '',
        payment_mode: '',
        date_paid: '',
        month: ''
    });

    useEffect(() => {
        if (paymentToEdit) {
            setPaymentData({
                tenant_id: paymentToEdit.tenant_id,
                house_number: paymentToEdit.house_number,
                amount_paid: paymentToEdit.amount_paid,
                amount_due: paymentToEdit.amount,
                full_payment: paymentToEdit.full_payment,
                balance: paymentToEdit.balance,
                payment_mode: paymentToEdit.payment_mode,
                date_paid: paymentToEdit.date_paid,
                month: paymentToEdit.month
            });
        } else {
            setPaymentData({
                tenant_id: '',
                house_number: '',
                amount_paid: '',
                amount_due: '',
                full_payment: false,
                balance: '',
                payment_mode: '',
                date_paid: '',
                month: ''
            });
        }
    }, [paymentToEdit]);


    const months = [
        'January', 'February', 'March', 'April', 'May', 'June', 
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const handlePaymentDataChange = (e) => {
        const { name, value, type, checked } = e.target;
        setPaymentData((prevData) => {
            let newData = { ...prevData, [name]: type === 'checkbox' ? checked : value };

            if (name === 'tenant_id') {
                const selectedTenant = allTenants.find((tenant) => tenant._id === value);
                if (selectedTenant) {
                    console.log("selectedTenant", selectedTenant);
                    newData = {
                        ...newData,
                        house_number: selectedTenant.house,
                        amount_due: selectedTenant.tenantRent,
                        balance: selectedTenant.tenantRent - newData.amount_paid
                    };
                } else {
                    newData = {
                        ...newData,
                        house_number: '',
                        amount: '',
                        balance: ''
                    };
                }
            }

            if (name === 'full_payment') {
                const selectedTenant = allTenants.find((tenant) => tenant._id === prevData.tenant_id);
                if (selectedTenant) {
                    if (checked) {
                        newData = {
                            ...newData,
                            amount_paid: selectedTenant.tenantRent,
                            balance: 0
                        };
                    } else {
                        newData = {
                            ...newData,
                            amount_paid: '',
                            balance: selectedTenant.tenantRent
                        };
                    }
                }
            }

            if (name === 'amount_paid' && !prevData.full_payment) {
                const selectedTenant = allTenants.find((tenant) => tenant._id === prevData.tenant_id);
                if (selectedTenant) {
                    newData = {
                        ...newData,
                        balance: selectedTenant.rent - value
                    };
                }
            }

            return newData;
        });
    };

    const handleAddPayment = (e) => {
        e.preventDefault();
        console.log("paymentData", paymentData);
        addPayment(paymentData);
        // handleClosePaymentModal();
    };

    return (
        <Modal show={showPaymentModal} onHide={handleClosePaymentModal} centered>
            <Modal.Header closeButton>
                <Modal.Title>{paymentToEdit ? "Edit Payment" : "Add Payment"}</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Tenant</Form.Label>
                        {allTenants.length > 0 ? (
                            <Form.Select name="tenant_id" value={paymentData.tenant_id} onChange={handlePaymentDataChange}>
                                <option value="">Select Tenant</option>
                                {allTenants.map((tenant) => (
                                    <option key={tenant._id} value={tenant._id}>{tenant.tenantName}</option>
                                ))}
                            </Form.Select>
                        ) : (
                            <Form.Control type="text" placeholder="No tenants available" disabled />
                        )}
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>House Number</Form.Label>
                        <Form.Control type="text" name="house_number" value={paymentData.house_number} disabled />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Amount Due</Form.Label>
                        <Form.Control type="text" name="amount" value={paymentData.amount_due} disabled />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Payment for Month</Form.Label>
                        <Form.Select name="month" value={paymentData.month} onChange={handlePaymentDataChange}>
                            {months.map((month, index) => (
                                <option key={index} value={month}>{month}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Full Payment</Form.Label>
                        <Form.Check
                            type="checkbox"
                            name="full_payment"
                            checked={paymentData.full_payment}
                            onChange={handlePaymentDataChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Amount Paid</Form.Label>
                        <Form.Control
                            type="text"
                            name="amount_paid"
                            value={paymentData.amount_paid}
                            disabled={paymentData.full_payment}
                            onChange={handlePaymentDataChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Balance</Form.Label>
                        <Form.Control type="text" name="balance" value={paymentData.balance} disabled />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Payment Mode</Form.Label>
                        <Form.Control type="text" name="payment_mode" value={paymentData.payment_mode} onChange={handlePaymentDataChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Date Paid</Form.Label>
                        <Form.Control type="date" name="date_paid" value={paymentData.date_paid} onChange={handlePaymentDataChange} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClosePaymentModal}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleAddPayment}>
                    {paymentToEdit ? "Update" : "Add"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddPaymentModal;