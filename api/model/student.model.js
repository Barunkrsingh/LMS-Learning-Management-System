const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    department:{type:mongoose.Schema.ObjectId, ref:'Department'},
    email:{type:String, required:true},
    name:{type:String, required:true},
    student_semester:{type:mongoose.Schema.ObjectId, ref:"Semester"},
    age:{type:String, required:true},
    gender:{type:String, required:true},
    guardian:{type:String, required:true},
    guardian_phone:{type:String, required:true},
    student_image:{type:String,  required:true},
    createdAt:{type:Date, default: new Date()},

    password:{type:String, required:true}

})

module.exports = mongoose.model("Student", studentSchema)
