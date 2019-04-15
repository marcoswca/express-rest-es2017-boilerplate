const express = require('express');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');
const swaggerDoc = require('../../../config/swagger');


const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'));

/**
 * GET v1/docs
 */
// router.use('/docs', express.static('docs'));
router.use('/docs', swaggerDoc());

router.use('/users', userRoutes);
router.use('/auth', authRoutes);

module.exports = router;
