const express=require('express');
const router=express.Router();

router.get('/',(req,res,next)=>{

    res.status(201).json({
        message:'Hi from product'
    });
});


module.exports=router;