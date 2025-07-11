const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  department:{type:mongoose.Schema.ObjectId, ref:"Department"},
  student:{type:mongoose.Schema.ObjectId, ref:"Student"},
  semester:{type:mongoose.Schema.ObjectId, ref:"Semester"},
  date: { type: Date, required: true },
  status: { type: String, enum: ['Present', 'Absent'], default: 'Absent' },

  createdAt:{type:Date, default: new Date()}
})
module.exports = mongoose.model('Attendance', attendanceSchema);
