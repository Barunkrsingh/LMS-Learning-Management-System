// models/Period.js
const mongoose = require('mongoose');

const periodSchema = new mongoose.Schema({
  department:{type:mongoose.Schema.ObjectId, ref:'Department'},
  teacher: {   type: mongoose.Schema.Types.ObjectId,  ref: 'Teacher',   required: true, },
  subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject',  },
  semester: { type: mongoose.Schema.Types.ObjectId, ref: 'Semester', required: true,},
  startTime: { type: Date, required: true,},
  endTime: { type: Date,  required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Period', periodSchema);
