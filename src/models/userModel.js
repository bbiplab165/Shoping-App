const mongoose = require("mongoose")

const user = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    admin:{ 
        type:Boolean,
        default:false,
    },
    password:String
}, { timestamps: true })

module.exports=mongoose.model("user",user)