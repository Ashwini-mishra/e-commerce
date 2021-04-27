const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const User = mongoose.model(
  "User",
  new Schema({
    name: { type: String, required: true },
    pass: { type: String, required: true },
    email:{ type:String , required : true},
    phone_number:{type:Number , required:true},
    gender:{type:String , required:true},
    address:{type:String , required:true},
    valid: { type: Boolean, default: false },
    randomString: { type: String, default: true },
    role:{ type:Number ,  default:1}
  })
);

module.exports = User;