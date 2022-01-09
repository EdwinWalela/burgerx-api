const router = require("express").Router();
const User = require("../models/User");
const tokenVerification = require("./middleware/tokenVerification");

router.get('/',tokenVerification,async(req,res)=>{
    let user;

    try{
        user = await User.findById(req.user,{password:0});
    }catch(err){
        console.log(err);
        res.status(500).send({
            err:err.toString()
        })
    }

    res.send({
        msg:"OK",
        token:req.token,
        user,
    })
})

router.delete('/',async(req,res)=>{
    await User.deleteMany({});

    res.send({msg:"Users deleted"})
})

module.exports = router;
