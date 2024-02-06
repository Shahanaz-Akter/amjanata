const mongoose = require('mongoose');

const crmSchema = new mongoose.Schema({

    logo_image: {
        type: String,
        required: false,
        unique: false,

    },
    banner_image: {
        type: [String],
        required: false,
        unique: false,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});



const Crm = mongoose.model('Crm', crmSchema);
module.exports = Crm;