const router = require('express').Router();

const houseController = require('../controllers/houseController');

router.post('/add_house', houseController.addHouse);
router.get('/get_houses', houseController.getHouses);
router.get('/get_house/:id', houseController.getHouse);
router.put('/update_house/:id', houseController.updateHouse);
router.delete('/delete_house/:id', houseController.deleteHouse);


module.exports = router;