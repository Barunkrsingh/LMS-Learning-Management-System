const express = require("express");
const router = express.Router();
const authMiddleware = require('../auth/auth');
const { createSubject, getAllSubjects, getSubjectWithId, updateSubjectWithId, deleteSubjectWithId } = require("../controller/subject.controller");

router.post("/create",authMiddleware(['DEPARTMENT']), createSubject);
router.get("/fetch-all",authMiddleware(['DEPARTMENT']),getAllSubjects);
router.get("/fetch-single/:id",authMiddleware(['DEPARTMENT']),  getSubjectWithId);
router.patch("/update/:id",authMiddleware(['DEPARTMENT']), updateSubjectWithId);
router.delete("/delete/:id",authMiddleware(['DEPARTMENT']), deleteSubjectWithId);

module.exports = router;