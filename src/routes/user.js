const router = require("express").Router();
const tokenVerification = require("./middleware/tokenVerification");

router.get('/',tokenVerification,async(req,res)=>{
    let user;
    res.send({
        msg:"OK",
        token:req.token
    })
})

module.exports = router;
