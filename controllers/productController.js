const asyncHandler = require('express-async-handler');
const bodyParser = require('body-parser');
const Category = require('../models/category');
const Product = require('../models/product');


// const addProduct = async (req, res) => {
//     let error1 = req.query.error1;
//     let error2 = req.query.error2;
//     let error3 = req.query.error3;
//     // console.log(error1);


//     let upc_code = '0000';
//     let timestamp = Date.now().toString(); // Get the current timestamp as a string
//     let sku_code = upc_code + timestamp;

//     res.render('product/add_product.ejs', { error1, error2, error3, sku_code, upc_code });
// };


const productList = async (req, res) => {
    res.render('product/product_list.ejs');
}


const category = async (req, res) => {
    let upc_code = '0000';

    let record = await Category.find({}); //all records

    if (record.length > 0) {
        const latestCategory = await Category.findOne({}).sort({ createdAt: -1 });
        let latest_upc_code = parseInt(latestCategory.upc_code);

        // latest_upc_code = isNaN(latest_upc_code) ? 0 : latest_upc_code;
        latest_upc_code++;

        // Ensure the UPC code is formatted as a 4-digit string with leading zeros
        upc_code = latest_upc_code.toString().padStart(4, '0');
        // console.log('Updated UPC: ', upc_code);
    }

    // Generate the timestamp
    let timestamp = Date.now().toString();

    // Concatenate the UPC code with the timestamp to create the SKU code
    let sku_code = upc_code + timestamp;

    // latestCategory.upc_code = parseInt(upc_code) + 1;
    // console.log(latestCategory.upc_code);

    res.render('product/category.ejs', { upc_code, sku_code, record });
}


const postCategory = async (req, res) => {
    let { category_name, upc_code } = req.body;
    try {
        let newCategory = await Category.create({
            category_image: '/front_assets/new_images/' + req.files['category_image'][0].filename,
            category_name: category_name,
            upc_code: upc_code,
        });
        res.redirect('/product/category');
    }
    catch (err) {
        console.log(err);
        res.redirect('/product/category');
    }
}

const addProduct = async (req, res) => {
    // console.log('ssss');
    id = req.params.id;
    // console.log(id);
    let data = await Category.findById(id);
    // console.log(data);

    let cate_name = data.category_name;
    let upc_code = data.upc_code;
    let timestamp = Date.now().toString(); // Get the current timestamp as a string
    let sku_code = upc_code + timestamp;

    res.render('product/add_productt.ejs', { sku_code, upc_code, cate_name });
};

const postAddProduct = async (req, res) => {
    const { sku_code, upc_code, name, category_name, product_type, buying_price, selling_price, discount, date, total_qty, price, old_price, description, colorVariants, sizeVariants } = req.body;
    console.log(req.files);

    let sec_img = [];
    let img = req.files['secondary_image'];

    if (img) { // Check if files exist
        img.forEach(element => {
            // console.log('/front_assets/new_images/' + element.filename);
            sec_img.push('/front_assets/new_images/' + element.filename);
        });
    } else {
        console.log('No files uploaded with the name "secondary_image"');
    }
    let result = {
        'sku_code': sku_code,
        'upc_code': upc_code,
        'name': name,
        'category_name': category_name,
        'product_type': product_type,
        'buying_price': buying_price,
        'selling_price': selling_price,
        'discount': discount,
        'date': date,
        'total_qty': total_qty,
        'price': price,
        'category_image': '/front_assets/new_images/' + req.files['category_image'][0].filename,
        'old_price': old_price,
        'primary_image': '/front_assets/new_images/' + req.files['primary_image'][0].filename,
        'secondary_image': sec_img,
        'description': description,
        'colorVariants': colorVariants,
        'sizeVariants': sizeVariants,
        'product_code': Math.floor(Math.random() * 1000) + 1,
    }
    console.log(result);

    try {
        await Product.create(result);
    }
    catch (err) {
        console.log(err);
    }

    res.redirect('/product/product_list');
}

module.exports = { productList, category, postAddProduct, addProduct, postCategory }
