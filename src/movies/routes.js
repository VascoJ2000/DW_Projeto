const { Router } = require('express');
const controller = require('./controller');

const router = Router();

router.get('/info', (req, res) => {
    res.send('Income Router');
});

router.get('/popular/:page', controller.getMoviesPopular);
router.get('/top/:page', controller.getMoviesTopRated);
router.get('/upcoming/:page', controller.getMoviesUpcoming);

router.get('/:id', controller.getMovie);
router.get('/:keyword&:page', controller.getMovie);


module.exports = router;