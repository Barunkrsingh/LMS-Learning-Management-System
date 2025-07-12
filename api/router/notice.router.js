// routes/notices.js
const express = require("express");
const router = express.Router();
const authMiddleware = require('../auth/auth');
const { newNotice, fetchAllAudiance, fetchAudiance, deleteNotice, editNotice } = require("../controller/notice.controller");

router.post("/add", authMiddleware(['DEPARTMENT']), newNotice);
router.get("/fetch/all",authMiddleware(['DEPARTMENT','TEACHER','STUDENT']), fetchAllAudiance)
router.get("/fetch/:audience",authMiddleware(['DEPARTMENT','TEACHER','STUDENT']),fetchAudiance);
router.put("/:id",authMiddleware(['DEPARTMENT']),editNotice)
router.delete("/:id",authMiddleware(['DEPARTMENT']),deleteNotice)
  
module.exports = router;
