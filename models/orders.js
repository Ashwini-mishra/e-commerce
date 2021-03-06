const mongoose = require("mongoose");
const Schema=mongoose.Schema;

const Orders = mongoose.model(
    "orders",
   new Schema({
    user_id:{ type:String , required:true},
    items:{ type:Array , required:true},
    billing:{ type:Array,
        name:{ type:String , required:true},
        address:{ type:String , required:true},
        city:{ type:String , required:true},
        pin:{ type:String , required:true},
        state:{ type:String , required:true},
        country:{ type:String , required:true}
    },
    shipping:{ type:Array,
        name:{ type:String , required:true},
        address:{ type:String , required:true},
        city:{ type:String , required:true},
        pin:{ type:String , required:true},
        state:{ type:String , required:true},
        country:{ type:String , required:true}
    },
    order_status:{ type:String , default:"pending"},
    total:{type:String , required:true},
    payment_method:{ type:String , required:true}
   })
)

module.exports= Orders;
