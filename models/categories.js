const mongoose = require("mongoose");
const Schema = mongoose.Schema

const categorySchema = new Schema({
    categoryName: { type: String, required: true },
    type: { type: Boolean, default: true }
})

const Categories = mongoose.model("categories", categorySchema);

module.exports = Categories;