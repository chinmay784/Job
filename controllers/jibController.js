const { catchAsyncError } = require("../middleweres/catchasyncError");
const ErrorHandler = require("../middleweres/error");
const Job = require("../models/jobSchema")




exports.getAllJobs = catchAsyncError(async (req, res, next) => {

    const jobs = await Job.find({
        expired: false,
    });


    res.status(200).json({
        success: true,
        jobs,
    })
})




exports.postJob = catchAsyncError(async (req, res, next) => {

    const { role } = req.user;

    if (role === "Job Seeker") {
        return next(
            new ErrorHandler("job seeker is not allowed to access this resourses",
                400)
        )
    };

    const {
        title,
        description,
        category,
        country,
        city,
        location,
        fixedSalary,
        salaryForm,
        salaryTo,
    } = req.body;


    if (!title || !description || !category || !country || !city || !location) {
        return res.status(400).json({
            success: false,
            message: "Please provide all filds"
        })
    }


    if ((!salaryForm || !salaryTo) && !fixedSalary) {
        return next(
            new ErrorHandler("Please enter provide fixed salary",
                400
            )
        )
    }




    if (salaryForm && salaryTo && fixedSalary) {
        return next(
            new ErrorHandler("cannot enter fixed salary and ranged saary",
                400
            )
        )
    }



    const postedBy = req.user._id;


    const job = await Job.create({
        title,
        category,
        country,
        city,
        location,
        fixedSalary,
        salaryForm,
        salaryTo,
        description,
        postedBy
    })



    return res.status(200).json({
        success: true,
        message: "Job Posted SuccessFully",
        job,
    })

})




exports.getMyJobs = catchAsyncError(async (req, res, next) => {
    const { role } = req.user;

    if (role === "Job Seeker") {
        return next(
            new ErrorHandler("job seeker is not allowed to access this resourses",
                400)
        )
    };

    const myjobs = await Job.find({ postedBy: req.user._id });

    res.status(200).json({
        success: true,
        myjobs,
    })

})



exports.updateJob = catchAsyncError(async (req, res, next) => {

    const { role } = req.user;

    if (role === "Job Seeker") {
        return next(
            new ErrorHandler("job seeker is not allowed to access this resourses",
                400)
        )
    };


    const { id } = req.params;

    let job = await Job.findById(id);

    if (!job) {
        return next(
            new ErrorHandler("Opps Job Not Found",
                400)
        )
    }

    job = await Job.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    })

    res.status(200).json({
        success: true,
        message: "Job Updated Successfully",
    })

})



exports.deleteJob = catchAsyncError(async (req, res, next) => {

    const { role } = req.user;

    if (role === "Job Seeker") {
        return next(
            new ErrorHandler("job seeker is not allowed to access this resourses",
                400)
        )
    };


    const { id } = req.params;

    let job = await Job.findById(id);

    if (!job) {
        return next(
            new ErrorHandler("Opps Job Not Found",
                400)
        )
    }



    await job.deleteOne();


    res.status(200).json({
        success: true,
        message: "Job Deleted successfully"
    })


})



exports.getSinglejob = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;

    try {
        const job = await Job.findById(id);

        if (!job) {
            return res.status(404).json({
                message: "job not found",
                success: false,
            })
        }


        return res.status(200).json({
            success: true,
            job,
        })
    } catch (error) {
        return res.status(400).json({
            message: "Invalid Id or Cast error",
            success: false,
        })
    }
})