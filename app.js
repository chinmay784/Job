const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const userRouter = require("./routes/userRoute");
const application = require("./routes/applicationRouter");
const jobs = require("./routes/jobRouter");
const {dbConnection} = require("./database/dbConnection");
const errorMiddelwere = require("./middleweres/error")

const app = express();
dotenv.config({path : "./config/config.env"});

app.get("/",(req,res) =>{
    res.json("Hello")
})


app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:['POST','GET','PUT','DELETE'],
    credentials :true
}));


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({
    extended :true,
}));


app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : "/tmp/",
}));


app.use("/api/v1/user",userRouter);
app.use("/api/v1/application",application);
app.use("/api/v1/job",jobs);

dbConnection();

app.use(errorMiddelwere)

module.exports = app;
