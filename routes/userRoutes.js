const router = require("express").Router();
const verify = require('../middleware/auth');
const cart = require('../userControllers/addToCart');
const wishList = require('../userControllers/wishListController');
const product = require('../userControllers/productController');
const user = require('../userControllers/userController');
const checkout = require('../userControllers/checkOutController');

/************ create user and login *************/
router.post('/createUser',verify.createUserValidate, user.createUser);
router.post('/loginUser', verify.loginValidation,user.loginUser);

/**************** wishlist *************/
router.post('/createWishlist', verify.authenticate, wishList.addToWishList);
router.get('/displayWishList', verify.authenticate, wishList.displayWishList);
router.delete('/deleteWishList', verify.authenticate, wishList.deleteWishList);

/************ cart *************/
router.get('/displayItems', verify.authenticate, product.displaySingleProduct);
router.post('/addToCart', verify.authenticate, cart.addToCart);
router.get('/displayMyCart', verify.authenticate, cart.displayMyCart);
router.put('/updateCart', verify.authenticate, cart.updateMyCart);
router.delete('/deleteItemFromCart', verify.authenticate, cart.deleteItemFromCart)
router.delete('/dropMyCart', verify.authenticate, cart.deleteMyCart);

/********* checkOut ***********/
router.post('/checkOutOrder', verify.authenticate, checkout.orderCheckOut);
router.get('/displayOrderDetail', verify.authenticate, checkout.displayOrderDetail);


module.exports = router;