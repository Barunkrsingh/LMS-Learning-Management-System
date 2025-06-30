require('dotenv').config()
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');


// ROUTERS IMPORT
const departmentRouter = require("./routers/department.router")
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors());
app.use(cookieParser());

// MONGODB CONNECTION
mongoose.connect('mongodb://localhost:27017/LearningMangementSystem').then(db=>{
    console.log("MongoDb is connected Sucessfully.")
}).catch(e=>{
    console.log("MongoDb error",e)
})

//ROUTERS
app.use("/api/department", departmentRouter

)
const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log("Server is Running at PORT=>",PORT)
})