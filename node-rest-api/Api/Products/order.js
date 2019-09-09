const express=require('express');
const router=express.Router();
const mongoose=require("mongoose");
const Order=require("../Models/OrderModel");
const Product=require("../Models/ProductModel");
const checkAuth=require('../Middleware/checkAuth')

router.post('/orders',checkAuth,async (req,res,next)=>{
    const IsOrder= await QueryProducID(req.body.productId);
    console.log("Product avail-",IsOrder)
    if(IsOrder){

        const order=new Order({
            _id:new mongoose.Types.ObjectId,
            product:req.body.productId,
            quantity:req.body.quantity
        });
    
        order.save()
            .then(response =>{
    
                res.status(201).json({
                    orderStatus:"Order Placed Successfully",
                    orderDetails:{
                        orderId:response._id,
                        productName:response.product
                    }
    
                })
            })
    
            .catch(error=>{
    
                res.status(500).json({
                    orderStatus:"Failed to order",
                    errorDetails:error.message
                })
            })
    }

    else{
        res.status(500).json({
            orderStatus:"Invalid Product",
           
        })
    }
    




    

});
async function QueryProducID(product){
   
    return result=await Product.findById(product)
            .then(response =>{

              if(response==null){
                  return false;
              }
              else{
                  return true;
              }
                
            })
            .catch(error =>{

                return false;
                console.log(error);
            })

}

router.get('/',checkAuth,(req,res,next)=>{

    Order.find()
        .select(" product quantity")
        .populate('product','name')
        .then(response =>{
            //console.log("Data Fetched",response);
            res.status(200).json({

                responseCode: 700,
                orders:response.map(data =>{

                    return{
                        orderId:data.product,
                        NoOfQuantityOrdered:data. quantity
                    }
                })
            });
        })

        .catch(err =>{
            res.status(500).json({
                error:"Something went wrong",
                msg:err.message
            })

        })
   
});

module.exports=router;