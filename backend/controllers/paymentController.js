const Payment = require('../models/paymentModel');
const House = require('../models/houseModel');


const paymentController = {
    addPayment: async (req, res) => {
        try {
            console.log("req", req.body)
            const { tenant_id, house_number, amount_due, amount_paid, balance, date_paid, full_payment, payment_mode, month } = req.body;
            const house_id = await House.findOne({ house_number: house_number }).select('_id');
            console.log("house id",house_id )
            if (!house_id) return res.status(400).json({ msg: "House does not exist." });
            
            const payment = await Payment.findOne({ tenant_id, house_id, month });
            if (payment) return res.status(400).json({ msg: "Payment already exists for this month. Please update instead." });

            const newPayment = new Payment({
                tenant_id, house_id, amount_due, amount_paid, balance, date_paid, full_payment, payment_mode, month
            });
            console.log("newPayment", newPayment);
            await newPayment.save();

            return res.status(201).json({
                payment: {
                    tenant_id: newPayment.tenant_id,
                    house_id: newPayment.house_id,
                    amount_due: newPayment.amount_due,
                    amount_paid: newPayment.amount_paid,
                    balance: newPayment.balance,
                    date_paid: newPayment.date_paid,
                    full_payment: newPayment.full_payment,
                    payment_mode: newPayment.payment_mode,
                    month: newPayment.month
                },
                msg: "Payment added successfully!"
            })

        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getPayments: async (req, res) => {
        try {
            const payments = await Payment.find()
                .populate({
                    path: 'house_id',
                    select: 'house_number'
                })
                .populate({
                    path: 'tenant_id',
                    select: 'tenantName' 
                });
    
            res.json(payments);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },    
    getPayment: async (req, res) => {
        try {
            const payment = await Payment.findById(req.params.id);
            res.json(payment);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    updatePayment: async (req, res) => {
        try {
            const { tenant_id, house_id, amount, month, year } = req.body;
            
            const payment = await Payment.findOne({ tenant: tenant_id, house: house_id, month, year });

            if (!payment) return res.status(400).json({ msg: "Payment does not exist for this month. Please add instead." });

            await Payment.findOneAndUpdate({ _id: req.params.id }, {
                tenant: tenant_id, house: house_id, amount, month, year
            });

            res.json({ msg: "Payment updated successfully!" });

        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    deletePayment: async (req, res) => {
        try {
            const payment = await Payment.findById(req.params.id);

            if (!payment) return res.status(400).json({ msg: "Payment does not exist." });

            await Payment.findByIdAndDelete(req.params.id);

            res.json({ msg: "Payment deleted successfully!" });

        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }

}


module.exports = paymentController;