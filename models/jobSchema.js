const mongoose = require("mongoose")



const jobSchema = new mongoose.Schema({
    title : {
        type:String,
        required:[true,"Please provide job title"],
        minLength : [3," job contain at least 3 character "],
        maxLength : [50,"job contain cannot exceed 50 character"],
    },
    description :{
        type:String,
        required:[true,"Please provide job description"],
        minLength : [3,"job description contain at least 3 character "],
        maxLength : [350,"job description contain cannot exceed 350 character"],
    },
    category :{
        type:String,
        required:[true,"job category is required"],
    },
    country:{
        type:String,
        required:[true,"job country is required"],
    },
    city:{
        type:String,
        required:[true,"job city is required"],
    },
    location :{
        type:String,
        required:[true,"pLease provide exact location"],
        minLength : [50,"job location contain at least 50 character "],
    },
    fixedSalary :{
        type:Number,
        minLength : [4,"fixed salary contain at least 4 digit "],
        maxLength :[9,"fixed salary cannot exced 9 digit "],
    },
    salaryForm : {
        type:Number,
        minLength : [4,"salary Form contain at least 4 digit "],
        maxLength :[9,"salary Form cannot exced 9 digit "],
    },
    salaryTo :{
        type:Number,
        minLength : [4,"salaryTo contain at least 4 digit "],
        maxLength :[9,"salaryTo cannot exced 9 digit "],
    },
    expired :{
        type:Boolean,
        default:false,
    },
    jobPostedOn :{
        type: Date,
        default:Date.now,
    },
    postedBy :{
        type : mongoose.Schema.ObjectId,
        ref:"User",
        required: true,
    }

})



module.exports = mongoose.model("Job",jobSchema);