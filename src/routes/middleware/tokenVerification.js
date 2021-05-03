const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET;
const EXPIRY = process.env.JWT_EXPIRY;

const verifyToken = async (req,res,next) =>{
    const bearerToken = req.headers.authorization;
    if(typeof bearerHeader !== undefined){
        let decoded; 
        try{
            decoded = jwt.verify(bearerToken,SECRET);
        }catch(err){
            console.log(err);
            res.status(401).send({
                err:err.toString()
            });
            return;
        }
        
        let userId = decoded.user.id;
        req.user = userId;

        //@TODO: refresh token
        let newToken = jwt.sign(
            {
                user:{
                    id:userId
                }
            },
            SECRET,
            {expiresIn:`${EXPIRY}h`}
        )

        req.token = newToken;
        
        next();
    }else{
        res.status(401).send({
            msg:"Access Token missing"
        });
    }
}

module.exports = verifyToken;