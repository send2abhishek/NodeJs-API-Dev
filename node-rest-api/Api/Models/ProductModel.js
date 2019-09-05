const mongoose=require('mongoose');

const ProductSchema=mongoose.Schema({

    _id:mongoose.Schema.Types.ObjectId,
    name:String,
    price:String
});

module.exports=mongoose.model("Product",ProductSchema);