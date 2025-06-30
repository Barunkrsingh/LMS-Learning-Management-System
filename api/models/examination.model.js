const mongoose = require("mongoose");

const examinationSchema = new mongoose.Schema({
    department:{type:mongoose.Schema.ObjectId, ref:"Department"},
    examDate:{type:Date, required:true},
    subject:{type:mongoose.Schema.ObjectId, ref:"Subject"},
    examType:{type:String, required:true},
    semester:{type:mongoose.Schema.ObjectId, ref:"Semester"},
    
    createdAt:{type:Date, default: new Date()}
})

module.exports = mongoose.model("Examination", examinationSchema)