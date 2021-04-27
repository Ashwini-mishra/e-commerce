const Categories = require("../models/categories");


/************************ add fields addCategories *****************/
const addCategories = (async (req, res) => {
    try {
        const { categoryName } = req.body;
        const data = await Categories.findOne({ categoryName: categoryName });
        if (!data) {
            const category = await Categories(req.body);
            category.save();
            res.json(category);
        } else {
            const detail = "already exist";
            res.status(400).send(detail);
        }
    } catch (error) {

    }
})


/************************  update categories ************************/
const updateCategories = (async (req, res) => {
    const id = req.query._id;
    if (id) {
        const data = await Categories.findOneAndUpdate({ _id: id }, req.body);
        res.json(data);
    } else {
        let detail = "category not found";
        res.send({ detail });
    }
})


/************************ display categories ***********************/
const displayCategories = (async (req, res) => {
    const data = await Categories.find()
    res.json(data);
})

/************************  delete categories ************************/
const deleteCategories = (async (req, res) => {
    const id = req.query._id;
    if (id) {
        const data = await Categories.deleteOne({ _id: id });
        let detail = "successfully deleted category from the cart";
        res.send({ detail });

    } else {
        let detail = "category not found";
        res.send({ detail });
    }
})


module.exports = { addCategories, updateCategories, displayCategories, deleteCategories };
