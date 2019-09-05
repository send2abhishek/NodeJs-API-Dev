const express=require('express');
const app=express();
const productRoute=require('./Api/Products/products');
const orderRoute=require('./Api/Products/order');

app.use('/product',productRoute);
app.use('/order',orderRoute);

module.exports=app;