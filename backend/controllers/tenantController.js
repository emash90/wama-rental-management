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
            // Aggregation pipeline
            let pipeline = [
                // First, lookup house details and unwind the result
                {
                    $lookup: {
                        from: "houses",                // Lookup from the houses collection
                        localField: "tenantHouse",     // Match tenant's house field
                        foreignField: "_id",           // Match house's _id field
                        as: "house"                    // The name for the joined data
                    }
                },
                {
                    $unwind: {                     
                        path: "$house",                 // Unwind the house field to get the first matching result
                        preserveNullAndEmptyArrays: true // Keep tenants even if they don't have house data
                    }
                },
    
                // Then, lookup payment details and unwind the result
                {
                    $lookup: {
                        from: "payments",               // Lookup from the payments collection
                        localField: "tenantId",              // Match tenant's _id with payment's tenantId field
                        foreignField: "_Id",       // The field in payments referencing tenant
                        as: "payments"                 // The name for the joined payment data
                    }
                },
                {
                    $unwind: {                     
                        path: "$payments",              // Unwind the payments field to get the first matching result
                        preserveNullAndEmptyArrays: true // Keep tenants even if they don't have payment data
                    }
                },
    
                // Now, project all the necessary fields
                {
                    $project: {
                        _id: 1,
                        tenantName: 1,  
                        tenantPhone: 1, 
                        tenantHouse: 1,
                        
                        house_number: "$house.house_number", 
                        house_location: "$house.house_location",
                        house_price: "$house.house_price",
                        
                        lastPaymentDate: "$payments.paymentDate",
                        lastPaymentAmount: "$payments.amount",
                        balance: "$payments.balance",
    
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