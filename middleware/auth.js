const jwt=require('jsonwebtoken');

const User=require('../model/userSchema');


module.exports= verifyUser=async(req,res,next)=>{
  console.log("i am user");
    try{
        let token='';
        token=token?token:req?.headers?.authorization;
        token=token?.replace('Bearer ', '');
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Please login at first!"
            })
        }
        console.log(token);
        const Decodeddata= await jwt.verify(token,'nabinghale');
         req.user = await User.findById(Decodeddata.id)
        
        console.log("userdata",req.user.name);
        next()

    }
    catch(error){
       return res.status(500).json({
        success:false,
        message:error.message

       })
    }
}


// module.exports= verifyAdmin=async(req,res,next)=>{

//     console.log("hello i am admin guard")
//     console.log("request data",req.user);
//     if(!req.user){
//         return res.status(401).json({message:"Invalid users"})
//     }
//     else if(req.user.userType!=='Admin'){
//         return res.status(401).json({message:"Unauthorized!!"})
//     }
//     next()
// }


//double
module.exports=verifyAdmin=async(req,res,next)=>{
    console.log("hello i am admin guard")
    let token='';
    token=token?token:req?.headers?.authorization;
    token=token?.replace('Bearer ', '');
    if(!token){
        return res.status(401).json({
            success:false,
            message:"Please login at first!"
        })
    }
    console.log(token);
    const Decodeddata= await jwt.verify(token,'nabinghale');
     req.user = await User.findById(Decodeddata.id)
     console.log(req.user);
    if(!req.user){
        return res.status(401).json({message:"Invalid admin"})
    }
    else if(req.user.userType!=='Admin'){
        return res.status(401).json({message:"Unauthorized Admin!!"})
    }
    next();
}

module.exports=verifyDonor=async(req,res,next)=>{
    console.log("hello i am donor guard")
    let token='';
    token=token?token:req?.headers?.authorization;
    token=token?.replace('Bearer ', '');
    if(!token){
        return res.status(401).json({
            success:false,
            message:"Please login at first!"
        })
    }
    console.log(token);
    const Decodeddata= await jwt.verify(token,'nabinghale');
     req.user = await User.findById(Decodeddata.id)
     console.log(req.user);
    if(!req.user){
        return res.status(401).json({message:"Invalid donor"})
    }
    else if(req.user.userType!=='Donor'){
        return res.status(401).json({message:"Unauthorized Donor!!"})
    }
    next();
}

//main ---guard
//s