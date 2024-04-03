const { catchAsyncError } = require("../middleweres/catchasyncError");
const ErrorHandler = require("../middleweres/error");
const Application = require("../models/applicationSchema");
const cloudinary = require("cloudinary")
const Job = require("../models/jobSchema")



exports.employeeGetAllApplications = catchAsyncError(async(req,res,next) =>{
    
    const {role} = req.user;

    if(role === "Job Seeker"){
        return next( 
            new ErrorHandler("job seeker is not allowed to access this resourses",
            400)
        )
    };


    const {_id} = req.user;

    const application = await Application.find({"employerID.user":_id});

    res.status(200).json({
        success:true,
        application,
    })

})



exports.jobSeekerGetAllAplication = catchAsyncError(async(req,res,next) =>{

    const {role} = req.user;

    if(role === "Employer"){
        return next( 
            new ErrorHandler("Employer is not allowed to access this resourses",
            400)
        )
    };

    const {_id} = req.user;

    const application = await Application.find({"applicantID.user":_id});

    res.status(200).json({
        success:true,
        application,
    })

})




exports.jobSeekerDelete = catchAsyncError(async(req,res,next) =>{

    const {role} = req.user;

    if(role === "Employer"){
        return next( 
            new ErrorHandler("Employer is not allowed to access this resourses",
            400)
        )
    };

    const {id} = req.params;

    const applications = await Application.findById(id);

    if(!applications){
        return next(
            new ErrorHandler("Opps application not found ",
            404)
        )
    }


    await applications.deleteOne();

    res.status(200).json({
        success:true,
        message:"application Deleted Successfully"
    })

})




exports.postApplication = catchAsyncError(async(req,res,next) =>{

    const {role} = req.user;

    if(role === "Employer"){
        return next( 
            new ErrorHandler("Employer is not allowed to access this resourses",
            400)
        )
    };


    if(!req.files || Object.keys(req.files).length === 0){
        return next(
            new ErrorHandler("Resume File is Required"
            )
        )
    }

    const {resume} = req.files;


    const allowedFormates = ['image.png','image.jpg','image.webp'];

    if(allowedFormates.includes(resume.mimetype)){
        return next(
            new ErrorHandler("Invalid File type , Please upload your resume in a PNG,JPEG,WEBP format",400
            )
        )
    }


    const cloudinaryResponse = await cloudinary.uploader.upload(
        resume.tempFilePath
      );

    if(!cloudinaryResponse || cloudinaryResponse.error){
        console.log("cloudinary Error",cloudinaryResponse.error || "Unknown cloudinary Error");

        return next(
            new ErrorHandler(
                "Failed to upload resume",
                400
            )
        )
    }



    const {name,email,coverLetter,phone,address,jobId} = req.body;

    const applicantID= {
        user : req.user._id,
        role:"Job Seeker",
    }

    if(!jobId){
        return next(
            new ErrorHandler(
                "Job not found",
                400
            )
        )
    }


    const jobDetails = await Job.findById(jobId);

    if(!jobDetails){
        return next(
            new ErrorHandler(
                "job not found",
                400
            )
        )
    }


    const employerID = {
        user : jobDetails.postedBy,
        role:"Employer",
    }


    if(!name || !email || !coverLetter || !phone || !address || !applicantID || !employerID || !resume){
        return next(
            new ErrorHandler(
                "Please fill All fildes",
                400
            )
        )
    }



    const application = await Application.create({
        name,
        email,
        coverLetter,
        phone,
        address,
        applicantID,
        employerID,
        resume :{
            public_id: cloudinaryResponse.public_id ,
            url : cloudinaryResponse.secure_url ,
        }
    });



    res.status(200).json({
        success :true,
        message: "Application Submited Successfully",
        application,
    })

})