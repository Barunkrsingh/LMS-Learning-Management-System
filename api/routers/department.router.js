const express = require("express");
const { registerDepartment, getAllDepartments, loginDepartment, updateDepartment, getDepartmentOwnData } = require("../controllers/department.controller");

const router = express.Router();

router.post("/register",registerDepartment);
router.get("/all", getAllDepartments);
router.get("/login", loginDepartment);
router.patch("/update", updateDepartment);
router.get("/fetch-single", getDepartmentOwnData);



module.exports = router;