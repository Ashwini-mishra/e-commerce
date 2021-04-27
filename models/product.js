const mongoose = require("mongoose");
const Schema = mongoose.Schema


const productSchema = new Schema({
    p_name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    colour: { type: String, required: true },
    size: { type: Number, required: true },
    categories: { type: mongoose.Schema.Types.ObjectId, ref: 'categories' }
})

const Product = mongoose.model("product", productSchema);

module.exports = Product;
