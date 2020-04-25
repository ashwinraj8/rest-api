const express = require('express');
const app  = express();
const morgan = require('morgan');
const bodyparser = require('body-parser');
let mongoose = require('mongoose');

const productRoutes = require('./api/routes/products');
const ordersRoutes = require('./api/routes/orders');
let userRoutes = require('./api/routes/user');


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
  });



mongoose.connect('mongodb://localhost/strudents', {useUnifiedTopology: true});

mongoose.Promise = global.Promise;
app.use(morgan('dev'));
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json()); //extracts json data and makes us easily readable to us.
 


//routes which should handle requests
app.use('/products', productRoutes);
app.use('/orders', ordersRoutes);
app.use('/user', userRoutes);



app.use((req,res,next)=>{
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    });
});

module.exports = app;