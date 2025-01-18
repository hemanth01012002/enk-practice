import React, { useState } from "react";
import {
  Box,
  Button,
  InputAdornment,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DatePicker from "react-datepicker"; // Import the DatePicker component
import "react-datepicker/dist/react-datepicker.css"; // Import the styles for DatePicker
import ClearIcon from '@mui/icons-material/Clear';
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

const App = () => {
  const [open, setOpen] = useState(false); // For Modal
  const [data, setData] = useState([]); // Table data
  const [editIndex, setEditIndex] = useState(null); // Index of the row being edited
   const [showPassword, setShowPassword] = useState(false);//password
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);//showPassword

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string()
    .email("Invalid email")
    .required("Email is required")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email format"
    ),
    dateOfBirth: Yup.date()
    .required("Date of birth is required")
    .typeError("Invalid date")
    .max(new Date(2006, 11, 31), "Date of birth must be before December 31, 2006")
    .test(
      "is-18",
      "You must be at least 18 years old",
      (value) => {
        const today = new Date();
        const dob = new Date(value);
        const age = today.getFullYear() - dob.getFullYear();
        const monthDifference = today.getMonth() - dob.getMonth();
        const dayDifference = today.getDate() - dob.getDate();
        return age > 18 || (age === 18 && (monthDifference > 0 || (monthDifference === 0 && dayDifference >= 0)));
      }
    ),
    mobileNumber: Yup.string()
    .matches(/^\d{10}$/, "Mobile number must be exactly 10 digits")
      .required("Mobile number is required"),
      password: Yup.string()
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
            "Password must have at least 1 uppercase, 1 lowercase, 1 number, 1 symbol, and 6+ characters"
          )
          .required("Password is required"),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref("password"), null], "Passwords must match")
          .required("Confirm Password is required"),
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEditIndex(null);
  };

  const handleSubmit = (values) => {
    if (editIndex !== null) {
      // Update existing row
      const updatedData = [...data];
      updatedData[editIndex] = values;
      setData(updatedData);
    } else {
      // Add new row
      setData([...data, values]);
    }
    handleClose();
  };

  // Handle mobile number input
  const handleNumberInput = (e, setFieldValue, fieldName) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
    setFieldValue(fieldName, value);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setOpen(true);
  };

  const handleDelete = (index) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this record?");
    if (confirmDelete) {
      const filteredData = data.filter((_, i) => i !== index);
      setData(filteredData);
    }
  };

  return (
    <Box sx={{ maxWidth: 1000, margin: "auto", padding: 3 }}>
      <Button variant="contained" onClick={handleOpen}>
        Add
      </Button>

      {/* Modal with Form */}
      <Modal open={open} >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" gutterBottom sx={{display:"flex", justifyContent:"space-between"}}>
            {editIndex !== null ? "Edit Person" : "Add Person"}
            <Button onClick={handleClose} color="black"><ClearIcon /></Button>
          </Typography>
          <Formik
            initialValues={editIndex !== null ? data[editIndex] : initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
              handleSubmit(values);
              resetForm(); // Clear the form after submission
            }}
          >
            {({ errors, touched, setFieldValue, values }) => (
              <Form>
                <Grid container spacing={2}>
                  {/* First Name */}
                  <Grid size={{xs:12, sm:6, md:6}}>
                    <Field
                      as={TextField}
                      label="First Name"
                      name="firstName"
                      fullWidth
                      required
                      size="small"
                      error={touched.firstName && !!errors.firstName}
                      helperText={<ErrorMessage name="firstName" />}
                    />
                  </Grid>
                  {/* Last Name */}
                  <Grid size={{xs:12, sm:6, md:6}}>
                    <Field
                      as={TextField}
                      label="Last Name"
                      name="lastName"
                      fullWidth
                      required
                      size="small"
                      error={touched.lastName && !!errors.lastName}
                      helperText={<ErrorMessage name="lastName" />}
                    />
                  </Grid>
                  {/* Email */}
                  <Grid size={{xs:12, sm:6, md:6}}>
                    <Field
                      as={TextField}
                      label="Email"
                      name="email"
                      fullWidth
                      required
                      size="small"
                      error={touched.email && !!errors.email}
                      helperText={<ErrorMessage name="email" />}
                    />
                  </Grid>
                  {/* Date of Birth */}
                  <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                     <Field name="dateOfBirth">
                       {({ field, form }) => {
                         const selectedDate = field.value ? new Date(field.value) : null; // Convert string to Date
                         return (
                           <DatePicker
                             {...field}
                             selected={selectedDate}
                             onChange={(date) => {
                               form.setFieldValue("dateOfBirth", date ? date.toISOString().split("T")[0] : ""); // Store as yyyy-MM-dd format
                             }}
                             dateFormat="yyyy-MM-dd"
                             placeholderText="Select Date of Birth"
                             maxDate={new Date(2006, 11, 31)} // Restrict to December 31, 2006
                             showYearDropdown
                             scrollableYearDropdown
                             showMonthDropdown
                             customInput={
                               <TextField
                                 label="Date of Birth"
                                 fullWidth
                                 size="small"
                                 InputProps={{
                                   endAdornment: (
                                     <InputAdornment position="end">
                                       <IconButton>
                                         <CalendarTodayIcon />
                                       </IconButton>
                                     </InputAdornment>
                                   ),
                                 }}
                               />
                             }
                           />
                         );
                       }}
                     </Field>
                   </Grid>
                  
                  {/* Mobile Number */}
                  <Grid size={{xs:12, sm:6, md:6}}>
                    <Field
                      as={TextField}
                      label="Mobile Number"
                      name="mobileNumber"
                      fullWidth
                      required
                      size="small"
                      value={values.mobileNumber}
                      onChange={(e) => handleNumberInput(e, setFieldValue, "mobileNumber")}
                      error={touched.mobileNumber && !!errors.mobileNumber}
                      helperText={<ErrorMessage name="mobileNumber" />}
                    />
                  </Grid>
                   {/* Password */}
                <Grid size={{ xs: 12, sm: 6, md:6 }}>
                  <Field
                    as={TextField}
                    label="Create Password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    fullWidth
                    required
                    size="small"
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
                <Grid size={{ xs: 12, sm: 6,  md:6 }}>
                  <Field
                    as={TextField}
                    label="Confirm Password"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    fullWidth
                    required
                    size="small"
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
                  {/* Submit Button */}
                  <Grid size={{xs:12, sm:6, md:6}} container justifyContent="flex-end">
                    <Button type="submit" variant="contained">
                      {editIndex !== null ? "Update" : "Submit"}
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>

      {/* Data Table */}
      <TableContainer component={Paper} sx={{ mt: 3 }} >
        <Table>
          <TableHead>
            <TableRow >
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>DOB</TableCell>
              <TableCell>Mobile Number</TableCell>
              <TableCell>Password</TableCell>
              <TableCell>Confirm Password</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No data found
                </TableCell>
              </TableRow>
            ) : (
              data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.firstName}</TableCell>
                  <TableCell>{row.lastName}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.dateOfBirth}</TableCell>
                  <TableCell>{row.mobileNumber}</TableCell>
                  <TableCell>{row.password}</TableCell>
                  <TableCell>{row.confirmPassword}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(index)} color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(index)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default App;
