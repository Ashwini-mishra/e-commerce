const mongoose = require("mongoose");
const Schema=mongoose.Schema;

const Mycart = mongoose.model(
    "cart",
   new Schema({
    user_id:{ type:String , required:true},
    products:{ type:Array , required:true,
            product_id:{type:String, required:true},
            price:{type:Number , required:true},
            quantity:{type:Number , required:true}
        }
   })
)

module.exports= Mycart;