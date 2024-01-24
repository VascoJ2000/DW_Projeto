const { Router } = require('express');
const controller = require('./controller');
const authMW = require('../auth/middleware');

const router = Router();

router.get('/info', (req, res) => {
    res.send('Income Router');
});

router.get('/popular/:page', authMW.verifyAccess, controller.getMoviesPopular);
router.get('/top/:page', authMW.verifyAccess, controller.getMoviesTopRated);
router.get('/upcoming/:page', authMW.verifyAccess, controller.getMoviesUpcoming);

router.get('/:id', authMW.verifyAccess, controller.getMovie);
router.get('/:keyword&:page', authMW.verifyAccess, controller.getMovie);


module.exports = router;