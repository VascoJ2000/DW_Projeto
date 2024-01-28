const { Router } = require('express');
const controller = require('./controller');
const authMW = require('../auth/middleware');

const router = Router();

router.get('/info', (req, res) => {
    res.send('User Router');
});

router.post('/', controller.addUser);
router.get('/', authMW.verifyAccess, controller.getUserByID);
router.delete('/', authMW.verifyAccess, controller.removeUser);
router.put('/', authMW.verifyAccess, controller.updateUser);
router.put('/role', [authMW.verifyAccess, authMW.isAdmin], controller.updateUser);

router.get('/friendlist', authMW.verifyAccess, controller.getFriendlist);
router.put('/friendlist', authMW.verifyAccess, controller.addFriend);
router.delete('/friendlist', authMW.verifyAccess, controller.removeFriend);

module.exports = router;