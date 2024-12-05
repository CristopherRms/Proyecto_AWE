const mongoose =require("mongoose");

const reviewSchema= mongoose.Schema({
    user: String,
    description: String,
    date: String,
})
module.exports= mongoose.model("Review",reviewSchema)