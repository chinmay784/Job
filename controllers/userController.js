const { catchAsyncError } = require("../middleweres/catchasyncError");
const ErrorHandler = require("../middleweres/error");
const User = require("../models/userSchema");
const { sendToken } = require("../utils/jwtTokens");


exports.register = catchAsyncError(async(req,res,next) =>{

    const {name,email,phone,password,role} = req.body;

    if(!name || !email || !phone || !password || !role){
       
        return next(
            new ErrorHandler("please provide all fildes")
        )
    }


    const isEmail = await User.findOne({email});

    if(isEmail){
        
        return res.status(400).json({
            success:false,
            message:"email already exist",
        })
    }

    const user = await User.create({
        name,
        email,
        phone,
        password,
        role,
    });


   sendToken(user,200,res,"User Registred Successfully")

})




exports.login = catchAsyncError(async(req,res,next)=>{

    const {email,password, role} = req.body;
    


    if(!email || !password || !role){
        return next(new ErrorHandler("Please provide email,password &Role",400))
    }


    const user = await User.findOne({email}).select("+password");


    if(!user){
        return next(new ErrorHandler("Invalid Email or Password",400))
    }


    const isPasswordMatch = await user.comparePassword(password);

    if(!isPasswordMatch){
        return next(new ErrorHandler("Invalid Email or Password",400))
    }


    if(user.role !==role){
        return next(new ErrorHandler("user in this role not found",400))
    } 



    sendToken(user,200,res,"user Logged in successfully ")
})




exports.logout = catchAsyncError(async(req,res,next) =>{
    res.status(200).cookie("token","",{
        httpOnly : true,
        expires : new Date(Date.now()),
    }).json({
        success:true,
        message:"User logged Out"
    })
})



exports.getAllUser = catchAsyncError(async(req,res,next) =>{

    const user = req.user;

    res.status(200).json({
        success:true,
        user,
    })
})