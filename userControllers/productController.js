const Product = require("../models/product");


// display single product
const displaySingleProduct = (async (req, res) => {
    let id = req.query.product_id;
    let data = await Product.findOne({ _id: id }).populate('categories');;
    if (data) {
        res.send(data);
    } else {
        let detail="data not found";
            res.status(404).send({detail});
    }
})
module.exports = { displaySingleProduct };