const router = require("express").Router();
const User = require("../models/User");
const tokenVerification = require("./middleware/tokenVerification");

router.get('/',tokenVerification,async(req,res)=>{
    let user;

    try{
        user = await User.findById(req.user);
    }catch(err){
        console.log(err);
        res.status(500).send({
            err:err.toString()
        })
    }

    console.log(user);

    res.send({
        msg:"OK",
        token:req.token
    })
})

module.exports = router;
