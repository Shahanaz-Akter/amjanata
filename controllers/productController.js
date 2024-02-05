const asyncHandler = require('express-async-handler');
const bodyParser = require('body-parser');

const addProduct = async (req, res) => {
    let error1 = req.query.error1;
    let error2 = req.query.error2;
    let error3 = req.query.error3;
    // console.log(error1);


    let upc_code = '0000';
    let timestamp = Date.now().toString(); // Get the current timestamp as a string
    let sku_code = upc_code + timestamp;

    res.render('product/add_product.ejs', { error1, error2, error3, sku_code, upc_code });
};

const postAddProduct = async (req, res) => {
    const { name, buying_price, selling_price, discount, product_category, description, product_type, colorVariants, sizeVariants, total_qty, product_code, date, quantitys, sku_code, uc_code } = req.body;

    let result = {
        'name': name,
        'buying_price': buying_price,
        'selling_price': selling_price,
        'discount': discount,
        'product_category': product_category,
        'description': description,
        'product_type': product_type,
        'colorVariants': colorVariants,
        'sizeVariants': sizeVariants,
        'total_qty': total_qty,
        'product_code': Math.floor(Math.random() * 1000) + 1,
        'date': date,
        'quantitys': quantitys,
        'sku_code': sku_code,
        'uc_code': Math.floor(Math.random() * 1000) + 1,
        'primary_image': null,
        'category_image': null,
        'secondary_image': null,

    }
    console.log(result);


    let images = req.files.primary_image;
    console.log(images);
    res.redirect('/');

    // let result = await models.Product.create({
    //     'name': req.body.name,
    //     'buying_price': req.body.buying_price,
    //     'selling_price': req.body.selling_price,
    //     'discount': req.body.discount,
    //     'product_category': req.body.product_category,
    //     'primary_image': '/front_assets/new_img/' + req.files['primary_image'][0].filename,
    //     'category_image': '/front_assets/new_img/' + req.files['category_image'][0].filename,
    //     'secondary_image': JSON.stringify(secondaryImages),
    //     'description': req.body.description,
    //     'product_type': req.body.product_type,
    //     'colorVariants': JSON.stringify(req.body.colorVariants),
    //     'sizeVariants': JSON.stringify(req.body.sizeVariants),
    //     'total_qty': req.body.total_qty,
    //     'product_code': Math.floor(Math.random() * 1000) + 1,
    //     'date': req.body.date,
    //     'quantitys': req.body.quantitys,
    // });
}


const productList = (req, res) => {
    res.render('product/product_list.ejs');
}


const category = (req, res) => {
    res.render('product/category.ejs');
}

module.exports = { addProduct, productList, category, postAddProduct }
