const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
    department_name:{type:String, required:true},
    email:{ type: String,  required:true },
    owner_name:{type:String, required:true},
    department_image:{type:String,  required:true},
    createdAt:{type:Date, default: new Date()},

    password:{type:String, required:true}

})

module.exports = mongoose.model("Department", departmentSchema)