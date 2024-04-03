exports.catchAsyncError = (ff) =>{
    return(req,res,next) =>{
        Promise.resolve(ff(req,res,next)).catch(next)
    }
}