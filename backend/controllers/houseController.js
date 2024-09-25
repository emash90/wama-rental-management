const House = require('../models/houseModel');

const houseController = {
    addHouse: async (req, res) => {
        try {
            const { house_number, house_type, house_location, house_price } = req.body;

            const house = await House.findOne({ house_number });
            console.log("house", house);
            if (house) return res.status(400).json({ msg: "The house number already exists." });

            const newHouse = new House({
                house_number, house_type, house_location, house_price
            });

            await newHouse.save();

            return res.status(201).json({
                house: {
                    house_number: newHouse.house_number,
                    house_type: newHouse.house_type,
                    house_location: newHouse.house_location,
                    house_price: newHouse.house_price
                },
                msg: "House added successfully!"
            })
        }
        catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getHouses: async (req, res) => {
        try {
            const houses = await House.find();
            res.json(houses);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getHouse: async (req, res) => {
        try {
            const house = await House.findById(req.params.id);
            res.json(house);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    updateHouse: async (req, res) => {
        try {
            const { house_number, house_type, house_location, house_price } = req.body;

            await House.findOneAndUpdate({ _id: req.params.id }, {
                house_number, house_type, house_location, house_price
            });

            res.status(200).json({ msg: "House updated successfully!" });

        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    deleteHouse: async (req, res) => {
        try {
            const house = await House.findById(req.params.id);
            if (!house) return res.status(400).json({ msg: "House not found!" });

            await House.findByIdAndDelete(req.params.id);
            res.status(200).json({ msg: "House deleted successfully!" });

        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
}

module.exports = houseController;