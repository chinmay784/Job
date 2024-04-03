const { catchAsyncError } = require("./catchasyncError");
const ErrorHandler = require("./error");
const jwt = require("jsonwebtoken")
const User = require("../models/userSchema")

exports.isAuthorised = catchAsyncError(async(req,res,next) =>{
    const {token} = req.cookies;

    if(!token){
        return next(new ErrorHandler("user not authorised",400))
    }

    const decode = jwt.verify(token,process.env.JWT_SECRET_KEY);

    req.user = await User.findById(decode.id);

    next()
})