import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  Snackbar,
  Alert,
  InputAdornment,
  useMediaQuery,
} from "@mui/material";
import { useFormik } from "formik";
import { loginSchema } from "../../../yupSchema/loginSchema";
import axios from "axios";
import { baseUrl } from "../../../environment";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { Email, Lock } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import "./Login.css";

export default function Login() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { login } = useContext(AuthContext);
  const [loginType, setLoginType] = useState("student");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("success");
  const [isLoading, setIsLoading] = useState(false);
  const [backgroundIndex, setBackgroundIndex] = useState(0);

  const backgrounds = [
    "url('https://img95.lovepik.com/photo/40107/6184.gif_wh860.gif')",
    "url('https://bcetdgp.ac.in/wp-content/uploads/2024/02/1.jpg')",
    "url('https://bcetdgp.ac.in/wp-content/uploads/2024/02/IMG_20230121_152924-scaled-1.jpg')",
  ];

  const navigate = useNavigate();

  const handleSnackbarClose = (_, reason) => {
    if (reason === "clickaway") return;
    setSnackbarOpen(false);
    setSnackbarMessage("");
  };

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      
      setIsLoading(true);
      const trimmedValues = {
        email: values.email.trim(),
        password: values.password.trim(),
      };

      let url = `${baseUrl}/${loginType}/login`;
      let navUrl = `/${loginType}`;

      try {
        const resp = await axios.post(url, trimmedValues);
        const token = resp.headers["authorization"];
        const { success, message, user } = resp.data;

        setSnackbarMessage(message);
        setSnackbarType(success ? "success" : "error");
        setSnackbarOpen(true);

        if (success) {
          localStorage.setItem("token", token || "");
          localStorage.setItem("user", JSON.stringify(user));
          login(user);
          navigate(navUrl);
        }
      } catch (error) {
        const errMsg = error.response?.data?.message || "Login failed";
        setSnackbarMessage(errMsg);
        setSnackbarType("error");
        setSnackbarOpen(true);
      } finally {
        setIsLoading(false);
      }

      formik.resetForm();
    },
  });

  const handleSelection = (e) => {
    setLoginType(e.target.value);
    formik.setValues({ email: "", password: "" });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
    }, 5000); // Change background every 5 seconds

    return () => clearInterval(interval);
  }, [backgrounds.length]);

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        p: 2,
      }}
    >
      {/* Background Images with Fade Effect */}
      {backgrounds.map((bg, index) => (
        <Box
          key={index}
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: bg,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: backgroundIndex === index ? 1 : 0,
            transition: "opacity 1s ease-in-out",
            zIndex: backgroundIndex === index ? 1 : 0,
          }}
        />
      ))}

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
          maxWidth: isMobile ? "400px" : "450px",
          p: isMobile ? 3 : 4,
          borderRadius: 3,
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
          position: "relative",
          zIndex: 2, // Ensure the form is above the background images
        }}
        elevation={isMobile ? 2 : 6}
      >
        <Typography
          variant={isMobile ? "h5" : "h4"}
          align="center"
          gutterBottom
          sx={{ 
            fontWeight: 700,
            mb: 3,
            background: "linear-gradient(to right, #ff7043, #f4511e)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Welcome Back
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <FormControl fullWidth sx={{ mb: 2 }}>
  <InputLabel id="user-type-label">User Type</InputLabel>
  <Select
    labelId="user-type-label"
    value={loginType}
    onChange={handleSelection}
    label="User Type"
    size={isMobile ? "small" : "medium"}
  >
    <MenuItem value="student">Student</MenuItem>
    <MenuItem value="teacher">Teacher</MenuItem>
    <MenuItem value="department">Department Owner</MenuItem> {/* ✅ Fixed value */}
  </Select>
</FormControl>
          

          <TextField
            fullWidth
            size={isMobile ? "small" : "medium"}
            label="Email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            sx={{ mb: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email fontSize={isMobile ? "small" : "medium"} />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            size={isMobile ? "small" : "medium"}
            label="Password"
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            sx={{ mb: 3 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock fontSize={isMobile ? "small" : "medium"} />
                </InputAdornment>
              ),
            }}
          />

          <Button
            fullWidth
            variant="contained"
            type="submit"
            disabled={isLoading}
            sx={{
              height: isMobile ? "48px" : "56px",
              fontWeight: "bold",
              fontSize: isMobile ? "0.875rem" : "1rem",
              background: "linear-gradient(to right, #ff7043, #f4511e)",
              "&:hover": {
                background: "linear-gradient(to right, #f4511e, #e64a19)",
              },
            }}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
