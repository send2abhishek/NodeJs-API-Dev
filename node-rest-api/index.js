const express=require('express');
const app=express();
const productRoute=require('./Api/Products/products');

app.use('/product',productRoute);

module.exports=app;