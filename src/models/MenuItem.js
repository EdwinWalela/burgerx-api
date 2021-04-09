const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MenuItemSchema = new Schema({
    thumb:String,
    name:String,
    price:Number,
    stars:Number,
    ingredients:String,
    category:String
})

const MenuItem = mongoose.model('MenuItem',MenuItemSchema);

module.exports = MenuItem;