const WishList = require("../models/wishList");
const Product = require("../models/product");

// add to wishList
const addToWishList = (async (req, res) => {
    try {
        const user = await WishList.findOne({ user_id: req.body.id });
        const { product_id } = req.body;
        if (!user) {
            const data = await WishList({ user_id: req.body.id, product_id: product_id });
            data.save();
            let detail = "Added to wishlist";
            res.status(200).send({ detail });
        } else {
            if (user.product_id.indexOf(product_id) == -1) {
                await user.product_id.push(product_id);
                await user.save();
                let detail = "data inserted";
                res.status(200).send({ detail });
            } else {
                let detail = "already inserted";
                res.status(409).send({ detail });
            }
        }
    } catch (error) {

    }
})

// display wishList
const displayWishList = (async (req, res) => {
    const user = req.body.id;
    if (user) {
        const data = await WishList.findOne({ user_id: user });
        if (data) {
            let arr = [];
            for (let i = 0; i < data.product_id.length; i++) {
                let pro = data.product_id[i];
                let product = await Product.findOne({ _id: pro }).populate('categories');;
                arr.push(product);
            }
            res.json(arr);
        } else {
            let detail = "nothing in a wishlist";
            res.status(400).send({ detail });
        }
    } else {
        let detail = "data not found";
        res.status(404).send({ detail });
    }
})

// delete wishList
const deleteWishList = (async (req, res) => {
    const product_id = req.query.productId;
    const user = req.body.id;

    const data = await WishList.findOne({ user_id: user });
    let index = data.product_id.indexOf(product_id);
    // console.log(index)
    if (index) {
        data.product_id.splice(0, index);
        data.save();
        let detail = "data was deleted";
        res.send({ detail });
    } else {
        let detail = "data not found";
        res.status(404).send({ detail });
    }
})




module.exports = { addToWishList, displayWishList, deleteWishList }