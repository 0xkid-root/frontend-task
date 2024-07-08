import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Avatar,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import '../index.css';
import {loginUser} from "../utils/api"

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear errors on change
  };

  const validate = () => {
    let tempErrors = { email: "", password: "" };
    let isValid = true;

    if (!formData.email) {
      tempErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email is not valid";
      isValid = false;
    }

    if (!formData.password) {
      tempErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters long";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      try {
        const response = await loginUser(formData);
        console.log("response is here:", response);

        // Display success toast
        toast.success("User logged in successfully!");

        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } catch (error) {
  
        // Display error toast
        toast.error(error?.response?.data?.error);
      }
    } 
    
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#000", // Light Blue Background
        minHeight: "100vh",
        justifyContent: "center", // Center the login box vertically
      }}
    >
      <ToastContainer />
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#1C2C4E", // Dark Blue Box
          width: "70%", // Full width on larger screens
          borderRadius: "2px",
        }}
      >
        <Typography
          variant="h4"
          sx={{ color: "#01F4E1", marginBottom: 5, textAlign: "center" }}
        >
          SIGN IN
        </Typography>
        <Avatar
          sx={{
            bgcolor: "#4C5874",
            marginBottom: 2,
            width: 100, // Adjust the width as needed
            height: 100, // Adjust the height as needed
          }}
        >
          <AccountCircleIcon sx={{ color: "#1C2C4E", width: 80, height: 80 }} />
        </Avatar>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <TextField
            placeholder="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            error={!!errors.email}
            helperText={errors.email}
            sx={{ background: "#FFFFFF" }}
            InputProps={{
              startAdornment: (
                <Avatar sx={{ bgcolor: "#4C5874", marginRight: 1 }}>
                  <AccountCircleIcon sx={{ color: "#001F3F" }} />
                </Avatar>
              ),
            }}
          />
          <TextField
            placeholder="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            error={!!errors.password}
            helperText={errors.password}
            sx={{ background: "#FFFFFF" }}
            InputProps={{
              startAdornment: (
                <Avatar sx={{ bgcolor: "#4C5874", marginRight: 1 }}>
                  <LockIcon sx={{ color: "#001F3F" }} />
                </Avatar>
              ),
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2, bgcolor: "#01F4E1" }}
          >
            Login
          </Button>
        </form>
        

      </Paper>
    </Container>
  );
};

export default Login;
