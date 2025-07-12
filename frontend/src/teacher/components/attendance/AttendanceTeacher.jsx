import React, { useState, useEffect } from 'react';
import { Container, Button, Table, TableBody, TableCell, TableHead, TableRow, Typography, Select, MenuItem, Alert, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';
import moment from 'moment';
import { baseUrl } from '../../../environment';

const AttendanceTeacher = () => {
  const [students, setStudents] = useState([]);
  const [attendanceStatus, setAttendanceStatus] = useState({});
  const [attendanceTaken, setAttendanceTaken] = useState(false);
  const [loading, setLoading] = useState(true);
  const [attendeeSemester, setAttendeeSemester] = useState([])
  const [selectedSemester, setSelectedSemester] = useState(''); // New state for selected semester
  
  const todayDate = moment().format('YYYY-MM-DD'); // Get today's date in 'YYYY-MM-DD' format

  // Fetch all students and check if attendance is already taken
  useEffect(() => {
    const fetchStudentsAndCheckAttendance = async () => {
      try {
        const attendee = await axios.get(`${baseUrl}/semester/attendee`);
        console.log("attendee",attendee)
         setAttendeeSemester(attendee.data);

         if(attendeeSemester.length>0 && selectedSemester){
            // Check if attendance is already taken for today
            const attendanceResponse = await axios.get(`${baseUrl}/attendance/check/${selectedSemester.id}`);

            setAttendanceTaken(attendanceResponse.data.attendanceTaken);
              // Fetch students if attendance has not been taken yet
        if (!attendanceResponse.data.attendanceTaken) {
            const studentsResponse = await axios.get(`${baseUrl}/student/fetch-with-query`, { params: { student_semester: selectedSemester.id} }); // Fetch based on semester
            setStudents(studentsResponse.data.data);
  
            // Initialize attendance status for each student
            const initialStatus = {};
            studentsResponse.data.data.forEach((student) => {
              initialStatus[student._id] = 'Present'; // default value
            });
            setAttendanceStatus(initialStatus);
          }
         }
        
      
      
      

        setLoading(false);
      } catch (error) {
        console.error('Error fetching students or checking attendance:', error);
      }
    };

    fetchStudentsAndCheckAttendance();
  }, [todayDate, selectedSemester]);

  // Handle attendance status change for each student
  const handleStatusChange = (studentId, status) => {
    setAttendanceStatus((prevState) => ({
      ...prevState,
      [studentId]: status,
    }));
  };

  // Handle semester selection
  const handleSemesterChange = (event) => {
    let input = event.target.value;
    setSelectedSemester({id:input.split(",")[0], semester_text:input.split(",")[1]});
    console.log(event.target.value)
  };

  // Submit attendance for all students
  const submitAttendance = async () => {
    try {
      const attendanceRecords = students.map((student) => ({
        studentId: student._id,
        date: todayDate,
        status: attendanceStatus[student._id],
        semesterId: selectedSemester.id, // Include the semester
      }));
      
      // Send attendance records to backend
      await Promise.all(attendanceRecords.map((record) =>
        axios.post(`${baseUrl}/attendance/mark`, record)
      ));

      alert('Attendance submitted successfully');
      setAttendanceTaken(true); // Set attendance as taken
    } catch (error) {
      console.error('Error submitting attendance:', error);
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Mark Attendance for All Students</Typography>
      {attendeeSemester.length>0? <Alert severity="info" sx={{ mb: 3 }}>
          Your Are Attendee of {attendeeSemester.length} semester{attendeeSemester.length>1 && 'es'}. Select the semester and Take attendance.
        </Alert>:
        <Alert severity='info'>You are not attendee of any Semester.</Alert>}
     {attendeeSemester.length>0 && <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Select Semester</InputLabel>
        <Select value={selectedSemester?`${selectedSemester.id},${selectedSemester.semester_text}`:""} onChange={handleSemesterChange}>
          <MenuItem value={''}>Select Semester</MenuItem>
          {attendeeSemester && attendeeSemester.map((student_semester,i)=>(
             <MenuItem key={i} value={`${student_semester.semesterId},${student_semester.semester_text}`}>{student_semester.semester_text}</MenuItem>
          ))}
        
          {/* Add more semester options as needed */}
        </Select>
      </FormControl>} 

 
      {attendeeSemester.length>0 && selectedSemester && attendanceTaken && (
        <Alert severity="info" sx={{ mb: 3 }}>
          Attendance has already been taken for today for Semester {selectedSemester.semester_text}
        </Alert>
      ) }
        {attendeeSemester.length>0 && selectedSemester && !attendanceTaken && students.length<1 && (
            <Alert severity="info" sx={{ mb: 3 }}>
            There is no students in { selectedSemester.semester_text} semester now.
          </Alert>
        )}
      {attendeeSemester.length>0 && selectedSemester && !attendanceTaken && students.length>0 && (
        <>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Student Name</TableCell>
                <TableCell>Roll Number</TableCell>
                <TableCell>Attendance Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student._id}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.rollNumber}</TableCell>
                  <TableCell>
                    <Select
                      value={attendanceStatus[student._id]}
                      onChange={(e) => handleStatusChange(student._id, e.target.value)}
                    >
                      <MenuItem value="Present">Present</MenuItem>
                      <MenuItem value="Absent">Absent</MenuItem>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Button variant="contained" color="primary" onClick={submitAttendance} sx={{ mt: 3 }}>
            Submit Attendance
          </Button>
        </>
      )}

      
    </Container>
  );
};

export default AttendanceTeacher;
