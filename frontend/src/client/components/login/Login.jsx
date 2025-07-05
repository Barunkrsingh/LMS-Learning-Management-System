
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import { Button, CardMedia, Typography } from "@mui/material";
import axios from "axios";
import MessageSnackbar from "../../../basic utility components/snacbar/MessageSnackbar";
import { loginSchema } from "../../../yupSchema/loginSchema";

export default function Login() {    
    const initialValues = {
        email:"",
        password:""
    };
    const Formik = useFormik({
        initialValues,
        validationSchema: loginSchema,
        onSubmit:(values)=>{
        
        axios.post(`http://localhost:5000/api/department/login`,{...values}).then(resp=>{
            console.log(resp)
            setMessage(resp.data.message)
            setMessageType('success')
            Formik.resetForm();
            handleClearFile()
        }).catch(e=>{
            setMessage(e.response.data.message)
            setMessageType('error')
            console.log("Error", e)
        })
   
        },
    });

    const [message, setMessage]= React.useState('');
    const [messageType, setMessageType] = React.useState('success');
    const handleMessageClose = ()=>{
        setMessage('')
    }
    return (<Box component={'div'} sx={{background:"url(https://media.istockphoto.com/id/1603977255/vector/white-background-abstract-neutral-texture-subtle-geometric-wallpaper-futuristic-clean-lines.jpg?b=1&s=612x612&w=0&k=20&c=LewmiVE9yw3i8Wyi3oVXxfrMIWcVZn8fJyl_h5pBdjc=)",
        backgroundSize:"cover",
        backgroundRepeat:"no-repeat",
        height:"100%",
        paddingTop:"5px",
        paddingBottom:"0px"
    }}>
    {message && 
    <MessageSnackbar message={message} type={messageType} handleClose={handleMessageClose}/>}
    <Typography variant="h2" sx={{textAlign:"center", fontSize:"40px"}}>Login</Typography>
        <Box
            component="form"
            sx={{
            "& > :not(style)": { m: 1 },
            display:"flex",
            flexDirection:"column",
            width:"40vw",
            minWidth:"100px",
            margin:"Auto",
           

            }}
            noValidate
            autoComplete="off"
            onSubmit={Formik.handleSubmit}
        >
        
            <TextField
                name='email'
                label="Email"
                value={Formik.values.email}
                onChange={Formik.handleChange}
                onBlur={Formik.handleBlur}
            />
            {Formik.touched.email && Formik.errors.email && <p style={{ color: "red", textTransform: "capitalize" }} >
                {Formik.errors.email}</p>}

          
            <TextField
            type="password"
                name='password'
                label="Password"
                value={Formik.values.password}
                onChange={Formik.handleChange}
                onBlur={Formik.handleBlur}
            />
            {Formik.touched.password && Formik.errors.password && <p style={{ color: "red", textTransform: "capitalize" }} >
                {Formik.errors.password}</p>}

          
            <Button type="submit" variant="contained">Submit</Button>

        </Box>
         </Box>
    );
}
