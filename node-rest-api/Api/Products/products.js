const express=require('express');
const router=express.Router();
const Product=require("../Models/ProductModel");
const mongoose=require("mongoose");


router.post('/Create',(req,res,next)=>{

    const product=new Product({
        _id: new mongoose.Types.ObjectId,
        name:req.body.name,
        price:req.body.price,
        desc:req.body.desc
    });
    product.save()
        .then(result =>{
            console.log("Data Created Successfully",result);
            res.status(201).json({
                message:"Data Created Successfully",
                response : result
            })
        })
        .catch(error =>{
            console.log(error);
            res.status(500).json({
                message:"Something Went Wrong",
                info:error.message
            })
        })

    
});

router.get('/',(req,res,next)=>{

    Product.find()
        // .populate('Product')
        .select("_id price name desc ")
        .then(doc =>{

            res.status(200).json({
                count: doc.length,
                products: doc.map(data =>{
                   return{
                       _id:data._id,
                       productName:data.name,
                       productPrice:data.price,
                        productDesc:data.desc,
                        request:{
                            type:'GET',
                            url:'http://localhost:3000/product' + data._id
                        }
                   }
                })

                });
    })

    .catch(err =>{

        res.status(500).json({
            result: "Result Display failed",
            data:err.message
        })
        
    })
});

router.get('/:productId',(req,res,next)=>{
    const id=req.params.productId;

    Product.findById(id)
      .then(doc =>{

            res.status(200).json({
                result: "Result you can find below",
                data:doc

                });
      })

      .catch(err =>{

        res.status(500).json({
            result: "Result Display failed",
            data:err.message
        })
          
      })
    
});


module.exports=router;