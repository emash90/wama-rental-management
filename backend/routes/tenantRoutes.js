const router = require('express').Router();
const tenantController = require('../controllers/tenantController');

router.post('/add_tenant', tenantController.add_tenant);
router.get('/get_tenants', tenantController.getTenants);
router.get('/get_tenant/:id', tenantController.getTenant);
router.put('/update_tenant/:id', tenantController.updateTenant);
router.delete('/delete_tenant/:id', tenantController.deleteTenant);


module.exports = router;