const asyncHandler = require('express-async-handler');
const bodyParser = require('body-parser');

const addProduct = async (req, res) => {
    let error1 = req.query.error1;
    let error2 = req.query.error2;
    let error3 = req.query.error3;
    // console.log(error1);

    res.render('product/add_product.ejs', { error1, error2, error3 });
};



module.exports = { addProduct }
