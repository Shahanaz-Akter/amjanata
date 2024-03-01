const asyncHandler = require('express-async-handler');
const bodyParser = require('body-parser');
let parentCategory = require('../models/parentcategory');
let subCategory = require('../models/subcategory');
let Category = require('../models/category');
let Product = require('../models/product');


const userView = async (req, res) => {
    // let category = await Category.find({});
    let product = await Product.find({});
    // console.log(category);

    let records = await Category.aggregate([
        {
            $addFields: {
                parent_category_id: { $toObjectId: "$parent_category_id" },
                sub_category_id: { $toObjectId: "$sub_category_id" }
            }
        },
        {
            $lookup: {
                from: "parentcategories",
                localField: "parent_category_id",
                foreignField: "_id",
                as: "parent"
            }
        },
        {
            $unwind: "$parent"
        },
        {
            $lookup: {
                from: "subcategories",
                localField: "sub_category_id",
                foreignField: "_id",
                as: "sub"
            }
        },
        {
            $unwind: "$sub"
        }
    ]);
    console.log(records);

    res.render('user/index.ejs', { records, product });
}

const category = async (req, res) => {
    res.render('user/grocery.ejs');
}


const master = async (req, res) => {
    res.render('layouts/master.ejs');

}

module.exports = { userView, master, category }