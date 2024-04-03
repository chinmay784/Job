const mongoose = require("mongoose");


exports.dbConnection = () =>{
    mongoose.connect(process.env.MONGOO_URL)
    .then(() => console.log("DB Connected Successfully"))
    .catch( (error) => {
        console.log("DB Connection Failed");
        console.error(error);
        process.exit(1);
    } )
}