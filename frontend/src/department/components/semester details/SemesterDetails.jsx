import {
  Box,
  Button,
  CardMedia,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

// ICONS
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MapIcon from "@mui/icons-material/Map";
import FaceRetouchingNaturalIcon from "@mui/icons-material/FaceRetouchingNatural";
import VisibilityIcon from "@mui/icons-material/Visibility";
import HeightIcon from "@mui/icons-material/Height";
import MonitorWeightIcon from "@mui/icons-material/MonitorWeight";
import Person4Icon from "@mui/icons-material/Person4";
import Filter2Icon from "@mui/icons-material/Filter2";

import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { userEditSchema } from "../../../yupSchema/userEditSchema";
import axios from "axios";
import { baseUrl } from "../../../environment";
import CustomizedSnackbars from "../../../basic utility components/CustomizedSnackbars";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useNavigate } from "react-router-dom";
import { examSchema } from "../../../yupSchema/examinationSchema";
import SubjectTeacher from "./sub components/subject teacher/SubjectTeacher";
import Examinations from "./sub components/examinations/Examinations";
import Attendence from "./sub components/attendence/Attendence";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "transparent",
  color: "#fff",
  boxShadow: "none",
  textTransform: "uppercase",
}));

export default function SemesterDetails() {
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  const resetMessage = () => {
    setMessage("");
  };
  
  const [allSemesters, setAllSemesters] = useState([]);
  const [semesterDetails, setSemesterDetails] = useState(null);


  

const handleMessage=(type, message)=>{
  console.log("Called")
setType(type);
setMessage(message)
}


 




  const handleSemesterChange = (e) => {
    const value = e.target.value;
    navigate(`/department/semester-details?semester-id=${value}`);
    setMessage("Semester Changed.");
    setType("success");
  };

  const navigate = useNavigate();
  const getSemesterId = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const paramIdValue = urlParams.get("semester-id");
    return paramIdValue;
  };

  const fetchSemesterWithId = () => {
    const id = getSemesterId();
    if (id) {
      axios
        .get(`${baseUrl}/semester/fetch-single/${id}`)
        .then((resp) => {
          console.log("Single semester", resp);
          setSemesterDetails(resp.data.data);
        })
        .catch((e) => {
          navigate("/department/semester");
          console.log("Error in fetching.");
        });
    } else {
      navigate("/department/semester");
    }
  };

  const fetchAllSemesters = () => {
    axios
      .get(`${baseUrl}/semester/fetch-all`, { params: {} })
      .then((resp) => {
        console.log("ALL semesters", resp);
        setAllSemesters(resp.data.data);
      })
      .catch((e) => {
        console.log("Error in fetching  all  Semesters");
      });
  };



  // SUBJECTS
  const [allSubjects, setAllSubjects] = useState([]);
  const fetchAllSubjects = () => {
    axios
      .get(`${baseUrl}/subject/fetch-all`, { params: {} })
      .then((resp) => {
        console.log("ALL subjects", resp);
        setAllSubjects(resp.data.data);
      })
      .catch((e) => {
        console.log("Error in fetching  all  Semesters");
      });
  };

    // Teachers
    const [allTeachers, setAllTeachers] = useState([]);
    const fetchAllTeachers = () => {
      axios
        .get(`${baseUrl}/teacher/fetch-with-query`, { params: {} })
        .then((resp) => {
          console.log("ALL subjects", resp);
          setAllTeachers(resp.data.data);
        })
        .catch((e) => {
          console.log("Error in fetching  all  Semesters");
        });
    };
  
    const [examinations, setExaminations] = useState([]);
    const fetchExaminations = () => {
      axios
        .get(`${baseUrl}/examination/fetch-semester/${getSemesterId()}`)
        .then((resp) => {
          console.log("ALL Examination", resp);
          setExaminations(resp.data.data);
        })
        .catch((e) => {
          console.log("Error in fetching  Examinstions.");
        });
    };



    const [students,setStudents] = useState([])
    const fetchStudents = () => {
      axios
        .get(`${baseUrl}/student/fetch-with-query`, { params: {student_semester: getSemesterId()} })
        .then((resp) => {
          console.log("Fetching students data.", resp);
          setStudents(resp.data.data);
        })
        .catch((e) => {
          console.log("Error in fetching casting calls admin data", e);
        });
    };

  useEffect(() => {
    fetchAllSemesters();
    fetchSemesterWithId();
    fetchAllSubjects();
    fetchAllTeachers();
    fetchExaminations();
    fetchStudents()
  }, [message]);
  return (
    <>
      <>
        {message && (
          <CustomizedSnackbars
            reset={resetMessage}
            type={type}
            message={message}
          />
        )}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "black",
          }}
          component={"div"}
        >
          <Typography semesterName="text-beautify hero-text">
            {semesterDetails && <>{semesterDetails.semester_num}</>}th Semester Details
          </Typography>
        </Box>
        <Grid container spacing={0} sx={{ background: "black" }}>
          <Grid size={{ sm: 6, md: 4, xs: 12 }}>
            <Item>
              <Paper sx={{ margin: "10px", padding: "10px" }}>
                <FormControl sx={{ minWidth: "220px", marginTop: "10px" }}>
                  <InputLabel id="demo-simple-select-label">
                    Change Semester
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Gender"
                    value={""}
                    onChange={handleSemesterChange}
                  >

                    {allSemesters &&
                      allSemesters.map((value, i) => {
                        return (
                          <MenuItem key={i} value={value._id}>
                            {value.semester_text}
                          </MenuItem>
                        );
                      })}
                  </Select>
                </FormControl>
              </Paper>

              <Paper sx={{ padding: "20px", margin: "10px" }}>
                <Typography variant="h5" semesterName="text-beautify">
                  Students {semesterDetails && <>{semesterDetails.semester_num}</>}th{" "}
                </Typography>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 230 }} aria-label="simple table">
                    <TableBody>
                      <TableRow>
                        <TableCell
                          sx={{
                            fontWeight: "700",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            fontSize: "34px",
                          }}
                          component="th"
                          scope="row"
                        >
                          Total
                        </TableCell>
                        <TableCell align="left" sx={{ fontSize: "34px" }}>
                          {students.length}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>

             </Item>
          </Grid>
          <Grid size={{ sm: 6, md: 8, xs: 12 }}>
            <Item>
              {/* SubjectTeacher */}
             {/* <SubjectTeacher semesterId={getSemesterId()} allSubjects={allSubjects} asignSubTeach={semesterDetails && SemesterDetails.asignSubTeach} allTeachers={allTeachers} handleMessage={handleMessage}/> */}
             <Examinations allSubjects={allSubjects} handleMessage={handleMessage} examinations={examinations} />             
            </Item>
          </Grid>
        </Grid>
      </>
    </>
  );
}
