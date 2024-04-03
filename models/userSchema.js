const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, "Please Provide your Name"],
        minLength : [3,"Name must contain should 3 characters"],
        maxLength : [30,"Name cannot exceed 30 characters"],
    },
    email : {
        type : String,
        required : [true, "Please Provide your Email"],
        validate : [validator.isEmail,"Please provide valid email"],
    },
    phone : {
        type : String,
        required : [true, "Please Provide your phone number"],
    },
    password : {
        type : String,
        required : [true, "Please Provide your Password"],
        minLength : [8,"Password must contain should 8 characters"],
        maxLength : [32,"Password cannot exceed 32 characters"],
        select:false,
    },
    role : {
        type : String,
        required : [true, "Please Provide your role"],
        enum : ["Job Seeker","Employer"],
    },
    createAt : {
        type : Date,
        default : Date.now,
    }
})

// Hashing the password
userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next();
    }

    this.password = await bcrypt.hash(this.password,10);
});


// comparing the password

userSchema.methods.comparePassword = async function(enterpassword){
    return await bcrypt.compare(enterpassword,this.password);
};


// generate jwt Token for Authorisition
userSchema.methods.geJWTToken = function(){
    return jwt.sign({
       id : this._id, 
    },
    process.env.JWT_SECRET_KEY,
    {
        expiresIn : process.env.JWT_EXPIERE
    }
    )
}




module.exports = mongoose.model("User",userSchema)