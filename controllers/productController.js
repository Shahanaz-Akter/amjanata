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
    let { parent_category, sub_category, category, upc_code } = req.body;
    try {
        let newCategory = await Category.create({
            category_image: req.files['category_image'] ? '/front_assets/new_images/' + req.files['category_image'][0].filename : null,
            parent_category: parent_category,
            sub_category: sub_category,
            category: category,
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

    let parent_cate = data.parent_category;
    let sub_cate = data.sub_category;
    let cate = data.category;
    let upc_code = data.upc_code;
    let timestamp = Date.now().toString(); // Get the current timestamp as a string
    let sku_code = upc_code + timestamp;
    res.render('product/add_productt.ejs', { sku_code, upc_code, parent_cate, sub_cate, cate });
};

const manualAddProduct = async (req, res) => {
    // console.log('hi');
    let data = await Category.find({});
    // console.log(data);
    res.render('product/add_product.ejs', { data });
};

const postAddProduct = async (req, res) => {

    let sku, upc;

    try {
        const { sku_code, upc_code, name, parent_category, sub_category, category, product_type, buying_price, selling_price, discount, date, total_qty, price, old_price, description, colorVariants, sizeVariants } = req.body;
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

        if (upc_code === '') {
            let latestCategory = await Category.findOne({}).sort({ createdAt: -1 });
            let latest_upc_code = parseInt(latestCategory.upc_code);
            // console.log('before');
            // console.log(latest_upc_code);

            // latest_upc_code = isNaN(latest_upc_code) ? 0 : latest_upc_code;
            latest_upc_code++;
            // console.log('after');
            // console.log(latest_upc_code);

            // Ensure the UPC code is formatted as a 4-digit string with leading zeros
            upc = latest_upc_code.toString().padStart(4, '0');
            // console.log('Updated UPC: ', upc);

            // Generate the timestamp
            let timestamp = Date.now().toString();

            // Concatenate the UPC code with the timestamp to create the SKU code
            sku = upc + timestamp;
        }

        let result = {
            'sku_code': sku_code ? sku_code : sku,
            'upc_code': upc_code ? upc_code : upc,
            'name': name,
            'parent_category': parent_category ? parent_category : null,
            'sub_category': sub_category ? sub_category : null,
            'category': category ? category : null,
            'product_type': product_type ? product_type : null,
            'buying_price': buying_price,
            'selling_price': selling_price,
            'discount': discount ? discount : null,
            'date': date,
            'total_qty': total_qty ? total_qty : null,
            'price': price ? price : null,
            'category_image': req.files['category_image'] ? '/front_assets/new_images/' + req.files['category_image'][0].filename : null,
            'old_price': old_price ? old_price : null,
            'primary_image': req.files['primary_image'] ? '/front_assets/new_images/' + req.files['primary_image'][0].filename : null,
            'secondary_image': sec_img ? sec_img : null,
            'description': description ? description : null,
            'colorVariants': colorVariants ? colorVariants : null,
            'sizeVariants': sizeVariants ? sizeVariants : null,
            'product_code': Math.floor(Math.random() * 1000) + 1,
        }
        // console.log(result);
        await Product.create(result);


        let newCategory = await Category.create({
            category_image: req.files['category_image'] ? '/front_assets/new_images/' + req.files['category_image'][0].filename : null,
            parent_category: parent_category,
            sub_category: sub_category,
            category: category,
            upc_code: upc_code ? upc_code : upc,
        });
        res.redirect('/product/product_list');

    }

    catch (err) {
        console.log("Error: ", err);
    }
}

// from axios calling
const getCategory = async (req, res) => {
    // console.log('jjj');
    try {
        let { tagInnerText } = req.body;
        console.log(tagInnerText);

        let category = await Category.findOne({ parent_category: tagInnerText });

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
