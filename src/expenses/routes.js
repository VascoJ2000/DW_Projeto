const { Router } = require('express');
const controller = require('./controller');
const authMW = require('../auth/middleware');

const router = Router();

router.get('/info', (req, res) => {
    res.send('Expenses Router');
});

router.get('/',  authMW.verifyAccess, controller.getExpenseByUserID);
router.post('/',  authMW.verifyAccess, controller.addExpense);
router.get('/:id',  authMW.verifyAccess, controller.getExpenseByID);
router.delete('/:id',  authMW.verifyAccess, controller.removeExpense);
router.put('/:id',  authMW.verifyAccess, controller.updateExpense);

module.exports = router;