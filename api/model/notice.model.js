// models/Notice.js
const mongoose = require("mongoose");

const NoticeSchema = new mongoose.Schema({
  department:{type:mongoose.Schema.ObjectId, ref:'Department'},
  title: { type: String, required: true },
  message: { type: String, required: true },
  audience: { type: String, enum: ["student", "teacher"], required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Notice", NoticeSchema);
