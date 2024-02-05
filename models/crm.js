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
    }
});



const Crm = mongoose.model('Crm', crmSchema);
module.exports = Crm;