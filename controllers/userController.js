const asyncHandler = require('express-async-handler');
const bodyParser = require('body-parser');
let parentCategory = require('../models/parentcategory');
let subCategory = require('../models/subcategory');
let Category = require('../models/category');
let Product = require('../models/product');


const userView = async (req, res) => {
    let category = await Category.find({});
    let product = await Product.find({});
    // console.log(category);
    res.render('user/index.ejs', { category, product });
}

const category = async (req, res) => {
    res.render('user/grocery.ejs');
}


const master = async (req, res) => {
    res.render('layouts/master.ejs');

}

module.exports = { userView, master, category }