const mongoose=require("mongoose");
const DB="mongodb+srv://GuruProject:f33LgMHuA4yDeaKn@cluster0.k5cro.mongodb.net/MyData?retryWrites=true&w=majority"
  

const connectDB=()=>{
    mongoose.connect(DB      
    ).then(()=>{
        console.log(`connection successful`);
    })
    .catch((err)=>console.log(`no connection`));
}

module.exports=connectDB;