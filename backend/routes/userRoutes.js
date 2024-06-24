const Router = require('express').Router;
const router = Router();

const userController = require('../controllers/userController');


router.post('/register', userController.register);

router.post('/login', userController.login);

module.exports = router;