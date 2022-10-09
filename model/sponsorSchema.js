const mongoose=require('mongoose');



const userSchema=new mongoose.Schema({
    cname:{
        type:String,
        required:true
    },
    cnumber:{
        type:Number,
        required:true
    },
    month:{
        type:Number,
        required:true
    },
    csc:{
        type:String,
        required:true
    },
    year:{
        type:Number,
        required:true,
      
    },
 
 name:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true
},

country:{
    type:String,
    required:true
},

address:{
    type:String,
    required:true
},
supportfor:{
    type:String,
    required:true
}
,
date:{
    type:String,
    required:true
}
}  
)




//we are hashing the password

// userSchema.pre('save',async function(next){
//     console.log('h1 from inside');
//     if(this.isModified('password')){
//         this.password= await bcrypt.hash(this.password,12);
//     }
//     next();
// })


//collection creating




const Sponsor=mongoose.model('Sponsor',userSchema);


module.exports=Sponsor;