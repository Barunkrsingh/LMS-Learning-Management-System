
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { registerSchema } from '../../../yupSchema/registerSchema';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import axios from "axios";
import MessageSnackbar from '../../../basic utility components/snacbar/MessageSnackbar';

export default function Register() {
    const [file, setFile] = React.useState(null)
    const [imageUrl, setImageUrl] = React.useState(null)
const addImage=(event)=>{
    const file = event.target.files[0];
    setImageUrl(URL.createObjectURL(file));
    setFile(file);
    };

    //Resetting Image
    const fileInputRef = React.useRef(null);
    const handleClearFile = ()=>{
        if(fileInputRef.current){
            fileInputRef.current.value='';
        }
        setFile(null);
        setImageUrl(null)
    }


    const initialValues = {
        department_name:"",
        email:"",
        owner_name:"",
        password:"",
        confirm_password:""
    };
    const Formik = useFormik({
        initialValues,
        validationSchema: registerSchema,
        onSubmit:(values)=>{
        console.log("Register submit values", values);
         if(file){
        const fd = new FormData();
        fd.append("image",file, file.name);
        fd.append("department_name", values.department_name);
        fd.append("email", values.email);
        fd.append("owner_name", values.owner_name);
        fd.append("password", values.password);
        
        axios.post(`http://localhost:5000/api/department/register`,fd).then(resp=>{
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
    }else{
        setMessage("Please Add Department Image")
        setMessageType('error')
    }
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
    <Typography variant="h2" sx={{textAlign:"center", fontSize:"40px"}}>Register</Typography>
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
        <Typography>Add Department Picture</Typography>
        <TextField
            type="file"
            inputRef={fileInputRef}
            onChange={(event)=>{addImage(event)}}
            />
            {imageUrl && <Box>
                <CardMedia component={'img'} height={'240px'} image={imageUrl}/>
                </Box>}


             <TextField
                name='department_name'
                label="Department Name"
                value={Formik.values.department_name}
                onChange={Formik.handleChange}
                onBlur={Formik.handleBlur}
            />
            {Formik.touched.department_name && Formik.errors.department_name && (
                <p style={{ color: "red", textTransform: "capitalize" }}>
                    {Formik.errors.department_name}
                </p>
                )}

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
                name='owner_name'
                label="Owner Name"
                value={Formik.values.owner_name}
                onChange={Formik.handleChange}
                onBlur={Formik.handleBlur}
            />
            {Formik.touched.owner_name && Formik.errors.owner_name && <p style={{ color: "red", textTransform: "capitalize" }} >
                {Formik.errors.owner_name}</p>}

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

            <TextField
            type='password'
                name='confirm_password'
                label="Confirm Password"
                value={Formik.values.confirm_password}
                onChange={Formik.handleChange}
                onBlur={Formik.handleBlur}
            />
            {Formik.touched.confirm_password && Formik.errors.confirm_password && <p style={{ color: "red", textTransform: "capitalize" }} >
                {Formik.errors.confirm_password}</p>}

            <Button type="submit" variant="contained">Submit</Button>

        </Box>
         </Box>
    );
}
