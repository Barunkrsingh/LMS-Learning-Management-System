require("dotenv").config();

const Semester = require("../model/semester.model");
const Student = require("../model/student.model");
const Exam = require("../model/examination.model");
const Period = require("../model/period.model");
module.exports = {

    getAllSemester: async(req,res)=>{
         try {
            const departmentId = req.user.departmentId;
            const allSemester= await Semester.find({department:departmentId});
            res.status(200).json({success:true, message:"Success in fetching all  Semester", data:allSemester})
         } catch (error) {
            console.log("Error in getAllSemester", error);
            res.status(500).json({success:false, message:"Server Error in Getting All Semester. Try later"})
        }

    },
    createSemester: (req, res) => {
       const departmentId = req.user.id;
       const newSemester = new Semester({...req.body,department:departmentId});
       newSemester.save().then(savedData => {
           console.log("Date saved", savedData);
           res.status(200).json({ success: true, data: savedData, message:"Semester is Created Successfully." })
       }).catch(e => {
           console.log("ERRORO in Register", e)
           res.status(500).json({ success: false, message: "Failed Creation of Semester." })
       })

 },
    getSemesterWithId: async(req, res)=>{
        console.log("ID SEMESTER", req.params.id)
        const id = req.params.id;
        Semester.findById(id).populate("asignSubTeach.subject").populate("asignSubTeach.teacher").populate("attendee").then(resp=>{
            if(resp){
                res.status(200).json({success:true, data:resp})
            }else {
                res.status(500).json({ success: false, message: "Semester data not Available" })
            }
        }).catch(e=>{
            console.log("Error in getSemesterWithId", e)
            res.status(500).json({ success: false, message: "Error in getting  Semester Data" })
        })
    },

    updateSemesterWithId: async(req, res)=>{
       
        try {
            let id = req.params.id;
            console.log(req.body)
            await Semester.findOneAndUpdate({_id:id},{$set:{...req.body}});
            const SemesterAfterUpdate =await Semester.findOne({_id:id});
            res.status(200).json({success:true, message:"Semester Updated", data:SemesterAfterUpdate})
        } catch (error) {
            
            console.log("Error in updateSemesterWithId", error);
            res.status(500).json({success:false, message:"Server Error in Update Semester. Try later"})
        }

    },
    deleteSemesterWithId: async(req, res)=>{
       
        try {
            let id = req.params.id;
            const departmentId = req.user.departmentId;
            const semesterStudentCount =(await Student.find({student_semester:id,department:departmentId})).length;
            const semesterExamCount =(await Exam.find({semester:id,department:departmentId})).length;
            const semesterPeriodCount =(await Period.find({semester:id,department:departmentId})).length;
            if((semesterStudentCount===0) && (semesterExamCount===0) && (semesterPeriodCount===0)){
                await Semester.findOneAndDelete({_id:id,department:departmentId});
                const semesterAfterDelete = await Semester.findOne({_id:id});
                res.status(200).json({success:true, message:"Semester Deleted.", data:semesterAfterDelete})
            }else{
                res.status(500).json({success:false, message:"This semester is already in use."})
            }
          
        } catch (error) {
            
            console.log("Error in updateSemesterWithId", error);
            res.status(500).json({success:false, message:"Server Error in Deleting Semester. Try later"})
        }

    },
    createSubTeacher:async(req, res)=>{
        try {
            let id = req.params.id;
            const departmentId = req.user.departmentId;
            const semesterDetails =await Semester.findOne({_id:id,department:departmentId});
            let asignSubTeach = semesterDetails.asignSubTeach;
            console.log(asignSubTeach)
             asignSubTeach.push({...req.body})
            await Semester.findOneAndUpdate({_id:id},{$set:{asignSubTeach}});
            const SemesterAfterUpdate =await Semester.findOne({_id:id});
            res.status(200).json({success:true, message:"New Subject & Teacher Assigned.", data:SemesterAfterUpdate})
        } catch (error) {
            
            console.log("Error in updateSemesterWithId", error);
            res.status(500).json({success:false, message:"Server Error in Update Semester. Try later"})
        }


    },
    updateSubTeacher:async(req, res)=>{
        try {
            let semesterId = req.params.semesterId;
            const subTeachId = req.params.subTeachId;
            const semesterDetails =await Semester.findOne({_id:semesterId});
            let asignSubTeach = semesterDetails.asignSubTeach;
            asignSubTeach = asignSubTeach.map(item=>{
                if(item._id==subTeachId){
                    // item = {...item, subject:item.subject, teacher:item.teacher}
                    item.subject = req.body.subject;
                    item.teacher = req.body.teacher;
                    console.log(req.body)
                    return item;
                }
                return item
            })
            
            // console.log(asignSubTeach)
            await Semester.findOneAndUpdate({_id:semesterId},{$set:{asignSubTeach}});
            const SemesterAfterUpdate =await Semester.findOne({_id:semesterId});
            res.status(200).json({success:true, message:"Subject & Teacher Assignment Updated.", data:SemesterAfterUpdate})
        } catch (error) {
            
            console.log("Error in updateSemesterWithId", error);
            res.status(500).json({success:false, message:"Server Error in Update Semester. Try later"})
        }


    },
    deleteSubTeacherWithId:async(req, res)=>{
        try {
            let semesterId = req.params.semesterId;
            const subTeachId = req.params.subTeachId;
            const semesterDetails =await Semester.findOne({_id:semesterId});
            let asignSubTeach = semesterDetails.asignSubTeach;
            asignSubTeach.forEach((item,i)=>{
                if(item._id==subTeachId){
                    asignSubTeach.splice(i,1)

                }
            })
            
            console.log(asignSubTeach)
            await Semester.findOneAndUpdate({_id:semesterId},{$set:{asignSubTeach}});
            const SemesterAfterUpdate =await Semester.findOne({_id:semesterId});
            res.status(200).json({success:true, message:"Subject & Teacher Assignment Cancelled.", data:SemesterAfterUpdate})
        } catch (error) {
            
            console.log("Error in updateSemesterWithId", error);
            res.status(500).json({success:false, message:"Server Error in Update Semester. Try later"})
        }


    },
    getAttendeeTeacher: async(req, res)=>{
        try {
            let attendeeSemester =await Semester.find({attendee:req.user.id});
           attendeeSemester = attendeeSemester.map(x=>{
          return {semester_num:x.semester_num,semester_text: x.semester_text,semesterId: x._id}
        })
            res.status(200).json(attendeeSemester)
            
        } catch (error) {
            console.log("Error in getting attendee", error);
            res.status(500).json({success:false, message:"Server Error in getting  Attendee. Try later"})
        }
    }
}