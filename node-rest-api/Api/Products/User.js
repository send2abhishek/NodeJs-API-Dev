const express=require('express');
const router=express.Router();
const User=require("../Models/UserModel");
const bcrypt=require('bcrypt');
const mongoose=require('mongoose');

router.post('/signup',(req,res,next)=>{
    User.find({email:req.body.email})
        .then(user =>{

            if(user.length >=1){
                return res.status(409).json({
                    message: "User Exists"
                });
            }

            else{
                bcrypt.hash(req.body.password,10,(err,hash)=>{

                    if(err){
                         return res.status(500).json({
                             error:err
                         });
                    }
                    else{
                        const user=new User({
                            _id: new mongoose.Types.ObjectId,
                            email: req.body.email,
                            password:hash
                        });
            
                        user
                        .save()
                        .then(response =>{
                            res.status(201).json({
                                message:"User Created",
            
                            })
                        })
                        .catch(error =>{
                        
                        res.status(500).json({
                            message:"Something Went Wrong",
                            info:error.message
                        })
                    })
            
            
                    }
            
            
                });

            }
        })
        .catch(error =>{
                        
            res.status(500).json({
                message:"Something Went Wrong inOrder to hitting service",
                info:error.message
            })
        })

    

})

module.exports=router;