const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
        unique: false

    },
    buying_price: {
        type: Number,
        required: true,
        unique: false
    },
    selling_price: {
        type: Number,
        required: true,
        unique: false
    },
    discount: {
        type: Number,
        required: false
    },
    product_category: {
        type: String,
        required: true,
        unique: false
    },
    primary_image: {
        type: String,
        required: true,
        unique: false
    },
    category_image: {
        type: String,
        required: true,
        unique: false
    },
    secondary_image: {
        type: [String],
        required: true,
        unique: false
    },
    description: {
        type: String,
        required: false,
        unique: false
    },

    product_type: {
        type: String,
        required: false,
        unique: false
    },
    colorVariants: {
        type: [String],
        required: false,
        unique: false
    },
    sizeVariants: {
        type: [String],
        required: false,
        unique: false
    },
    total_qty: {
        type: Number,
        required: false,
        unique: false
    },
    product_code: {
        type: Number,
        required: false,
        unique: false
    },
    date: {
        type: String,
        required: false,
        unique: false
    },
    quantitys: {
        type: Number,
        required: false,
        unique: false
    },
    old_price: {
        type: Number,
        required: false,
        unique: false
    },
    price: {
        type: Number,
        required: false,
        unique: false
    },
    sku_code: {
        type: Number,
        required: false,
        unique: false
    },
    uc_code: {
        type: Number,
        required: false,
        unique: false
    },

    createdAt: {
        type: Date,
        default: Date.now
    },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;


