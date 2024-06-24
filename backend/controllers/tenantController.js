const Tenant = require('../models/tenantModel');

const tenantController = {
    add_tenant: async (req, res) => {
        try {
            const { name, email, phone, house, rent } = req.body;

            const tenant = await Tenant.findOne({ phone });

            if (tenant) return res.status(400).json({ msg: "The phone number already exists." });

            const newTenant = new Tenant({
                name, email, phone, house, rent
            });

            await newTenant.save();

            return res.status(201).json({
                tenant: {
                    name: newTenant.name,
                    email: newTenant.email,
                    phone: newTenant.phone,
                    house: newTenant.house,
                    rent: newTenant.rent
                },
                msg: "Tenant registered successfully!"
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getTenants: async (req, res) => {
        try {
            const tenants = await Tenant.find();
            res.json(tenants);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getTenant: async (req, res) => {
        try {
            const tenant = await Tenant.findById(req.params.id);
            res.json(tenant);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    updateTenant: async (req, res) => {
        try {
            const { name, email, phone, address, room, price } = req.body;

            await Tenant.findOneAndUpdate({ _id: req.params.id }, {
                name, email, phone, address, room, price
            });

            res.json({ msg: "Tenant updated successfully!" });

        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    deleteTenant: async (req, res) => {
        try {
            const tenant = await Tenant.findById(req.params.id);
            if (!tenant) return res.status(400).json({ msg: "Tenant does not exist." });
            
            await Tenant.findByIdAndDelete(req.params.id);

            res.json({ msg: "Tenant deleted successfully!" });

        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }

}

module.exports = tenantController;