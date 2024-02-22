const asyncHandler = require('express-async-handler');
const bodyParser = require('body-parser');

const userView = async (req, res) => {

    res.render('user/index.ejs');
}
const category = async (req, res) => {

    res.render('user/grocery.ejs');
}

const master = async (req, res) => {
    res.render('layouts/master.ejs');

}

module.exports = { userView, master, category }