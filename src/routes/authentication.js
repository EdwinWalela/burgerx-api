const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const router = require('express').Router();

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRY = process.env.JWT_EXPIRY;

router.post('/register',async(req,res)=>{
    let user = req.body;
    let salt,hash;

    try{
        salt = await bcrypt.genSalt(SALT_ROUNDS);
    }catch(err){
        console.log(err);
        res.status(500).send({
            err:err.toString()
        });
        return;
    }

    try{
        hash = await bcrypt.hash(user.password,salt);
    }catch(err){
        console.log(err);
        res.status(500).send({
            err:err.toString()
        });
        return;
    }

    try{
        await new User({
            email:user.email,
            name:user.name,
            password:hash,
            mobile:user.mobile,
            address:user.address
            }).save();

    }catch(err){
        console.log(err);
        res.status(500).send({
            err:err.toString()
        });
        return;
    }

    res.status(201).send({
        msg:"registration successful"
    })
})

router.post('/login',async(req,res)=>{
    let userRequest = req.body;
    let user;

    try{
        user = await User.findOne({email:userRequest.email});
    }catch(err){
        console.log(err);
        res.status(500).send({
            err:err.toString()
        })
    }

    let isAuth = await bcrypt.compare(userRequest.password,user.password);
    let jwtPayload;

    if(isAuth){
        jwtPayload = {
            id:user._id,
            name:user.name,
        }
        let token = jwt.sign(
            {user:jwtPayload},
            JWT_SECRET,
            {expiresIn:`${JWT_EXPIRY}h`}
        )
        res.send({
            token
        });
        return;
    }else{
        res.status(401).send({
            msg:"Incorrect combination"
        })
        return;
    }
})

router.post('/forgot',(req,res)=>{

})

module.exports = router;