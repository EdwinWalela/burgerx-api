const User = require('../models/User');
const bcrypt = require('bcrypt');
const router = require('express').Router();

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);

router.get('/',async(req,res)=>{
    let users;

    try{
        users = await User.find({})
    }catch(err){
        console.log(err);
        res.send('')
    }
    res.send({users});
})

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

router.post('/login',(req,res)=>{

})

router.post('/forgot',(req,res)=>{

})

module.exports = router;