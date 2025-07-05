//CRUD Applications - CREATE,READ, UPDATE AND DELETE
//AUTHENTICATION -DEPARTMENT, STUDENT AND TEACHER
require("dotenv").config()
const formidable = require("formidable");
const path = require("path")
const fs = require("fs")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const Department = require("../models/department.model");
const { error } = require("console");

module.exports={
    registerDepartment: async(req, res)=>{  
    try{
          const form = new formidable.IncomingForm();
        form.parse(req, async(err, fields, files)=>{
            const department = await Department.findOne({email:fields.email[0]});
            if(department){
                return res.status(409).json({success:false, message:"Email is already registered."})
            }else{

            
            const photo = files.image[0];
            let filepath = photo.filepath;
            let originalFilename = photo.originalFilename.replace("","_"); //photo one
            let newPath = path.join(__dirname,process.env.DEPARTMENT_IMAGE_PATH, originalFilename);
            
            let photoData = fs.readFileSync(filepath);
            fs.writeFileSync(newPath,photoData);

            const salt = bcrypt.genSaltSync(10);
            const hashPassword = bcrypt.hashSync(fields.password[0],salt)
            const newDepartment = new Department({
                department_name:fields.department_name[0],
                email:fields.email[0],
                owner_name:fields.owner_name[0],
                department_image:originalFilename,
                password:hashPassword
            })

            const savedDepartment = await newDepartment.save();
            res.status(200).json({success:true,data:savedDepartment, message:"Department is Registered Successfully."})
        }
        })
    
    }catch (error){
        res.status(500).json({success:false, message:"Department Registration Failed"})
    }
},
loginDepartment: async(req, res)=>{
     try{
        const department = await Department.findOne({email:req.body.email});
        if(department){
            const isAuth = bcrypt.compareSync(req.body.password, department.password);
            if(isAuth){
                const jwtSecret = process.env.JWT_SECRET;
                const token = jwt.sign({
                    id:department._id,
                    departmentId: department._id,
                    owner_name:department.owner_name,
                    department_name:department.department_name,
                    image_url: department.department_image,
                    role:"DEPARTMENT"}, jwtSec)
                res.header("Authorization", token )
                res.status(200).json({success:true, message:"Success Login",
                    user:{
                        id:department._id,
                        owner_name:department.owner_name,
                        department_name:department.department_name,
                        image_url: department.department_image,
                        role:"DEPARTMENT"
                    }
                })
            }else{
                res.status(401).json({success:false, message:"Password is Incorrect."})
            }

        }else{
            res.status(401).json({success:false, message:"Email is not registered."})
        }
    }catch (error){
        res.status(500).json({success:false, message:"Internal Server Error [DEPARTMENT LOGIN]."})
    }
},
getAllDepartments: async(req, res)=>{
    try{
        const departments = await Department.find().select(['-password','-id','-email','-owner_name','-createdAt'])
        res.status(200).json({success:true, message:'Success in fetching all department.',departments})
    }catch(error){
        res.status(500).json({success:false, message: "Internal Server Error [ALL DEPARTMENT DATA]."})
    }
},
getDepartmentOwnData: async(req, res)=>{
    try {
        const id = req.user.id;
        const department = await Department.findOne({_id:id});
        if(department){
            res.status(200).json({success:true, department})
        }else{
            res.status(404).json({success:false, message: "Department not found."})
        }

    }catch(error) {
        res.status(500).json({success:false, message: "Internal Server Error [ OWN DEPARTMENT DATA]."})
    }
},
updateDepartment: async(req, res)=>{  
    try{
        const id = req.user.id;
        const form = new formidable.IncomingForm();
        form.parse(req, async(err, fields, files)=>{

            const department = await Department.findOne({_id:id});
            if(files.image){
                 const photo = files.image[0];
                 let filepath = photo.filepath;
                 let originalFilename = photo.originalFilename.replace("","_"); //photo one

                 if(department.department_image){
                    let oldPath = path.join(__dirname,process.env.DEPARTMENT_IMAGE_PATH, department.department_image);
                    if(fs.existsSync(oldImagePath)){
                        fs.unlink(oldImagePath, (err)=>{
                            if(err) console.log("Error deleting old Image.",err)
                        })
                    }
                 }
                 
                 
                 let newPath = path.join(__dirname,process.env.DEPARTMENT_IMAGE_PATH, originalFilename);
                 let photoData = fs.readFileSync(filepath);
                 fs.writeFileSync(newPath,photoData);

                 Object.keys(fields).forEach((field)=>{
                    department[field]=fields[field][0]
                 })
                 await department.save();
                 res.status(200).json({success:true, message:"Updated Successfully.", department})
            }
           
            
        })
    
    }catch (error){
        res.status(500).json({success:false, message:"Department Registration Failed"})
    }
},

}