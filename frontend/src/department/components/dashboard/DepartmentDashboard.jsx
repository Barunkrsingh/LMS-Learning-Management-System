import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, Paper, CardMedia, IconButton, TextField, Button } from "@mui/material";
import Grid2 from "@mui/material/Grid2"; // Importing Grid2
import axios from "axios";
import { Bar } from "react-chartjs-2";
import PreviewIcon from '@mui/icons-material/Preview';

// ChartJS setup
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { baseUrl } from "../../../environment";
import styled from "@emotion/styled";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from '@mui/icons-material/Visibility';

import CustomizedSnackbars from "../../../basic utility components/CustomizedSnackbars";
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  minWidth: "400px",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

const DepartmentDashboard = () => {
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalTeachers, setTotalTeachers] = useState(0);
  const [semesters, setSemesters] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [departmentDetails, setDepartmentDetails] = useState(null);
  const [departmentName, setDepartmentName] = useState('');
  const [schooImage, setDepartmentImage] = useState('');
  const [departmentEdit, setDepartmentEdit] = useState(false);
  const [preview, setPreview] = useState(false);

  const [message, setMessage] = useState("");
  const [type, setType] = useState("success");
  const resetMessage = () => setMessage("");

  // Dummy Data
  const dummyData = {
    totalStudents: 120,
    totalTeachers: 15,
    semesters: [
      { _id: "1", semester_text: "Semester 1" },
      { _id: "2", semester_text: "Semester 2" },
      { _id: "3", semester_text: "Semester 3" },
      { _id: "4", semester_text: "Semester 4" },
    ],
    subjects: [
      { _id: "1", subject_name: "Mathematics" },
      { _id: "2", subject_name: "Science" },
      { _id: "3", subject_name: "History" },
      { _id: "4", subject_name: "Geography" },
    ],
  };

  // Fetch data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentRes = await axios.get(
          `${baseUrl}/student/fetch-with-query`,{params:{}}
        );
        const teacherRes = await axios.get(
          `${baseUrl}/teacher/fetch-with-query`,{params:{}}
        );
        const semestersRes = await axios.get(`${baseUrl}/semester/fetch-all`);
        const subjectsRes = await axios.get(`${baseUrl}/subject/fetch-all`);
        const departmentData = await axios.get(`${baseUrl}/department/fetch-single`);

        console.log(studentRes, teacherRes)
        setDepartmentDetails(departmentData.data.data);
        setDepartmentName(departmentData.data.data.department_name);
        setDepartmentImage(departmentData.data.data.department_image)
        setTotalStudents(
          studentRes.data.data.length
        );
        setTotalTeachers(
          teacherRes.data.data.length
        );
        setSemesters(semestersRes.data.data || dummyData.semesters);
        setSubjects(subjectsRes.data.data || dummyData.subjects);
      } catch (error) {
        setTotalStudents(dummyData.totalStudents);
        setTotalTeachers(dummyData.totalTeachers);
        setSemesters(dummyData.semesters);
        setSubjects(dummyData.subjects);
      }
    };

    fetchData();
  }, [message]);

  // Data for Semesters and Subjects Chart
  const semestersData = {
    labels: semesters.map((semesterObj) => semesterObj.semester_text),
    datasets: [
      {
        label: "Semesters",
        data: semesters.map(() => 1),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const subjectsData = {
    labels: subjects.map((subject) => subject.subject_name),
    datasets: [
      {
        label: "Subjects",
        data: subjects.map(() => 1),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const handleDepartmentEdit = ()=>{
    setDepartmentEdit(true)
    setImageUrl(null)
  }


  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null); // Independent state for image preview

  // Handle image file selection
  const addImage = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setImageUrl(URL.createObjectURL(selectedFile));
    }
  };


  const fileInputRef = useRef(null);
  const handleClearFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Clear the file input
    }
    setFile(null); // Reset the file state
    // setImageUrl(null); // Clear the image preview
  };

const handleSubmit = (e)=>{
    e.preventDefault();
    const fd = new FormData();
    fd.append("department_name", departmentName)
    if (file) {
      fd.append("image", file, file.name);
    }

    axios
      .patch(`${baseUrl}/department/update`, fd)
      .then((resp) => {
        setMessage(resp.data.message);
        setType("success");
        handleClearFile();
        setDepartmentEdit(false)
        console.log("Response", resp)
      })
      .catch((e) => {
        setMessage(e.response.data.message);
        setType("error");
      });
  
}
  return (
    <Box sx={{ p: 3 }}>
       {message && (
        <CustomizedSnackbars
          reset={resetMessage}
          type={type}
          message={message}
        />
      )}
      {departmentEdit && 
      <Paper sx={{maxWidth:'780px', margin:"auto",padding:"10px", marginTop:"120px"}} >
       <Box
       component="form"
       noValidate
       autoComplete="off" >
       <Box
         sx={{
          display:'flex',
          flexDirection:'column'
         }}
       >
         <Typography sx={{ marginRight: "50px" }} variant="h4"> Department Pic </Typography>

         <TextField
           name="file"
           type="file"
           onChange={addImage}
           inputRef={fileInputRef}
         />
         {imageUrl &&  
             <CardMedia
               component="img"
               sx={{marginTop:'10px'}}
               image={imageUrl}
               height="440px"
             /> 
         }
       </Box>
        <TextField
         fullWidth
         sx={{ marginTop: "10px" }}
         value={departmentName}
         id="filled-basic"
         label="Department Name "
         variant="outlined"
         onChange={e=>{setDepartmentName(e.target.value)}}
       />
       <Box>
       <Button
           onClick={handleSubmit} 
           variant="outlined" 
           sx={{ marginTop: "10px",marginRight:'5px' }} >
          Submit
         </Button>

         <Button
           onClick={()=>{setDepartmentEdit(false)}}
           variant="outlined"
           sx={{ marginTop: "10px" }}
         >
          Cancel
         </Button>
       </Box>
       

       </Box>

      </Paper>

      }
    
             <Typography variant="h4" gutterBottom>
               Dashboard {departmentDetails && `[ ${departmentDetails.department_name} ]`}
             </Typography>

           {preview &&  
            <Box sx={{position:"fixed", top:'0',left:'0', zIndex:'9999',height:'100vh',
              width:"100%",background:'black',padding:'10px'}}>
                <Box sx={{height:"100%", width:"100%"}}>
              <CardMedia
               component="img"
               image={`/images/uploaded/department/${schooImage}`}
               height="100%"
             /> 
             <Button onClick={()=>{setPreview(false)}} sx={{color:'#fff',background:'tomato',position:'absolute', right:'10px', top:"47%"}}> X</Button>
             </Box>
             </Box>
           }

      {departmentDetails && (
        <Box
          sx={{
            position:'relative',
            height: "500px",
            width: "auto",
            background: `url(/images/uploaded/department/${departmentDetails.department_image})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h2">{departmentDetails.department_name}</Typography>
          <Box sx={{position:'absolute', bottom:'10px',right:'10px'}} >
            <Button onClick={()=>{setPreview(true)}}>
              <PreviewIcon sx={{color:"#fff", fontSize:'40px'}}/>
            </Button>
          
          <IconButton sx={{background:'white'}} onClick={handleDepartmentEdit} color="primary">
            <EditIcon />
          </IconButton>
          </Box>
        </Box>
      )}



      <Grid2 container spacing={3}>
        {/* Total Students */}
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Item>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6">Total Students</Typography>
              <Typography variant="h4">{totalStudents}</Typography>
            </Paper>
          </Item>
        </Grid2>

        {/* Total Teachers */}
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Item>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6">Total Teachers</Typography>
              <Typography variant="h4">{totalTeachers}</Typography>
            </Paper>
          </Item>
        </Grid2>

        {/* Semesters Chart */}
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Item>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6">Semesters Overview</Typography>
              <Bar data={semestersData} options={{ responsive: true }} />
            </Paper>
          </Item>
        </Grid2>

        {/* Subjects Chart */}
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Item>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6">Subjects Overview</Typography>
              <Bar data={subjectsData} options={{ responsive: true }} />
            </Paper>
          </Item>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default DepartmentDashboard;
