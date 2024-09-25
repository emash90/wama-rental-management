const Tenant = require('../models/tenantModel');
const House = require('../models/houseModel');

const tenantController = {
    add_tenant: async (req, res) => {
        try {
            console.log("req.body", req.body);
            const { tenantName, tenantPhone, tenantHouse, tenantRent } = req.body;

            const tenant = await Tenant.findOne({ tenantPhone });
            console.log("tenant", tenant);
            if (tenant) {
                return res.status(400).json({ msg: "The phone number already exists." });
            }

            const newTenant = new Tenant({
                tenantName, tenantPhone, tenantHouse, tenantRent
            });
            console.log("newTenant", newTenant);

            await newTenant.save();
            return res.status(201).json({
                tenant: {
                    tenantName: newTenant.tenantName,
                    tenantPhone: newTenant.tenantPhone,
                    tenantHouse: newTenant.tenantHouse,
                    tenantRent: newTenant.tenantRent
                },
                msg: "Tenant registered successfully!"
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getTenants: async (req, res) => {
        try {
            let pipeline = [
                {
                    $lookup: {
                        from: "houses",
                        localField: "tenantHouse",
                        foreignField: "_id",
                        as: "house"
                    }
                },
                {
                    $unwind: {                     
                        path: "$house",
                        preserveNullAndEmptyArrays: true 
                    }
                },
                {
                    $project: {
                        _id: 1,                  
                        tenantName: 1,
                        tenantPhone: 1,                    
                        tenantHouse: 1,             
                        house_number: "$house.house_number", 
                        house_location: "$house.house_location",
                        house_price: "$house.house_price",
                        createdAt: 1 
                    }
                },
                {
                    $sort: { 
                        createdAt: -1
                    }
                }
            ];

            const tenants = await Tenant.aggregate(pipeline);
            console.log("tenants", tenants);
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