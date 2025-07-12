const Period = require('../model/period.model');

// Controller to create a period
exports.createPeriod = async (req, res) => {
  try {
    const { teacher, subject, semesterId, startTime, endTime } = req.body;
    const departmentId = req.user.departmentId;
    const newPeriod = new Period({
       teacher, 
       subject, 
       semester: semesterId, 
       startTime:new Date(startTime),
       endTime:new Date(endTime), 
       department:departmentId
      });

    await newPeriod.save();
    res.status(201).json({ message: 'Period assigned successfully', period: newPeriod });
  } catch (error) {
    res.status(500).json({ message: 'Error creating period', error });
    console.log("Error", error)
  }
};

// Controller to get periods for a specific teacher
exports.getTeacherPeriods = async (req, res) => {
  try {
    const departmentId = req.user.departmentId;
    const { teacherId } = req.params;
    const periods = await Period.find({ teacher: teacherId,department:departmentId }).populate('semester').populate('subject');
    res.status(200).json({ periods });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching periods', error });
  }
};

exports.getPeriodsWithId = async (req, res) => {
    try {
      const { id } = req.params;
      const period = await Period.findById(id).populate('semester').populate('subject').populate('teacher');
      res.status(200).json({ period });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching periods by id', error });
    }
  };

// Controller to get periods for a specific semester
exports.getSemesterPeriods = async (req, res) => {
    
    try {
      const { semesterId } = req.params;
      const departmentId = req.user.departmentId;
      const periods = await Period.find({semester:semesterId,department:departmentId}).populate('subject').populate('teacher');
      console.log(semesterId)
      res.status(200).json({ periods });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching periods', error });
    }
  };

  // all periods
exports.getPeriods = async (req, res) => {
    try {
      const departmentId = req.user.departmentId;
      const periods = await Period.find({department:departmentId}).populate('semester').populate('subject').populate("teacher")
      res.status(200).json({ periods });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching periods', error });
    }
  };


// Update period
exports.updatePeriod = async (req, res) => {

  try {
    const { startTime, endTime,teacher, subject } = req.body; // we will only update teacher and subject
    const periodId = req.params.id;
    const updatedPeriod = await Period.findOneAndUpdate(
      {_id:periodId,department:req.user.departmentId},
      { subject,teacher },
      { new: true }
    );
    res.status(200).json({ message: 'Period updated successfully', period: updatedPeriod });
  } catch (error) {
    res.status(500).json({ message: 'Error updating period', error });
  }
};

// Delete period
exports.deletePeriod = async (req, res) => {
  try {
    const periodId = req.params.id;
    await Period.findByIdAndDelete(periodId);
    res.status(200).json({ message: 'Period deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting period', error });
  }
};
