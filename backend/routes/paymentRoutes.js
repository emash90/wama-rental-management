const router = require('express').Router();
const paymentController = require('../controllers/paymentController');

router.post('/add_payment', paymentController.addPayment);
router.get('/get_payments', paymentController.getPayments);
router.get('/get_payment/:id', paymentController.getPayment);
router.put('/update_payment/:id', paymentController.updatePayment);
router.delete('/delete_payment/:id', paymentController.deletePayment);


module.exports = router;