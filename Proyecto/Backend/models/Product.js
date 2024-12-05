const mongoose =require("mongoose");

const productSchema= mongoose.Schema({
    title: String,
    price: Number,
    description: String,
    category: String,
    tallas: [String],
    images: [String]
})
module.exports= mongoose.model("Product",productSchema)