require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3000;
const DB_URI = process.env.DB_URI;

const menuRoutes = require('./routes/menu');
const orderRoutes = require('./routes/order');
const authRoutes = require('./routes/authentication');
const userRoutes = require('./routes/user');




mongoose.connect(DB_URI,{useNewUrlParser:true,useUnifiedTopology:true},()=>{
    console.log('DB connection successful');
});


app.use(cors());
app.use(express.urlencoded({extended:true}))
app.use(express.json());

// Routes
app.use('/api/menu',menuRoutes);
app.use('/api/orders',orderRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/users',userRoutes)

app.get('/',(req,res)=>{
    res.status(200).send({
        msg:"OK"
    })
})

app.listen(PORT,()=>{
    console.log(`Listening for requests on port ${PORT}`);
})