const mongoose=require('mongoose');



const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
      
    },
   country:{
    type:String,
    required:true
   },
   sponsor:{
    type:Number,
    required:true
   },
   
   userType:{
    type:String,
    enum:['Admin','User','Donor'],
    default:'User'
},
    
   
})




//we are hashing the password

// userSchema.pre('save',async function(next){
//     console.log('h1 from inside');
//     if(this.isModified('password')){
//         this.password= await bcrypt.hash(this.password,12);
//     }
//     next();
// })


//collection creating




const User=mongoose.model('User',userSchema);


module.exports=User;