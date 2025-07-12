const express = require("express");
const router = express.Router();
const authMiddleware = require('../auth/auth')
const { createSemester, getAllSemester, getSemesterWithId, updateSemesterWithId, deleteSemesterWithId, createSubTeacher, updateSubTeacher, deleteSubTeacherWithId, getAttendeeTeacher } = require("../controller/semester.controller");


router.post("/create",authMiddleware(['DEPARTMENT']), createSemester);
router.get("/fetch-all",authMiddleware(['DEPARTMENT','TEACHER']),getAllSemester);
router.get("/fetch-single/:id",  getSemesterWithId);
router.patch("/update/:id", authMiddleware(['DEPARTMENT']), updateSemesterWithId);
router.delete("/delete/:id",authMiddleware(['DEPARTMENT']), deleteSemesterWithId);
// router.post("/sub-teach/new/:id",createSubTeacher );
// router.post("/sub-teach/update/:SemesterId/:subTeachId",updateSubTeacher );
// router.delete("/sub-teach/delete/:SemesterId/:subTeachId",deleteSubTeacherWithId );
router.get("/attendee",authMiddleware(['TEACHER']), getAttendeeTeacher);

module.exports = router;