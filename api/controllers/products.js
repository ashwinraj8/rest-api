let Product = require('../models/products');
let mongoose = require('mongoose');
exports.products_get_all = (req,res,next) =>{
    Product.find()
    .select('name price _id')
    .exec()
    .then(docs =>{
        //console.log(docs);
            let response = {
                count: docs.length,
                products: docs
            }
        //if(docs.length>=0){
            res.status(200).json(response);
       // }
       // else{
         //   res.status(404).json({
           ///     message:'No entries found'
            //});
        //}
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

exports.product_create_product = (req,res,next) =>{

    console.log(req.file)
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product.save().then(result =>{
        console.log(result);
        console.log('Ho gya savvvvveeeeee');
        res.status(200).json({
            message: 'handling POST request to /products',
            createtProduct:  {
                name: result.name,
                price: result.price,
                _id: result._id,
                require:{
                    type:'POST',
                    url:"http://localhost:3000/products"+ result._id
                }
            }
        });
    })
    .catch(err =>{
        consol.log(err);
        res.status(500).json({
            error:err
        });
    });

    
} 

exports.product_get_product = (req,res, next)=>{
    const id = req.params.productId;
    
    Product.findById(id)
    .exec()
    .then(doc =>{
        console.log("From database", doc);
        res.status(200).json(doc);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({error:err});
    });  
    
}
exports.product_update_product = (req,res, next)=>{
    let id = req.params.productId;
    let updateOps  = {};
    for(let ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Product.update({_id:id}, {$set: updateOps})
    .exec()
    .then(result=>{
        console.log(result);
        res.status(200).json({
            message:'Product updated',
            request:{
                type: 'PATCH',
                url: 'http://localhost/prducts'+ id
            }
        });
    })
}

exports.product_delete_product = (req,res, next)=>{
    let id = req.params.productId;
    Product.remove({_id:id})
    .exec()
    .then(result=>{
        res.status(200).json(result);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
}
