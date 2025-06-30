const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
  department:{type:mongoose.Schema.ObjectId, ref:"Department"},
  teacher:{type:mongoose.Schema.ObjectId, ref:"Teacher"},
  subject:{type:mongoose.Schema.ObjectId, ref:"Subject"},
  semester:{type:mongoose.Schema.ObjectId, ref:"Semester"},
  startTime:{type:Date, required:true},
  endTime:{type:Date,  required: true},

  createAt:{type:Date,default:new Date()}
})

module.exports = mongoose.model("Schedule", scheduleSchema);
