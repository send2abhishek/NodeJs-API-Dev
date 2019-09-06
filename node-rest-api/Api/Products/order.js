const express=require('express');
const router=express.Router();
const mongoose=require("mongoose");
const Order=require("../Models/OrderModel");

router.post('/orders',(req,res,next)=>{

    const order=new Order({
        _id: new mongoose.Types.ObjectId,
        order: req.body.order,
        orderType: req.body.orderType,
        desc: req.body.desc
    });

    order.save()
    .then(response =>{
        
        res.status(201).json({
            message:"Order Placed Successfully",
            response:{
                order:response.order,
                orderType:response.orderType,
                orderId:response._id
            }
        })
    })

    .catch(err =>{

        res.status(500).json({
            error:"Something went wrong",
            msg:err.message
        })
    })

    

});

router.get('/',(req,res,next)=>{

    Order.find()
       
        .then(response =>{
            console.log("Data Fetched",response);
            res.status(200).json({

                responseCode: 700,
                data:{
                order:response.order,
                orderType:response.orderType,
                orderId:response._id

                }
            })
        })

        .catch(err =>{
            res.status(500).json({
                error:"Something went wrong",
                msg:err.message
            })

        })
   
});

module.exports=router;