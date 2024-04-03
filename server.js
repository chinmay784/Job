const app = require("./app")
const cloudinary = require("cloudinary")
const PORT = process.env.PORT || 3000


cloudinary.v2.config({
    cloud_name : process.env.CLOUDINARY_CLIENT_NAME,
    api_key : process.env.CLOUDINARY_CLIENT_APIKEY ,
    api_secret : process.env.CLOUDINARY_CLIENT_SECRET,
})

app.listen(PORT, () =>{
    console.log(`server is running in port ${PORT}`)
})
