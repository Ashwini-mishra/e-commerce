const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/myCart",{
    useNewUrlParser: true,
}).then(()=>console.log(" DataBase is Connected"))
.catch((err)=> console.log(err.message))

module.exports = mongoose;