import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid2";
import {
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Autocomplete,
  InputAdornment,
  Card,
  Box,
  Typography,
  Checkbox,
  IconButton,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
const validationSchema = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email format"
    )
    .required("Email is required"),
  dateOfBirth: Yup.date()
    .required("Date of Birth is required")
    .typeError("Invalid date"),
  mobileNumber: Yup.string()
    .matches(/^[0-9]{10}$/, "Must be a valid 10-digit number")
    .required("Mobile Number is required"),
  emergencyContact: Yup.string().matches(
    /^[0-9]{10}$/,
    "Must be a valid 10-digit number"
  ),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      "Password must have at least 1 uppercase, 1 lowercase, 1 number, 1 symbol, and 6+ characters"
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  gender: Yup.string().required("Gender is required"),
  bloodGroup: Yup.string(),
  newsletter: Yup.boolean().required("Newsletter subscription is required"),
  uploadedFile: Yup.mixed().required("File upload is required"),
});

// Blood Group options
const bloodGroupOptions = [
  { label: "A+", value: "A+" },
  { label: "A-", value: "A-" },
  { label: "B+", value: "B+" },
  { label: "B-", value: "B-" },
  { label: "AB+", value: "AB+" },
  { label: "AB-", value: "AB-" },
  { label: "O+", value: "O+" },
  { label: "O-", value: "O-" },
];

