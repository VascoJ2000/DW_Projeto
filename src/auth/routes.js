const { Router } = require('express');
const controller = require('./controller');
const authMW = require('./middleware')

const router = Router();

router.get('/info', (req, res) => {
    res.send('Auth Router');
});

router.post('/login', controller.logIn);
router.delete('/logout', authMW.verifyRefresh, controller.logOut);
router.get('/token', authMW.verifyRefresh, controller.refreshAccess);

module.exports = router;