const Product = require("../models/product");

/************************  add products according to categories ************************/
const addProduct = (async (req, res) => {
    const { p_name, price, categories, description, image, colour, size } = req.body;
    if (categories !== "") {
        const data = await Product({ p_name: p_name, price: price, categories: categories, description: description, image: image, colour: colour, size: size });
        await data.save();
        res.json(data);
    } else {
        res.send("product can not listed")
    }
})

/************************  search & view by categories id ************************/
const viewCategoriesProduct = (async (req, res) => {
    const id = req.query._id;
    if (id) {
        const data = await Product.find({ categories: id }).populate("categories");
        console.log(id)
        res.json(data);
    } else {
        res.send("item not matched");
    }
})

/************************  search & view by categories id ************************/
const viewAllProduct = (async (req, res) => {
    const data = await Product.find();
    data.map(x=>{
        delete x._doc.categories;
    })
    res.json(data);
})


/************************  update the items ************************/
const UpdateProduct = (async (req, res) => {
    const id = req.query._id;
    const { p_name, price, categories, description, image, colour, size } = req.body;
    if (p_name) {
        const data = await Product.updateOne({ _id: id }, req.body);
        res.json(data);
    } else {
        res.send("item not matched");
    }
})

/************************  delete items ************************/
const deleteProduct = (async (req, res) => {
    const id = req.query._id;
    if (id) {
        const data = await Product.findOneAndDelete({ _id: id });
        if (data) {
            const detail = "successfully deleted";
            res.status(200).send({ detail });
        } else {
            const detail = "product not found";
            res.status(404).send({ detail });
        }
    } else {
        const detail = "User not found";
        res.status(404).send({ detail });
    }
})


module.exports = { addProduct, viewCategoriesProduct, UpdateProduct, deleteProduct, viewAllProduct }