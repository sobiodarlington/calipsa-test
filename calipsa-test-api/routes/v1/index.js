'use strict';

const router = require('express').Router();
const UserRoutes = require('./users');
const GamePlayRoutes = require('./game-play');


router.get('/', (req, res) => {
    res.send("You've reached /v1 routes");
});

// User management Routes
router.use(UserRoutes);
router.use(GamePlayRoutes);

module.exports = router;
