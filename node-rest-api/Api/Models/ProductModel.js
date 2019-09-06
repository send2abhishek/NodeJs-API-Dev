const mongoose=require('mongoose');

const ProductSchema=mongoose.Schema({

    _id:mongoose.Schema.Types.ObjectId,
    name:{type: String, required: true},
    //price:Number,
    price:{type: Number, required: true},
    desc:{type: String, required: true}
    
});

module.exports=mongoose.model("Product",ProductSchema);