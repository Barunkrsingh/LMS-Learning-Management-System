const express = require('express');
const router = express.Router();
const authMiddleware = require('../auth/auth');
const { createPeriod, getTeacherPeriods, getPeriods, getSemesterPeriods, updatePeriod, deletePeriod, getPeriodsWithId } = require('../controller/period.controller');

router.post('/create',authMiddleware(['DEPARTMENT']), createPeriod);
router.get('/all',authMiddleware(['DEPARTMENT']), getPeriods)
router.get('/teacher/:teacherId',authMiddleware(['DEPARTMENT','TEACHER']), getTeacherPeriods);
router.get('/semester/:semesterId',authMiddleware(['DEPARTMENT','STUDENT','TEACHER']), getSemesterPeriods);
router.get('/:id',authMiddleware(['DEPARTMENT']), getPeriodsWithId)
router.put('/update/:id',authMiddleware(['DEPARTMENT']),  updatePeriod);
router.delete('/delete/:id',authMiddleware(['DEPARTMENT']), deletePeriod);

module.exports = router;
