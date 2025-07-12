const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  department:{type:mongoose.Schema.ObjectId, ref:'Department'},
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  semester:{type:mongoose.Schema.Types.ObjectId, ref:"Semester"},
  date: { type: Date, required: true },
  status: { type: String, enum: ['Present', 'Absent'], default: 'Absent' }
}, { timestamps: true });

module.exports = mongoose.model('Attendance', attendanceSchema);
