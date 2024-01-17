const { Router } = require('express');
const controller = require('./controller');
const authMW = require('../auth/middleware');

const router = Router();

router.get('/info', (req, res) => {
    res.send('Income Router');
});

router.get('/', authMW.verifyAccess, controller.getNightByUserID);
router.post('/', authMW.verifyAccess, controller.addMovieNight);
router.get('/:id', authMW.verifyAccess, controller.getNightByID);
router.delete('/:id', authMW.verifyAccess, controller.removeMovieNight);
router.put('/:id', authMW.verifyAccess, controller.updateMovieNight);

router.post('/users/:id', authMW.verifyAccess, controller.addUserToNight);
router.put('/users/:id', authMW.verifyAccess, controller.confirmUserNight);
router.delete('/users/:id', authMW.verifyAccess, controller.removeUserNight);

router.put('/host/:id', authMW.verifyAccess, controller.updateNightHost);

module.exports = router;