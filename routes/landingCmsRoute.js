

const express = require('express');
const router = express.Router();

const { landingPageCms, postLandingCms, productCms, socialCms, cartCms } = require('../controllers/landingCmsController');
const upload = require('../multer');


router.get('/landing_page_cms', landingPageCms);
// discount_image upper_banner logo_image feature_brands coupon_image deals_image crazy_deals

router.post('/post_landing_page_cms', upload.fields(
    [{ name: 'discount_image', maxCount: 1 },
    { name: 'upper_banner', maxCount: Infinity },
    { name: 'logo_image', maxCount: 1 },
    { name: 'feature_brands', maxCount: 1 },
    { name: 'coupon_image', maxCount: 1 },
    { name: 'deals_image', maxCount: 1 },
    { name: 'crazy_deals', maxCount: 1 }
    ]
), postLandingCms);
router.get('/product_cms', productCms);
router.get('/social_cms', socialCms);
router.get('/cart_cms', cartCms);

module.exports = router;