require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

const menuRoutes = require('./routes/menu');

app.use(cors());

// Routes
app.use('/api/menu',menuRoutes);

app.get('/',(req,res)=>{
    res.status(200).send({
        msg:"OK"
    })
})

app.listen(PORT,()=>{
    console.log(`Listening for requests on port ${PORT}`);
})