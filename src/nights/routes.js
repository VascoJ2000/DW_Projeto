const { Router } = require('express');
const controller = require('./controller');
const authMW = require('../auth/middleware');

const router = Router();

router.get('/info', (req, res) => {
    res.send('Income Router');
});

router.get('/', authMW.verifyAccess, controller.getIncomeByUserID);
router.post('/', authMW.verifyAccess, controller.addIncome);
router.get('/:id', authMW.verifyAccess, controller.getIncomeByID);
router.delete('/:id', authMW.verifyAccess, controller.removeIncome);
router.put('/:id', authMW.verifyAccess, controller.updateIncome);

module.exports = router;