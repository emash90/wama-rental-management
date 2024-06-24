const Payment = require('../models/paymentModel');


const paymentController = {
    addPayment: async (req, res) => {
        try {
            const { tenant_id, house_id, amount, month, year } = req.body;

            const payment = await Payment.findOne({ tenant: tenant_id, house: house_id, month, year });

            if (payment) return res.status(400).json({ msg: "Payment already exists for this month. Please update instead." });

            const newPayment = new Payment({
                tenant: tenant_id, house: house_id, amount, month, year
            });

            await newPayment.save();

            return res.status(201).json({
                payment: {
                    tenant: newPayment.tenant,
                    house: newPayment.house,
                    amount: newPayment.amount,
                    month: newPayment.month,
                    year: newPayment.year
                },
                msg: "Payment added successfully!"
            })

        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getPayments: async (req, res) => {
        try {
            const payments = await Payment.find();
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