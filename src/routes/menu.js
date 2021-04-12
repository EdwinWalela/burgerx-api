const router = require('express').Router();
const MenuItem = require('../models/MenuItem');
const Menu = require('../models/MenuItem');

router.get('/',async(req,res)=>{
    let menu = [];
    try{
        menu = await Menu.find({});
    }catch(err){
        console.log(req.url);
        console.log(err);
        res.status(500).send({
            menu,
            error:err
        });
    }
    res.status(200).send(menu);
});

router.get('/:category',async(req,res)=>{
    let menu = [];
    let category = req.params.category;

    try{
        menu = await Menu.find({category})
    }catch(err){
        
    }
    
    res.status(200).send(menu);

})

router.put('/:id',async (req,res)=>{
    let id = req.params.id;

    if(!id){
        res.status(300).send({
            err:"Id missing"
        })
    }

    let menuItem = {
        thumb:req.body.thumb.trim(),
        name:req.body.name.trim(),
        price:Number(req.body.price),
        stars:Number(req.body.stars),
        ingredients:req.body.ingredients.trim(),
        category:req.body.category.trim()
    }
    
    if(!menuItem.name){
        res.status(300).send({
            err:"Body missing"
        })
    }


    try{
    await MenuItem.findByIdAndUpdate(id,menuItem);
    }catch(err){
        console.log(err);
        res.status(500).send({
            msg:"Unable to update item",
            err
        })
    }
    res.status(200).send({
        msg:"Item updated"
    })
    // await Menu.findByIdAndUpdate({})

})

router.post('/',async(req,res)=>{
    let menuItem = {
        thumb:req.body.thumb.trim(),
        name:req.body.name.trim(),
        price:Number(req.body.price),
        stars:Number(req.body.stars),
        ingredients:req.body.ingredients.trim(),
        category:req.body.category.trim()
    }

    try{
        await new MenuItem(menuItem).save();
    }catch(err){
        console.log(req.url);
        console.log(err);
        res.status(500).send({
            msg:"Menu item creation failed",
            error:err
        });
    }
    res.status(201).send({msg:"New menu item saved"})
})


module.exports = router;