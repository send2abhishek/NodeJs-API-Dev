const express=require('express');
const router=express.Router();
const User=require("../Models/UserModel");
const bcrypt=require('bcrypt');
const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
//const dotenv = require("./env");




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



    

});

router.post('/login',(req,res,next)=>{

    User.find({email:req.body.email})
        .then(result =>{


            if(result.length < 1){

                return res.status(404).json({
                     message:'Auth Failed'
                 })
             }
             
 
             bcrypt.compare(req.body.password,result[0].password,(err,resp)=>{
 
                 if(err){
 
                     return res.status(401).json({
                         message:'Auth Failed1'
                     });
 
                 }
 
                 //resp will be true or false, if match then res=true
 
                 if(resp){

                    

                    //console.log("key is",dotenv.privateKey);

                    const Token=jwt.sign({

                        email:result[0].email,
                        userId:result[0]._id

                    },'secret',{
                        expiresIn: "1h",
                        

                    });
                     return res.status(200).json({
                         message:'Auth Success',
                         token:Token
                     });
                 }
 
                 return res.status(401).json({
                     message:'Auth Failed12'
                 });
 
             });

            
        })
        .catch(error =>{
                        
            res.status(500).json({
                message:"Something Went Wrong",
                info:error.message
            })
        });


});


module.exports=router