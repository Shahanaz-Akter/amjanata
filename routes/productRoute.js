const express = require('express');
const router = express.Router();
// const multer = require('multer');
const { addProduct } = require('../controllers/productController');

const upload = require('../multer');

router.get('/add_product', addProduct);

module.exports = router;