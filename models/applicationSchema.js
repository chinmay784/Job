const mongoose = require("mongoose")
const validator = require("validator");


const applicationSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please provide your name"],
        minLength:[3,"Name must contain at least 3 character"],
        maxLength:[30,"Name cannot exceed 30 character"],

    },
    email:{
        type:String,
        validator:[validator.isEmail,"Please provide a valid email"],
        required:true,
    },
    coverLetter:{
        type:String,
        required:[true,"Please Provide your cover latter "]
    },
    phone:{
        type:Number,
        required:[true,"Please Provide your phone number"]
    },
    address:{
        type:String,
        required:[true,"Please Provide your address "]
    },
    resume:{
        public_id:{
            type:String,
            required:true,
        },url:{
            type:String,
            required:true,
        }
    },
    applicantID :{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
        role:{
            type:String,
            enum:["Job Seeker"],
            required:true,
        }
    },
    employerID :{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
        role:{
            type:String,
            enum:["Employer"],
            required:true,
        }
    }
})


module.exports = mongoose.model("Application",applicationSchema);