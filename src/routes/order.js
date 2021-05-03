const router = require("express").Router();
const Order = require("../models/Order");

router.post('/',async(req,res)=>{
   let order = req.body;

   try{
    await new Order({
        items:order.items,
        total:Number(order.total),
        payment:order.payment.trim().toLowerCase(),
        address:order.address.trim().toLowerCase(),
        user:order.user,
    }).save();
   }catch(err){
        console.log(err);
        res.status(500).send({
            err:err.toString()
        })
   }

   res.status(201).send({msg:"new order submitted"})
})

router.get('/',async(req,res)=>{
    let orders;

    try{
        orders = await Order.find({});
    }catch(err){
        console.log(err);
        res.status(500).send({
            err:err.toString()
        })
    }
    res.send(orders);
})

module.exports = router;