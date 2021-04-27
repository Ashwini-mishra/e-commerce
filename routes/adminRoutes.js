const router = require("express").Router();
const verify = require('../middleware/auth');
const categories = require('../adminControllers/addCategoriesController')
const product = require('../adminControllers/addProductController')

/****************** category ****************/
router.post('/createCategories', verify.adminAuthenticate, categories.addCategories);
router.put('/updateCategories', verify.adminAuthenticate, categories.updateCategories);
router.get('/displayCategories',  categories.displayCategories);
router.delete('/deleteCategories', verify.adminAuthenticate, categories.deleteCategories);

/******** product routes ***********/
router.post('/createProduct', verify.adminAuthenticate, product.addProduct);
router.put('/updateProduct', verify.adminAuthenticate, product.UpdateProduct);
router.get('/displayProduct', product.viewCategoriesProduct);
router.delete('/deleteProduct', verify.adminAuthenticate, product.deleteProduct);
router.get("/viewAllProduct",product.viewAllProduct);

module.exports = router;