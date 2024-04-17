require('dotenv').config();
const mongoose = require('mongoose')

const db=process.env.DATABASE;

mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("Connection Successfull");
}).catch((e)=>{
    console.log(e);
})