const FormikValidation = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    mobileNumber: "",
    emergencyContact: "",
    password: "",
    confirmPassword: "",
    gender: "",
    bloodGroup: "",
    newsletter: false,
    uploadedFile: null,
  };

  // Handle form submission
  const onSubmit = (values) => {
    alert("Registration Successful!");
    console.log("Form Submitted:", values);
  };

  // Handle mobile number input
  const handleNumberInput = (e, setFieldValue, fieldName) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
    setFieldValue(fieldName, value);
  };

   // Fullscreen toggle logic
   const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };
  // Disable Escape key globally
  useEffect(() => {
    const handleKeydown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        console.log("Escape key is disabled.");
      }
    };

    // Attach the event listener
    document.addEventListener("keydown", handleKeydown);

    // Cleanup the event listener on unmount
    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", padding: 3, }}>
      <Card elevation={3} sx={{ textAlign: "center", padding: 2, borderRadius: 3 }}>
      <Grid container justifyContent="flex-end">
          <KeyboardBackspaceIcon style={{ cursor: "pointer", marginRight: 30, marginTop:8 }} />
          <IconButton onClick={handleFullscreen}>
            {isFullscreen ? (
              <FullscreenExitIcon style={{ color: "black" }} />
            ) : (
              <FullscreenIcon style={{ color: "black" }} />
            )}
          </IconButton>
        </Grid>
        <Typography sx={{ fontSize: 20, marginTop: 1 }}>
          <b>Register</b>
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ errors, touched, setFieldValue, values }) => (
            <Form>
              <Grid container spacing={2}>
                {/* First Name */}
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Field
                    as={TextField}
                    label="First Name"
                    name="firstName"
                    fullWidth
                    size="small"
                    margin="normal"
                    error={errors.firstName && touched.firstName}
                    helperText={<ErrorMessage name="firstName" />}
                  />
                </Grid>
                {/* Last Name */}
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Field
                    as={TextField}
                    label="Last Name"
                    name="lastName"
                    fullWidth
                    size="small"
                    margin="normal"
                    error={errors.lastName && touched.lastName}
                    helperText={<ErrorMessage name="lastName" />}
                  />
                </Grid>
                {/* Email */}
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Field
                    as={TextField}
                    label="Email Address"
                    name="email"
                    fullWidth
                    size="small"
                    margin="normal"
                    error={errors.email && touched.email}
                    helperText={<ErrorMessage name="email" />}
                  />
                </Grid>
                {/* Date of Birth */}
                <Grid size={{xs: 12, sm: 6 }}>
                  <Field
                    as={TextField}
                    label="Date of Birth"
                    name="dateOfBirth"
                    type="date"
                    fullWidth
                    size="small"
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                    error={errors.dateOfBirth && touched.dateOfBirth}
                    helperText={<ErrorMessage name="dateOfBirth" />}
                  />
                </Grid>
                {/* Mobile number */}
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="Mobile Number"
                    name="mobileNumber"
                    fullWidth
                    size="small"
                    margin="normal"
                    value={values.mobileNumber}
                    onChange={(e) => handleNumberInput(e, setFieldValue, "mobileNumber")}
                    error={errors.mobileNumber && touched.mobileNumber}
                    helperText={<ErrorMessage name="mobileNumber" />}
                  />
                </Grid>
                {/* Emergency Contact */}
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="Emergency Contact"
                    name="emergencyContact"
                    fullWidth
                    size="small"
                    margin="normal"
                    value={values.emergencyContact}
                    onChange={(e) => handleNumberInput(e, setFieldValue, "emergencyContact")}
                    error={errors.emergencyContact && touched.emergencyContact}
                    helperText={<ErrorMessage name="emergencyContact" />}
                  />
                </Grid>
                {/* Password */}
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Field
                    as={TextField}
                    label="Create Password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    fullWidth
                    size="small"
                    margin="normal"
                    error={errors.password && touched.password}
                    helperText={<ErrorMessage name="password" />}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowPassword((prev) => !prev)}>
                            {showPassword ? <VisibilityIcon style={{color:"black"}}/> : <VisibilityOffIcon style={{color:"black"}}/>}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                {/* Confirm Password */}
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Field
                    as={TextField}
                    label="Confirm Password"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    fullWidth
                    size="small"
                    margin="normal"
                    error={errors.confirmPassword && touched.confirmPassword}
                    helperText={<ErrorMessage name="confirmPassword" />}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowConfirmPassword((prev) => !prev)}>
                            {showConfirmPassword ? <VisibilityIcon style={{color:"black"}}/> : <VisibilityOffIcon style={{color:"black"}}/>}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                {/* Gender */}
                <Grid size={{ xs: 12 }} sx={{ display: "flex", justifyItems: "left", gap: "30px" }}>
                  <FormControl component="fieldset" margin="normal" sx={{ textAlign: "left", marginTop:-1 }}>
                    <FormLabel component="legend"><b>Gender</b></FormLabel>
                    <RadioGroup row name="gender">
                      <FormControlLabel
                        value="Male"
                        control={<Radio />}
                        label="Male"
                        onChange={() => setFieldValue("gender", "Male")}
                      />
                      <FormControlLabel
                        value="Female"
                        control={<Radio />}
                        label="Female"
                        onChange={() => setFieldValue("gender", "Female")}
                      />
                      <FormControlLabel
                        value="Others"
                        control={<Radio />}
                        label="Others"
                        onChange={() => setFieldValue("gender", "Others")}
                      />
                    </RadioGroup>
                    <ErrorMessage name="gender" component="div" style={{ color: "red" }} />
                  </FormControl>
                </Grid>
                {/* Blood Group */}
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Autocomplete
                    options={bloodGroupOptions}
                    size="small"
                    getOptionLabel={(option) => option.label}
                    onChange={(event, value) => setFieldValue("bloodGroup", value?.value || "")}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Blood Group"
                        error={errors.bloodGroup && touched.bloodGroup}
                        helperText={<ErrorMessage name="bloodGroup" />}
                      />
                    )}
                  />
                </Grid>
                {/* File Upload */}
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Button
                    variant="outlined"
                    component="label"
                    fullWidth
                    color="black"
                  >
                    {selectedFile ? selectedFile : "Upload File"}
                    <input
                      hidden
                      type="file"
                      accept=".png,.jpg,.jpeg,.pdf"
                      size="small"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          if (
                            !["image/png", "image/jpeg", "application/pdf"].includes(file.type)
                          ) {
                            alert("Only PNG, JPG, and PDF files are allowed.");
                            return;
                          }
                          if (file.size > 5 * 1024 * 1024) {
                            alert("File size must be less than or equal to 5 MB.");
                            return;
                          }
                          setSelectedFile(file.name);
                          setFieldValue("uploadedFile", file);
                        }
                      }}
                    />
                  </Button>
                  {errors.uploadedFile && touched.uploadedFile && (
                    <Typography color="error" variant="body2">
                      {errors.uploadedFile}
                    </Typography>
                  )}
                </Grid>
                {/* Checkbox for Terms */}
                <Grid size={{ xs: 12, sm: 6 }}>
                  <FormControlLabel
                    control={
                      <Checkbox size="small" color="success"
                        checked={values.newsletter}
                        onChange={() => setFieldValue("newsletter", !values.newsletter)}
                      />
                    }
                    label="Accept Terms and Conditions"
                  />
                  <ErrorMessage name="newsletter" component="div" style={{ color: "red" }} />
                </Grid>
                {/* Submit Button */}
                <Grid size={{ xs: 12}} container justifyContent="flex-end">
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      borderRadius: 10,
                      fontSize: 15,
                      backgroundColor: "#01579B",
                    }}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Card>
    </Box>
  );
};

export default FormikValidation;
