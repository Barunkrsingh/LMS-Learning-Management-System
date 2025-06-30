const mongoose = require("mongoose");

const semesterSchema = new mongoose.Schema({
    department:{type:mongoose.Schema.ObjectId, ref:"Department"},
    semester_text:{type:String, required:true},
    semester_num:{type:Number, required:true},
    attendee:{type:mongoose.Schema.ObjectId, ref:"Teacher"},
    createAt:{type:Date,default:new Date()}
})

module.experts = moongoose.model("Department", semesterSchema)