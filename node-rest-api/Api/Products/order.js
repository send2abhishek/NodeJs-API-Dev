const express=require('express');
const router=express.Router();

router.post('/orders',(req,res,next)=>{

    const order={

        name:req.body.name,
        price:req.body.price
    }

    res.status(201).json({
        msg:"Order Placed successfully",
        status:order
    });

});

router.get('/',(req,res,next)=>{

    res.status(201).json({
        message:'Hi from order'
    });

});

module.exports=router;