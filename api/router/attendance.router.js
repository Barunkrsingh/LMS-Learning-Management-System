const express = require('express');
const router = express.Router();
const { markAttendance, getAttendance, checkAttendance } = require('../controller/attendance.controller');
const authMiddleware = require('../auth/auth')
// Mark attendance
router.post('/mark',authMiddleware(['TEACHER']) , markAttendance);
router.get('/:studentId',authMiddleware(['TEACHER', 'STUDENT','DEPARTMENT']),  getAttendance);
router.get('/check/:departmentId', authMiddleware(['TEACHER']), checkAttendance)
module.exports = router;
