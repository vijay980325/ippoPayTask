import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Card, CardHeader, CardContent } from '@mui/material';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const strongPasswordChecker = (password) => {
  const n = password.length;
  let missingTypes = 3;
  if (/[a-z]/.test(password)) missingTypes--;
  if (/[A-Z]/.test(password)) missingTypes--;
  if (/\d/.test(password)) missingTypes--;

  let repeatCount = 0;
  for (let i = 2; i < n; i++) {
    if (password[i] === password[i - 1] && password[i] === password[i - 2]) {
      repeatCount++;
      i++;
    }
  }

  if (n < 6) {
    return Math.max(6 - n, missingTypes);
  } else if (n <= 20) {
    return Math.max(missingTypes, repeatCount);
  } else { 
    const deleteCount = n - 20;
    repeatCount -= Math.min(deleteCount, Math.floor(repeatCount / 3)) * 3;
    return deleteCount + Math.max(missingTypes, repeatCount);
  }
};

const SignupForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  
    if (name === 'password') {
      const passwordErrors = validatePassword(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: passwordErrors,
      }));
    }
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = validateForm();

    if (isValid) { 
      console.log('Form is valid, submit the data:', formData);
      let data = JSON.stringify({
        "email": formData.email,
        "password": formData.password
      });

      let config = {
        method: 'post', 
        url: 'http://localhost:4003/api/v1/user/signup',
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      };

      axios.request(config)
        .then((response) => {
          toast.success("Login Success");
          navigate('/home')
          console.log(JSON.stringify(response.data, "ddddddd"));
        })
        .catch((error) => {
          console.log("error", error);
          toast.error(error.response.data.result)
        });
    } else { 
      toast.error('Password is not strong enough', {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };

  const validateForm = () => {
    const emailErrors = validateEmail(formData.email);
    const passwordErrors = validatePassword(formData.password);

    setErrors({
      email: emailErrors,
      password: passwordErrors,
    });

    return !emailErrors && !passwordErrors;
  };

  const validateEmail = (email) => { 
    if (!email) {
      return 'Email is required';
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return 'Invalid email address';
    }
    return '';
  };

  const validatePassword = (password) => {
    if (!password) {
      return 'Password is required';
    }
    const strength = strongPasswordChecker(password);
    if (strength > 0) {
      return 'Password is not strong enough';
    }
    return '';
  };

  return (
    <Box sx={{ display: "grid", placeItems: "center", height: "100vh" }}>
      <Card>
        <CardHeader title="Sign Up" sx={{ textAlign: "center" }} />
        <CardContent >
          <Box component="form" onSubmit={handleSubmit} sx={{ position: "relative" }}>
            <TextField
              type="text"
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              error={!!errors.email}
              helperText={errors.email}
            />


            <TextField
              type="password"
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              error={!!errors.password}
              helperText={errors.password}
            />

            <Button type="submit" variant="contained" color="primary" fullWidth >
              Sign Up
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SignupForm;
