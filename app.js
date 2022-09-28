const express=require('express');
const morgan = require('morgan');
const cors=require('cors');
const auth=require('./middleware/auth');
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));
app.use(cors());
 
const connectDB = require("./config/db");


connectDB();

app.use(require('./router/auth'));


app.get('/hello',auth,(req,res)=>{
    res.send(`Hello world from the server`)
})

app.listen(5000,()=>{
    console.log(`server is running at port 5000`)
})