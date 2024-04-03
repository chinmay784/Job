class ErrorHandler extends Error{
    constructor(message,statusCode){
        super(message);
        this.statusCode = statusCode;
    }
}


exports.errorMiddelwere = (req,res,next,err) =>{
    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500;

    if(err.name === "CaseError"){
        const message = `Resourse Not Found ${err.path}`;
        err = new ErrorHandler(message,400) 
    }
    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} Enterd `;
        err = new ErrorHandler(message,400) 
    }
    if(err.name === "JsonWebTokenError"){
        const message = `json web token is invalid,please try again`;
        err = new ErrorHandler(message,400) 
    }
    if(err.name === "TokenExpiredError"){
        const message = `json web token is experied`;
        err = new ErrorHandler(message,400) 
    }

    return res.status(err.statusCode).json({
        success : false,
        message : err.message,
    });
};


module.exports = ErrorHandler;