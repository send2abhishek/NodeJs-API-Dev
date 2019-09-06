const mongoose=require("mongoose");

const OrderSchema=mongoose.Schema({

    
    _id:mongoose.Schema.Types.ObjectId,
    order : {type: String, required: true},
    orderType: {type:String, required: true},
    desc:{type:String,required:true}
});

module.exports=mongoose.model("Order",OrderSchema);