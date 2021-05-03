const e = require("express");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

const verifyToken = (req,res,next) =>{
    const bearerHeader = req.headers["authorization"];

    if(typeof bearerHeader != "undefined"){
        const bearerToken = bearerHeader.split(" ")[1];
        let decoded; 

        try{
            decoded = await jwt.verify(bearerToken, bearerToken,SECRET);
        }catch(err){
            console.log(err);
            res.status(401).send({
                err:err.toString()
            });
            return;
        }
        
        next();
    }else{
        res.status(401).send({
            msg:"Access Token missing"
        });
    }
}

module.exports = verifyToken;