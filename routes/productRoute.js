const express = require('express');
const router = express.Router();
// const multer = require('multer');
const { productList, category, postAddProduct, addProduct, postCategory } = require('../controllers/productController');

const upload = require('../multer');


router.get('/product_list', productList);
router.get('/category', category);
router.post('/post_category', upload.fields([{ name: 'category_image', maxCount: 1 },]), postCategory);

router.get('/add_product/:id', addProduct);
router.post('/post_add_product', upload.fields([
    { name: 'primary_image', maxCount: 1 },
    { name: 'category_image', maxCount: 1 },
    { name: 'secondary_image', maxCount: Infinity }
]), postAddProduct);
module.exports = router;