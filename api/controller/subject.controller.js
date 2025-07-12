require("dotenv").config();

const Subject = require("../model/subject.model");
const Exam = require("../model/examination.model");
const Period = require("../model/period.model");
module.exports = {

    getAllSubjects: async(req,res)=>{
         try {
            const departmentId = req.user.departmentId;
            const allSubject= await Subject.find({department:departmentId});
            res.status(200).json({success:true, message:"Success in fetching all  Subject", data:allSubject})
         } catch (error) {
            console.log("Error in getAllSubject", error);
            res.status(500).json({success:false, message:"Server Error in Getting All Subject. Try later"})
        }

    },
    createSubject: (req, res) => {
                        const departmentId = req.user.departmentId;
                        const newSubject = new Subject({...req.body, department:departmentId});
                        newSubject.save().then(savedData => {
                            console.log("Date saved", savedData);
                            res.status(200).json({ success: true, data: savedData, message:"Subject is Created Successfully." })
                        }).catch(e => {
                            console.log("ERRORO in Register", e)
                            res.status(500).json({ success: false, message: "Failed Creation of Subject." })
                        })

    },
    getSubjectWithId: async(req, res)=>{
        const id = req.params.id;
        const departmentId = req.user.departmentId;
        Subject.findOne({_id:id, department:departmentId}).populate("student_semester").then(resp=>{
            if(resp){
                res.status(200).json({success:true, data:resp})
            }else {
                res.status(500).json({ success: false, message: "Subject data not Available" })
            }
        }).catch(e=>{
            console.log("Error in getSubjectWithId", e)
            res.status(500).json({ success: false, message: "Error in getting  Subject Data" })
        })
    },

    updateSubjectWithId: async(req, res)=>{
    // Not providing the  departmentId as subject Id will be unique.
        try {
            let id = req.params.id;
            console.log(req.body)
            await Subject.findOneAndUpdate({_id:id},{$set:{...req.body}});
            const SubjectAfterUpdate =await Subject.findOne({_id:id});
            res.status(200).json({success:true, message:"Subject Updated", data:SubjectAfterUpdate})
        } catch (error) {
            
            console.log("Error in updateSubjectWithId", error);
            res.status(500).json({success:false, message:"Server Error in Update Subject. Try later"})
        }

    },
    deleteSubjectWithId: async(req, res)=>{
       
        try {
            const departmentId = req.user.departmentId;
            let id = req.params.id;
            const subExamCount = (await Exam.find({subject:id,department:departmentId})).length;
            const subPeriodCount = (await Period.find({subject:id,department:departmentId})).length;
            if((subExamCount===0) && (subPeriodCount===0)){
                await Subject.findOneAndDelete({_id:id,department:departmentId});
                const SubjectAfterDelete = await Subject.findOne({_id:id});
                res.status(200).json({success:true, message:"Subject Deleted.", data:SubjectAfterDelete})
            }else{
                res.status(500).json({success:false, message:"This semester is already in use."})
            }

          
        } catch (error) {
            
            console.log("Error in updateSubjectWithId", error);
            res.status(500).json({success:false, message:"Server Error in Deleting Subject. Try later"})
        }

    }
}