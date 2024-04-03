
exports.sendToken = (user,statusCode,res,message)=>{

    const token = user.geJWTToken();

    const option = {
        expires:new Date(
            Date.now() + process.env.COOKIE_EXPIERE*24*60*60*1000
        ),
        httpOnly : true,
    }

    res.status(statusCode).cookie("token",token,option).json({
        success : true,
        user,
        message,
        token,
    })
}