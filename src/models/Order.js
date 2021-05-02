const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    user:Schema.Types.ObjectId,
    items:[{
        id:Schema.Types.ObjectId,
        quantity:Number,
    }],
    total:Number,
    paymentMethod:String,
    address:String,
});

const Order = mongoose.model('Order',OrderSchema);

module.exports = Order;
