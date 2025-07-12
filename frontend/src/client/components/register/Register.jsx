import {
  Box,
  Button,
  CardMedia,
  Paper,
  TextField,
  Typography,
  Snackbar,
  Alert,
  InputAdornment,
} from "@mui/material";
import { useFormik } from "formik";
import { registerSchema } from "../../../yupSchema/registerSchema";
import { useState } from "react";
import axios from "axios";
import { baseUrl } from "../../../environment";
import { PhotoCamera, Email, Person, Lock } from "@mui/icons-material";
import "./Register.css";

export default function Register() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("success");
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const handleImageUpload = (event) => {
    const selectedFile = event.target.files[0];
    setImageUrl(URL.createObjectURL(selectedFile));
    setFile(selectedFile);
  };

  const handleSnackbarClose = (_, reason) => {
    if (reason === "clickaway") return;
    setSnackbarOpen(false);
    setSnackbarMessage("");
  };

  const formik = useFormik({
    initialValues: {
      department_name: "",
      email: "",
      owner_name: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      if (!file) {
        setSnackbarMessage("Please provide an image.");
        setSnackbarType("error");
        setSnackbarOpen(true);
        return;
      }

      try {
        const formData = new FormData();
        formData.append("image", file, file.name);
        formData.append("department_name", values.department_name);
        formData.append("email", values.email);
        formData.append("owner_name", values.owner_name);
        formData.append("password", values.password);

        const response = await axios.post(`${baseUrl}/department/register`, formData);
        setSnackbarMessage(response.data.message);
        setSnackbarType("success");
        setSnackbarOpen(true);
        formik.resetForm();
        setFile(null);
        setImageUrl(null);
      } catch (error) {
        setSnackbarMessage(error.response?.data?.message || "Registration failed");
        setSnackbarType("error");
        setSnackbarOpen(true);
      }
    },
  });

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
        backgroundImage: `url("https://bcetdgp.ac.in/wp-content/uploads/2024/02/IMG_20230121_152924-scaled-1.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat"
      }}
    >
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarType}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Paper
        sx={{
          width: "100%",
          maxWidth: "450px",
          p: 3,
          borderRadius: 3,
          boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.1)",
          
        }}
      >
        <Typography 
          variant="h4" 
          align="center" 
          gutterBottom 
          sx={{ 
            fontWeight: 600, 
            mb: 3,
            background: "linear-gradient(to right, #ff7043, #f4511e)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          Register Department
        </Typography>

        <Box 
          component="form" 
          onSubmit={formik.handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2
          }}
        >
          <Box>
            <Typography variant="body1" sx={{ mb: 1 }}>Department Image</Typography>
            <Button
              variant="outlined"
              component="label"
              fullWidth
              startIcon={<PhotoCamera />}
              sx={{
                mb: 1,
                py: 1.5,
                borderStyle: "dashed",
                                "&:hover": {
                  borderColor: "primary.main"
                }
              }}
            >
              Upload Image
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageUpload}
              />
            </Button>
            {imageUrl && (
              <CardMedia
                component="img"
                image={imageUrl}
                alt="Department Preview"
                sx={{ 
                  borderRadius: 2,
                  maxHeight: "150px",
                  objectFit: "contain",
                  border: "1px solid rgba(0, 0, 0, 0.1)"
                }}
              />
            )}
          </Box>

          <TextField
            fullWidth
            size="small"
            label="Department Name"
            name="department_name"
            value={formik.values.department_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.department_name && Boolean(formik.errors.department_name)}
            helperText={formik.touched.department_name && formik.errors.department_name}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person fontSize="small" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            size="small"
            label="Email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email fontSize="small" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            size="small"
            label="Owner Name"
            name="owner_name"
            value={formik.values.owner_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.owner_name && Boolean(formik.errors.owner_name)}
            helperText={formik.touched.owner_name && formik.errors.owner_name}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person fontSize="small" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            size="small"
            label="Password"
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock fontSize="small" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            size="small"
            label="Confirm Password"
            type="password"
            name="confirm_password"
            value={formik.values.confirm_password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.confirm_password && Boolean(formik.errors.confirm_password)}
            helperText={formik.touched.confirm_password && formik.errors.confirm_password}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock fontSize="small" />
                </InputAdornment>
              ),
            }}
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            size="large"
            sx={{
              mt: 1,
              py: 1.5,
              fontWeight: "bold",
              background: "linear-gradient(to right, #ff7043, #f4511e)",
              "&:hover": {
                background: "linear-gradient(to right, #f4511e, #e64a19)",
              },
            }}
          >
            Register Now
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
