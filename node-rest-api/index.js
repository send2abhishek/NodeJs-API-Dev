const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const productRoute=require('./Api/Products/products');
const orderRoute=require('./Api/Products/order');


app.use(bodyParser.json());

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