const express = require('express');
const router = express.Router();

const { userView, master } = require('../controllers/userController');


router.get('/', userView);
router.get('/index', userView);
router.get('/master', master);


module.exports = router;