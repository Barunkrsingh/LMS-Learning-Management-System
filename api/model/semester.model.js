const mongoose = require("mongoose");
const asignSubTeachSchema =new mongoose.Schema({
    subject:{type:mongoose.Schema.ObjectId, ref:'Subject'},
    teacher:{type:mongoose.Schema.ObjectId, ref:"Teacher"}
})
const semesterSchema = new mongoose.Schema({
    department:{type:mongoose.Schema.ObjectId, ref:'Department'},
    semester_text:{type:String, required:true},
    semester_num:{type:Number,required:true},
    asignSubTeach:[asignSubTeachSchema],
    attendee:{type:mongoose.Schema.ObjectId, ref:'Teacher', required:false},
    createdAt:{type:Date, default:new Date()}

})

module.exports = mongoose.model("Semester", semesterSchema)