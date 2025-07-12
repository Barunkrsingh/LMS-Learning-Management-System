const mongoose = require("mongoose");

const examinationSchema = new mongoose.Schema({
    department:{type:mongoose.Schema.ObjectId, ref:'Department'},
    examDate:{type:String,  required:true},
    subject:{type:mongoose.Schema.ObjectId, ref:"Subject"},
    examType:{type:String, required:true},
    status:{type:String, default:'pending'},   
    semester:{type:mongoose.Schema.ObjectId, ref:"Semester"},
    createdAt:{type:Date, default: new Date()}

})

module.exports = mongoose.model("Examination", examinationSchema)