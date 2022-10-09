const express=require('express');
const router=express.Router();
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

const verifyUser=require('../middleware/auth');
const verifyAdmin=require('../middleware/auth');
const verifyDonor=require('../middleware/auth');
// const {auth}=require('../middleware/auth');

const User = require("../model/userSchema");
const Sponsor=require("../model/sponsorSchema");



router.post('/register',async(req,res)=>{
    const{name,email,address,password,country,sponsor,userType}=req.body;
    if(!name || !email || !password || !address || !country || !sponsor){
        return res.status(422).json({error:"please enter missing data value"});
    }
try{

    const userExist=await User.findOne({email:email});

    if(userExist){
        return res.status(422).json({error:"email already exist"});
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const user = await User.create({
        name,
        email,
        address,
        password:hashedPassword,
        country,
        sponsor,
        userType
    });

    res.status(200).json({
        success:true,
        user,
        mesage:"Register success!"
    })
    // const user=new User({name,email,address,password,country,sponsor})
    
    // console.log(user);
    // await user.save();
    // res.status(201).json({message:"user registered successfully"});
}
    catch(err){
        console.log(err);
    }
})





router.post('/insert',async(req,res)=>{
    const{cname,cnumber,month,year,supportfor,name,email,csc,country,address,date}=req.body;
    if(!cname || !cnumber|| !month|| !year || !supportfor || !name || !email || !country|| !address || !date || !csc ){
        return res.status(422).json({error:"please enter missing data value"});
    }
try{

    // const userExist=await Sponsor.findOne({cname:cname});

    // if(userExist){
    //     return res.status(422).json({error:"name already exist"});
    // }
    const sponsor = await Sponsor.create({
        cname,
        cnumber,
        month,
        year,
        supportfor,
        name,
        email,
        country,
        address,
        date,
        csc
    });

    res.status(200).json({
        success:true,
        sponsor,
        mesage:"KYC register!"
    })
    // const user=new User({name,email,address,password,country,sponsor})
    
    // console.log(user);
    // await user.save();
    // res.status(201).json({message:"user registered successfully"});
}
    catch(err){
        console.log(err);
    }
})








router.post('/logout',async(req,res,next)=>{
    res.cookie("token", null,{
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message:"Logged Out",
    });
})


router.get('/alluser',verifyDonor,async(req,res)=>{
  
       try {
        const user = await User.find();
        res.status(200).json({
            success:true,
            user,
            message:"User Get Sucess!"
        })
        
       } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
        
       }
        
    
})
router.post('/signin',async(req,res)=>{


    try{
        const{email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({error:"please enter any detail"})
        }
        const userLogin=await User.findOne({email:email});
        if(!userLogin){
            return res.status(400).json({
                success:false,
                message:"User doesn't exist!"
            });
        }
            const isMatched = await bcrypt.compare(password,userLogin.password);
            if(!isMatched){
                return res.status(400).json({
                    success:false,
                    message:"Password doesn't match!"
                });
            
            }

            const token = jwt.sign({email:userLogin.email,id:userLogin._id},"nabinghale",{expiresIn:'1h'});
            console.log(token);
            res.status(200).json({
                success:true,
                message:"Login Success!",
                token
            })
           
    
        }
      

      
    

    catch(err){
   return res.status(500).json({
    success:false,
    message:err.message
   });
    }
})








module.exports=router;