const express = require('express');
const router = express.Router();

const { userView, master, category } = require('../controllers/userController');


router.get('/', userView);
router.get('/index', userView);
router.get('/master', master);
router.get('/category', category);


module.exports = router;