const Mycart = require("../models/myCart");
const Product = require("../models/product");


/************************  Add to cart ************************/
const addToCart = (async (req, res) => {
    const products = [];
    const mycart = await Mycart.findOne({ user_id: req.body.id });
    const { product_id, quantity } = req.body;

    if (!mycart) {
        if (product_id !== "") {
            const product = await Product.findOne({ _id: product_id })

            products.push({ product_id: product_id, price: product.price, quantity: quantity });
            const user_id = req.body.id;

            const data = await Mycart({ user_id: user_id, products: products });
            data.save();
            let detail = "Added to cart";
            res.send({ detail });
        } else {
            let detail = "product is empty";
            res.send({ detail });
        }
    } else {

        const pro = mycart.products.find((element) => {
            return element.product_id.includes(req.body.product_id);
        })

        if (!pro) {
            const product = await Product.findOne({ _id: product_id })
            await mycart.products.push({ product_id: product_id, price: product.price, quantity: quantity });
            await mycart.save();
            const detail = "inserted into cart";
            res.send({ detail });
        } else {
            let detail = "already in a cart";
            res.send({ detail });
        }
    }
})


/************************  display cart ************************/
const displayMyCart = (async (req, res) => {
    const user = req.body.id;
    const userCart = await Mycart.findOne({ user_id: user });

    if (userCart) {
        let arr = [];
        for (let i = 0; i < userCart.products.length; i++) {
            let pro = userCart.products[i].product_id;
            let product = await Product.findOne({ _id: pro }).populate('categories');
            arr.push(product);
        }
        res.json(arr);
    } else {
        let detail = "nothing in a cart";
        res.status(400).send({ detail });
    }
})

/************************  delete the cart ************************/
const deleteItemFromCart = (async (req, res) => {
    const product_id = req.query.productId;
    const user = req.body.id;
    const detail = '';
    const data = await Mycart.findOne({ user_id: user });
    for (let i in data.products) {
        if (data.products[i].product_id.includes(product_id)) {
            data.products.splice(i, 1);
            await data.save();
            detail = "data deleted";
        }
    }
    if (detail) {
        res.send({ detail });

    } else {
        let detail = "data not found";
        res.status(404).send({ detail });
    }
})

/************************  update myCart ************************/
const updateMyCart = (async (req, res) => {
    const quantity = req.query.quantity;
    const product_id = req.query.productId;
    const user = req.body.id;
    const mycart = await Mycart.findOne({ user_id: user });
    const product = mycart.products.find(x => {
        if (x.product_id == product_id) {
            x.quantity = quantity;
            mycart.save();
            return true;
        }
    })
    if (product) {
        let detail = "data is updated";
        res.status(200).send({ detail });
    } else {
        let detail = "data not found";
        res.status(404).send({ detail });
    }
})

/************************  drop cart ************************/
const deleteMyCart = (async (req, res) => {
    const user = req.body.id;
    const cart = await Mycart.findOneAndDelete({ user_id: user });
    if (cart) {
        const detail = "Deleted";
        res.status(404).send({ detail });
    } else {
        const detail = "data not found";
        res.status(404).send({ detail });
    }
})


module.exports = {
    addToCart,
    displayMyCart,
    deleteItemFromCart,
    updateMyCart,
    deleteMyCart
};