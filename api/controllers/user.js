const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');

let User = require('../models/user'); 



exports.user_signup = (req,res,next)=>{

    User.find({email: req.body.email})
    .exec()
    .then(user=>{
        if(user.length>=1){
            console.log('The user is ',user);
            return res.status(409).json({
                message: 'Mail exist'
            });
        } else{
            bcrypt.hash(req.body.password,10, (err, hash)=>{
                if(err){
                    return res.status(500).json({
                        error : err
                    });
                    
                }
                else{
                    let user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash
                        });
                        user
                        .save()
                        .then(result=>{
                            console.log(result);
                            res.status(201).json({
                                message: 'User created yepppiiii'
                            });
                        })
                        .catch(err=>{
                            console.log(err);
                            res.status(500).json({
                                error:err
                            })
                        });
                    
                }
        
         
         });
            
        }
    })

}

exports.user_login =  (req,res,next)=>{
    User.find({email:req.body.email})
    .exec()
    .then(user=>{         //user is a n empty array.
        if(user.length<1){
            return res.status(401).json({
                message: 'Auth failed'
            });
        }
        bcrypt.compare(req.body.password, user[0].password,(err,result)=>{
            if(err){
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }
            if(result){
                let token = jwt.sign({
                    email: user[0].email,
                    userId: user[0]._id
                },'secretkey',
                {
                    expiresIn: "1h"
                }
                );
                console.log(token);
                return res.status(200).json({
                    message: 'Auth successful',
                    token: token
                    
                });
            }
            res.status(401).json({
                message: 'Auth failed'
            });
            

        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
}

exports.user_delete = (req,res,next)=>{
    User.remove({_id: req.params.userId})
    .exec()
    .then(result=>{
        console.log("deleted", result);
        res.status(200).json({
            message: 'user deleted yepppppppi'
        });
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
    /*.then(res => /*{
        res.status(200).json({
            message: 'user deleted'
        });
    })*/
    /*.catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });*/
}