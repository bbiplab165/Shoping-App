const mongoose = require("mongoose")

const product = new mongoose.Schema({
    // user: String,
    title:String,
    catagory: String,
    description:String,
    price: Number,
    size:Object,
    image: String
}, { timestamps: true })

module.exports = mongoose.model("product", product)