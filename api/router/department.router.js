const express = require("express");
const authMiddleware = require('../auth/auth');
const { getAllDepartments, updateDepartmentWithId,signOut,isDepartmentLoggedIn, registerDepartment, loginDepartment, getDepartmentOwnData } = require("../controller/department.controller");

const router = express.Router();

router.post('/register', registerDepartment);
router.get("/all", getAllDepartments);
router.post("/login", loginDepartment);
router.patch("/update",authMiddleware(['DEPARTMENT']), updateDepartmentWithId);
router.get("/fetch-single",authMiddleware(['DEPARTMENT']),getDepartmentOwnData);
router.get("/sign-out", signOut);
router.get("/is-login",  isDepartmentLoggedIn)

module.exports = router;