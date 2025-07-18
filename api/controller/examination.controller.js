const Examination = require('../model/examination.model');

module.exports = {
    newExamination: (req, res)=>{
          const newExamination = new Examination({
              examDate:req.body.exam_date,
              subject:req.body.subject,
              examType:req.body.exam_type,
              semester:req.body.semester_id,
              department:req.user.id
          })
          newExamination.save().then(resp=>{
              res.status(200).send({success:true,  message:"Exam assigned Successfully."})
          }).catch(e=>{
             console.log(e)
             res.status(500).send({success:false, message:"Failure  in exam , try later."})
           })
    
    },
    getExaminationBySemester: async(req, res)=>{
        try {
            const departmentId = req.user.departmentId;
            const examination = await Examination.find({semester:req.params.semesterId,department:departmentId}).populate("subject");
            res.status(200).json({success:true, message:"Success in fetching User Applications.", data:examination})
        } catch (error) {
            res.status(500).send({success:false, message:"Failure  in fetching user applications, try later."})
        }
    },
    getAllExaminations:async(req, res)=>{
        try {
            const examinations = await Examination.find().populate("subject").populate("semester");
            res.status(200).json({success:true, message:"Success in fetching User Applications.", data:examinations})
        } catch (error) {
            res.status(500).send({success:false, message:"Failure  in fetching user applications, try later."})
        }
    },
    getExaminationById:async(req, res)=>{
        try {
           const examination = await Examination.findOne({_id:req.params.id});
            res.status(200).json({success:true, message:"Success in Fetching Single Examination.", data: examination})
        } catch (error) {
            res.status(500).send({success:false, message:"Failure  in Fetching Single Examination, try later."})
        }
    },
    deleteExaminationById:async(req, res)=>{
        try {
             await Examination.findOneAndDelete({_id:req.params.id});
            res.status(200).json({success:true, message:"Success in Deleting Examination."})
        } catch (error) {
            res.status(500).send({success:false, message:"Failure  in Deleting Examination, try later."})
        }
    },
    updateExaminaitonWithId: async(req, res)=>{
        try {
            let id = req.params.id;
            console.log(req.body,id)
            await Examination.findOneAndUpdate({_id:id},{$set:{examDate:req.body.exam_date, subject:req.body.subject, examType:req.body.exam_type}});
            // const examinationAfterUpdate =await department.findOne({_id:id});
            res.status(200).json({success:true, message:"Examination Updated."})
        } catch (error) {
            
            console.log("Error in updateDepartmentWithId", error);
            res.status(500).json({success:false, message:"Server Error in Update Department. Try later"})
        }

    },
}