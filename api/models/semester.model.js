const mongoose = require('mongoose');

const semesterSchema = new mongoose.Schema({
    Department:{type:mongoose.Schema.ObjectId, ref:'Department'},
    class_text:{type:String, required:true},
    class_num:{type:Number, required:true},
    attendee:{type:mongoose.Schema.ObjectId, ref:'Teacher'},
    createAt:{type:Date,default:new Date()}
})

module.experts = moongoose.model("class", semesterSchema)