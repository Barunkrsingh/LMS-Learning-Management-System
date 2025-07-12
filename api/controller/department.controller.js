require("dotenv").config();
const formidable = require("formidable");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWTSECRET;

const Department = require("../model/department.model");
module.exports = {

    getAllDepartments: async(req,res)=>{
         try {
            const departments= await Department.find().select(['-_id','-password','-email','-owner_name','-createdAt']);
            res.status(200).json({success:true, message:"Success in fetching all  Departments", data:departments})
         } catch (error) {
            console.log("Error in getAllDepartments", error);
            res.status(500).json({success:false, message:"Server Error in Getting All Departments. Try later"})
        }

    },
    registerDepartment: async (req, res) => {
        const form = new formidable.IncomingForm();

        form.parse(req, (err, fields, files) => {
            console.log(fields,"fields")
            Department.find({ email: fields.email }).then(resp => {
                if (resp.length > 0) {
                    res.status(500).json({ success: false, message: "Email Already Exist!" })
                } else {
                    const photo = files.image[0];
                    let oldPath = photo.filepath;
                    let originalFileName = photo.originalFilename.replace(" ", "_")

                    let newPath = path.join(__dirname, '../../frontend/public/images/uploaded/department', '/', originalFileName)

                    let photoData = fs.readFileSync(oldPath);
                    fs.writeFile(newPath, photoData, function (err) {
                        if (err) console.log(err);

                        var salt = bcrypt.genSaltSync(10);
                        var hashPassword = bcrypt.hashSync(fields.password[0], salt);

                        const newDepartment = new Department({
                            department_name:fields.department_name[0],
                            email: fields.email[0],
                            owner_name: fields.owner_name[0],
                            password: hashPassword,
                            department_image: originalFileName
                        })

                        newDepartment.save().then(savedData => {
                            console.log("Date saved", savedData);
                            res.status(200).json({ success: true, data: savedData, message:"Department is Registered Successfully." })
                        }).catch(e => {
                            console.log("ERRORO in Register", e)
                            res.status(500).json({ success: false, message: "Failed Registration." })
                        })

                    })


                }
            })

        })



    },
    loginDepartment: async (req, res) => {
        Department.find({ email: req.body.email }).then(resp => {
            if (resp.length > 0) {
                const isAuth = bcrypt.compareSync(req.body.password, resp[0].password);
                if (isAuth) {   
                    const token = jwt.sign(
                        {
                            id: resp[0]._id,
                            departmentId:resp[0]._id,
                            department_name: resp[0].department_name,
                            owner_name:resp[0].owner_name,
                            image_url: resp[0].department_image,
                            role:'DEPARTMENT'
                        }, jwtSecret );

                   res.header("Authorization", token);
                   res.status(200).json({ success: true, message: "Success Login", 
                    user: {
                         id: resp[0]._id, 
                         owner_name:resp[0].owner_name, 
                         department_name: resp[0].department_name,
                          image_url: resp[0].department_image, 
                          role: "DEPARTMENT" } })
                }else {
                    res.status(401).json({ success: false, message: "Password doesn't match." })
                }

            } else {
                res.status(401).json({ success: false, message: "Email not registerd." })
            }
        })
    },
    getDepartmentOwnData: async(req, res)=>{
        const id = req.user.id;
        Department.findById(id).then(resp=>{
            if(resp){
                res.status(200).json({success:true, data:resp})
            }else {
                res.status(500).json({ success: false, message: "Department data not Available" })
            }
        }).catch(e=>{
            console.log("Error in getDepartmentWithId", e)
            res.status(500).json({ success: false, message: "Error in getting  Department Data" })
        })
    },

    updateDepartmentWithId: async (req, res) => {
        const form =new formidable.IncomingForm({ multiples: false,
         uploadDir: path.join(__dirname, '../../frontend/public/images/uploaded/department'), keepExtensions: true });
        form.parse(req, async (err, fields, files) => {
            console.log(fields)
          if (err) {
            return res.status(400).json({ message: "Error parsing the form data." });
          }
          try {
            const id  = req.user.id;
            const department = await Department.findById(id);
      
            if (!department) {
              return res.status(404).json({ message: "Department not found." });
            }
      
            
            // Update text fields
            Object.keys(fields).forEach((field) => {
              department[field] = fields[field][0];
            });
      
            // Handle image file if provided
            if (files.image) {
              // Delete the old image if it exists
              const oldImagePath = path.join(__dirname, '../../frontend/public/images/uploaded/department',  department.department_image);
               
              if (department.department_image && fs.existsSync(oldImagePath)) {
                fs.unlink(oldImagePath, (unlinkErr) => {
                  if (unlinkErr) console.log("Error deleting old image:", unlinkErr);
                });
              }
      
              // Set the new image filename            
              let filepath = files.image[0].filepath;
              const originalFileName = path.basename(files.image[0].originalFilename.replace(" ", "_"));
              let newPath = path.join(__dirname, '../../frontend/public/images/uploaded/department', '/', originalFileName);
              let photoData = fs.readFileSync(filepath);
              
             fs.writeFileSync(newPath, photoData);
              department.department_image=originalFileName;
            }
            // Save the updated department document
            await department.save();
            res.status(200).json({ message: "Department updated successfully", data: department });
          } catch (e) {
            console.log(e);
            res.status(500).json({ message: "Error updating department details." });
          }
        });
      },
    signOut:async(req, res)=>{
       

        try {
            res.header("Authorization",  "");
            // "Authorization"
            res.status(200).json({success:true, messsage:"Department Signed Out  Successfully."})
        } catch (error) {
            console.log("Error in Sign out", error);
            res.status(500).json({success:false, message:"Server Error in Signing Out. Try later"})
        }
    },
    isDepartmentLoggedIn: async(req,  res)=>{
        try {
            let token = req.header("Authorization");
            if(token){
                var decoded = jwt.verify(token, jwtSecret);
                console.log(decoded)
                if(decoded){
                    res.status(200).json({success:true,  data:decoded, message:"Department is a logged in One"})
                }else{
                    res.status(401).json({success:false, message:"You are not Authorized."})
                }
            }else{
                res.status(401).json({success:false, message:"You are not Authorized."})
            }
        } catch (error) {
            console.log("Error in isDepartmentLoggedIn", error);
            res.status(500).json({success:false, message:"Server Error in Department Logged in check. Try later"})
        }
    }
}