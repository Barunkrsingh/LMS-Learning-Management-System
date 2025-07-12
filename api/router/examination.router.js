const express = require("express");
const router = express.Router();
const authMiddleware = require('../auth/auth');
const { newExamination,  getExaminationBySemester, updateExaminaitonWithId, deleteExaminationById, getExaminationById, getAllExaminations} = require("../controller/examination.controller");


router.post("/new", authMiddleware(['DEPARTMENT']),newExamination);
router.get("/all", authMiddleware(['DEPARTMENT','TEACHER']), getAllExaminations);
router.get("/fetch-semester/:semesterId",authMiddleware(['DEPARTMENT','STUDENT','TEACHER']),  getExaminationBySemester);
router.get('/single/:id',authMiddleware(['DEPARTMENT']), getExaminationById );
router.patch("/update/:id",authMiddleware(['DEPARTMENT']), updateExaminaitonWithId);
router.delete("/delete/:id",authMiddleware(['DEPARTMENT']),  deleteExaminationById);

module.exports = router;