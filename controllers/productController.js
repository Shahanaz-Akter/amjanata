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
    let products = await Product.find({});
    res.render('product/product_list.ejs', { products });
}


const category = async (req, res) => {
    let upc_code = '1201';

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

const manualAddProduct = async (req, res) => {
    // console.log('hi');

    let data = await Category.find({});
    // console.log(data);

    res.render('product/add_product.ejs', { data });
};


const postAddProduct = async (req, res) => {
    try {
        const { sku_code, upc_code, name, category_name, product_type, buying_price, selling_price, discount, date, total_qty, price, old_price, description, colorVariants, sizeVariants } = req.body;
        let sec_img = [];
        let img = req.files['secondary_image'];

        if (img) {
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
        // console.log(result);

        await Product.create(result);
        res.redirect('/product/product_list');
    }

    catch (err) {
        console.log("Error: ", err);
    }

}



const getCategory = async (req, res) => {
    try {
        let { tagInnerText } = req.body;
        // console.log(tagInnerText);

        let category = await Category.findOne({ category_name: tagInnerText });
        let upc_code = category.upc_code;
        // Fetch category data from the database here

        res.send({
            success: true,
            u_code: upc_code,
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


module.exports = { productList, category, postAddProduct, addProduct, manualAddProduct, postCategory, getCategory }
