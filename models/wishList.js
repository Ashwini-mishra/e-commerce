const mongoose = require("mongoose");
const Schema=mongoose.Schema;

const WishList = mongoose.model(
    "wish",
   new Schema({
    user_id:{ type:String , required:true},
    product_id:{type:Array, required:true}
   })
)

module.exports= WishList;