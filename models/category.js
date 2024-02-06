const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({

    category_image: {
        type: String,
        required: false,

    },
    category_name: {
        type: String,
        required: false
    },
    upc_code: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});



module.exports = mongoose.model('Category', categorySchema);
