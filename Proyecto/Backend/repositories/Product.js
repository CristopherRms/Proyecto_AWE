const Product =require("../models/Product");
const ObjectID=require("mongoose").Types.ObjectId;

class ProductRepository{
    static async getAll(query){
        return await Product.find(query);

    }
    static async getCat(category) {
        return await Product.find({ category: category }); // Filtrar por categoría
    }
    static async getById(id){
        console.log()
        return await Product.findOne({_id:id});
    }
    static async create(productData){
        const product= new Product(productData);
        return await product.save();
    }
    static async deleteById(id){
        if (!ObjectID.isValid(id)){
            return null;
        }
        return await Product.deleteOne({_id:id});}

    static async updateById(id, updateData) {
        return await Product.findByIdAndUpdate(id, updateData, { new: true });
    }
}
module.exports={
    ProductRepository
}