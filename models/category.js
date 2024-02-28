const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({


    parent_category: {
        type: String,
        required: false
    },
    sub_category: {
        type: String,
        required: false
    },
    category: {
        type: String,
        required: false
    },
    upc_code: {
        type: String,
        required: false,
    },
    category_image: {
        type: String,
        required: false,

    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});



module.exports = mongoose.model('Category', categorySchema);
