const express = require("express");
const { getAllJobs, postJob, getMyJobs, updateJob, deleteJob, getSinglejob } = require("../controllers/jibController");
const { isAuthorised } = require("../middleweres/auth");

const router = express.Router();

router.get("/getall",getAllJobs);
router.post("/post", isAuthorised,postJob);
router.get("/getmyjobs", isAuthorised,getMyJobs);
router.put("/update/:id", isAuthorised,updateJob);
router.delete("/delete/:id", isAuthorised,deleteJob);
router.get("/:id", isAuthorised,getSinglejob);


module.exports = router;