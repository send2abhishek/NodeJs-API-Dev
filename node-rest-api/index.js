const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const productRoute=require('./Api/Products/products');
const orderRoute=require('./Api/Products/order');
const mongoose=require('mongoose');

// It will parse incomming post request body
app.use(bodyParser.json());

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Header","*");

    next();
});

//db url
// mongodb+srv://user1:aryan@cluster0-orw7v.mongodb.net/test?retryWrites=true&w=majority

mongoose.connect("mongodb://localhost:27017/aryan",{
    useNewUrlParser: true
})
    .then(()=>{
        console.log("Database connection establised");
    })
    .catch(error =>{
        console.log("failed to connect: - ",error.message);
    })

app.use('/product',productRoute);
app.use('/order',orderRoute);

app.use((req,res,next)=>{
    const error=new Error('Page Not found');
    error.status=404;
    next(error);
});
app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({

        error:{
            message: error.message
        }


    });
});

module.exports=app;