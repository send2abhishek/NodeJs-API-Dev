const express=require('express');
const router=express.Router();
const Product=require("../Models/ProductModel");
const mongoose=require("mongoose");


router.post('/Create',(req,res,next)=>{

    const product=new Product({
        _id: new mongoose.Types.ObjectId,
        name:req.body.name,
        price:req.body.price
    });
    product.save()
        .then(result =>{
            console.log(result);
        })
        .catch(error =>{
            console.log(error);
        })

    res.status(201).json({
        message:"Data Created Successfully",
        result:dataCreated
    })
});

router.get('/',(req,res,next)=>{

    res.status(201).json({
        message:'Hi from product'
    });
});

router.get('/:productId',(req,res,next)=>{
    const id=req.params.productId;
    if( id === 'special'){

        res.status(201).json({
            Id:id,
            message:"this is special id you have passed"
        });
    }
    else{

        res.status(201).json({
            Id:id,
            message:"Some different id you have passed"
        });

    }
});


module.exports=router;