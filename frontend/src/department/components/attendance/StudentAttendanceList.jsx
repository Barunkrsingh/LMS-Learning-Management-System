import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../../environment";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2"; // Import Grid2
import { styled } from '@mui/material/styles';

import { Link } from "react-router-dom";
import CustomizedSnackbars from "../../../basic utility components/CustomizedSnackbars";
import Attendee from "./attendee/Attendee";


const Item = styled(Paper)(({ theme }) => ({
   
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    // ...theme.applyStyles('dark', {
    //   backgroundColor: '#1A2027',
    // }),
  }));


const StudentAttendanceList = () => {
  const [students, setStudents] = useState([]);
  const [attendanceData, setAttendanceData] = useState({});
  const [loading, setLoading] = useState(true);
  const [studentSemester, setStudentSemester] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [params, setParams] = useState({});
  const [message, setMessage] = useState("");
  const [type, setType] = useState("success");

  const handleMessage = (type, message) => {
    setType(type);
    setMessage(message);
  };

  const resetMessage = () => {
    setMessage("");
  };

  const fetchStudentSemester = () => {
    axios
      .get(`${baseUrl}/semester/fetch-all`)
      .then((resp) => {
        setStudentSemester(resp.data.data);
      })
      .catch((e) => {
        console.log("Error in fetching student Semester", e);
      });
  };

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/student/fetch-with-query`,
          { params: params }
        );
        const studentsList = response.data.data;
        setStudents(studentsList);
        fetchAttendanceForStudents(studentsList);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
    fetchStudentSemester();
  }, [params, message]);

  const fetchAttendanceForStudents = async (studentsList) => {
    const attendancePromises = studentsList.map((student) =>
      fetchAttendanceForStudent(student._id)
    );
    const results = await Promise.all(attendancePromises);
    const updatedAttendanceData = {};
    results.forEach(({ studentId, attendancePercentage }) => {
      updatedAttendanceData[studentId] = attendancePercentage;
    });
    setAttendanceData(updatedAttendanceData);
    setLoading(false);
  };

  const fetchAttendanceForStudent = async (studentId) => {
    try {
      const response = await axios.get(`${baseUrl}/attendance/${studentId}`);
      const attendanceRecords = response.data;
      const totalSemesters = attendanceRecords.length;
      const presentCount = attendanceRecords.filter(
        (record) => record.status === "Present"
      ).length;
      const attendancePercentage =
        totalSemesters > 0 ? (presentCount / totalSemesters) * 100 : 0;

      return { studentId, attendancePercentage };
    } catch (error) {
      console.error(`Error fetching attendance for student ${studentId}:`, error);
      return { studentId, attendancePercentage: 0 };
    }
  };

  const handleSemester = (e) => {
    let newParam;
    if (e.target.value !== "") {
      setSelectedSemester(e.target.value);
      newParam = { ...params, student_semester: e.target.value };
    } else {
      newParam = { ...params };
      delete newParam["student_semester"];
    }
    setParams(newParam);
  };

  const handleSearch = (e) => {
    let newParam;
    if (e.target.value !== "") {
      newParam = { ...params, search: e.target.value };
    } else {
      newParam = { ...params };
      delete newParam["search"];
    }
    setParams(newParam);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {message && (
        <CustomizedSnackbars
          reset={resetMessage}
          type={type}
          message={message}
        />
      )}
      <Box sx={{  padding: "40px 10px 20px 10px",width:"100%"}}>
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Typography variant="h2" >Attendance</Typography>
        </Box>

        {/* Grid layout using Grid2 */}
        <Grid container spacing={2}>
          {/* Left Box: Search and Attendee */}
          <Grid size={{xs:12, md:4}}>
            <Item>
            <Box sx={{ padding: "10px" }}>
              <FormControl sx={{ minWidth: "200px", marginBottom: "20px" }}>
                <InputLabel id="semester-select-label">Student Semester</InputLabel>
                <Select
                  labelId="semester-select-label"
                  id="semester-select"
                  value={selectedSemester || ""}
                  onChange={handleSemester}
                >
                  <MenuItem value="">Select Semester</MenuItem>
                  {studentSemester.map((value, i) => (
                    <MenuItem key={i} value={value._id}>
                      {value.semester_text}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                label="Search Name"
                onChange={handleSearch}
                fullWidth
              />

              {selectedSemester && <Attendee params={params} semesterId={selectedSemester} handleMessage={handleMessage} />}
            </Box>
            </Item>
          </Grid>

          {/* Right Box: Table */}
          <Grid size={{xs:12, md:8}}>
            <Item sx={{width:"100%"}}>
            <TableContainer sx={{width:'100%'}} component={Paper}>
              <Table sx={{  }} aria-label="student attendance table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Gender</TableCell>
                    <TableCell align="right">Guardian Phone</TableCell>
                    <TableCell align="right">Semester</TableCell>
                    <TableCell align="right">Percentage</TableCell>
                    <TableCell align="right">View</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {students.map((student, i) => (
                    <TableRow key={i}>
                      <TableCell>{student.name}</TableCell>
                      <TableCell align="right">{student.gender}</TableCell>
                      <TableCell align="right">{student.guardian_phone}</TableCell>
                      <TableCell align="right">{student.student_semester.semester_text}</TableCell>
                      <TableCell align="right">
                        {attendanceData[student._id] !== undefined
                          ? `${attendanceData[student._id].toFixed(2)}%`
                          : "No Data"}
                      </TableCell>
                      <TableCell align="right">
                        <Link to={`/department/attendance-student/${student._id}`}>
                          Details
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default StudentAttendanceList;
