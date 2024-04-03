const express = require("express");
const { jobSeekerDelete, employeeGetAllApplications, jobSeekerGetAllAplication, postApplication } = require("../controllers/applicationController");
const { isAuthorised } = require("../middleweres/auth");

const router = express.Router();

router.get("/jobseeker/getall",isAuthorised,jobSeekerGetAllAplication)
router.get("/employer/getall",isAuthorised,employeeGetAllApplications)
router.delete("/delete/:id",isAuthorised,jobSeekerDelete)
router.post("/post",isAuthorised,postApplication)


module.exports = router;