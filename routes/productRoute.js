const express = require('express');
const router = express.Router();
// const multer = require('multer');
const { addProduct, productList, category, postAddProduct } = require('../controllers/productController');

const upload = require('../multer');

router.get('/add_product', addProduct);
router.post('/post_add_product', upload.fields([
    { name: 'primary_image', maxCount: 1 },
    { name: 'category_image', maxCount: 1 },
    { name: 'secondary_image', maxCount: Infinity }
]), postAddProduct);

router.get('/product_list', productList);
router.get('/category', category);


module.exports = router;