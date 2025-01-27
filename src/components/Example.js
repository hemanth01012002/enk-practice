import React, { useState, useEffect } from "react";
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
import ClearIcon from "@mui/icons-material/Clear";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addFormData, updateFormData, deleteFormData } from "../Redux/formReducer"; // Import redux actions
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import datepicker styles

const Example = () => {
  const [open, setOpen] = useState(false); // For Modal
  const [editIndex, setEditIndex] = useState(null); // Index of the row being edited
  const data = useSelector((state) => state.form.data); // Get form data from Redux
  const dispatch = useDispatch(); // Dispatch actions to Redux
  const navigate = useNavigate(); // Navigation to other pages

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    mobileNumber: "",
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
          return (
            age > 18 ||
            (age === 18 && (monthDifference > 0 || (monthDifference === 0 && dayDifference >= 0)))
          );
        }
      ),
    mobileNumber: Yup.string()
      .matches(/^\d{10}$/, "Mobile number must be exactly 10 digits")
      .required("Mobile number is required"),
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEditIndex(null);
  };

  const handleSubmit = (values) => {
    if (editIndex !== null) {
      dispatch(updateFormData(editIndex, values)); // Update existing row
    } else {
      dispatch(addFormData({ ...values, id: data.length + 1 })); // Add new row
    }
    handleClose();
  };

  const handleDelete = (index) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this record?");
    if (confirmDelete) {
      dispatch(deleteFormData(index)); // Delete row
    }
  };
  const handleEdit = (index) => {
    setEditIndex(index);
    setOpen(true);
  };

  const handleShowData = (id) => {
    const person = data.find((row) => row.id === id);
    navigate(`/user/datapage/${id}`, { state: { person } });
  };

  // Function to format the phone number input
  const handleNumberInput = (e, setFieldValue, fieldName) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    if (value.length <= 10) {
      setFieldValue(fieldName, value); // Update the field value
    }
  };

  return (
    <Box sx={{ maxWidth: 1000, margin: "auto", padding: 3 }}>
      <Button variant="contained" onClick={handleOpen}>
        Add
      </Button>

      <Modal open={open}>
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
          <Typography
            variant="h6"
            gutterBottom
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            {editIndex !== null ? "Edit Person" : "Add Person"}
            <Button onClick={handleClose} color="black">
              <ClearIcon />
            </Button>
          </Typography>
          <Formik
            initialValues={editIndex !== null ? data[editIndex] : initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
              handleSubmit(values);
              resetForm();
            }}
          >
            {({ errors, touched, setFieldValue, values }) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid size={{xs:12 ,sm:6}}>
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
                  <Grid size={{xs:12 ,sm:6}}>
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
                  <Grid size={{xs:12 ,sm:6}}>
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
                  <Grid size={{xs:12 ,sm:6}}>
                    <Field name="dateOfBirth">
                      {({ field, form }) => {
                        const selectedDate = field.value
                          ? new Date(field.value)
                          : null;
                        return (
                          <DatePicker
                            {...field}
                            selected={selectedDate}
                            onChange={(date) =>
                              form.setFieldValue(
                                "dateOfBirth",
                                date
                                  ? date.toISOString().split("T")[0]
                                  : ""
                              )
                            }
                            dateFormat="yyyy-MM-dd"
                            placeholderText="Select Date of Birth"
                            maxDate={new Date(2006, 11, 31)}
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
                  <Grid size={{xs:12 ,sm:6}}>
                    <Field
                      as={TextField}
                      label="Mobile Number"
                      name="mobileNumber"
                      fullWidth
                      required
                      size="small"
                      value={values.mobileNumber}
                      onChange={(e) =>
                        handleNumberInput(e, setFieldValue, "mobileNumber")
                      }
                      error={touched.mobileNumber && !!errors.mobileNumber}
                      helperText={<ErrorMessage name="mobileNumber" />}
                    />
                  </Grid>
                </Grid>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: 2,
                  }}
                >
                  <Button
                    onClick={handleClose}
                    variant="outlined"
                    color="secondary"
                    sx={{ marginRight: 1 }}
                  >
                    Cancel
                  </Button>
                  <Button variant="contained" type="submit">
                    {editIndex !== null ? "Update" : "Submit"}
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>

      <Box sx={{ marginTop: 2 }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{backgroundColor:"grey.200"}}>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Date of Birth</TableCell>
                <TableCell>Mobile Number</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
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
                    <TableCell>
                      <IconButton onClick={() => handleEdit(index)} color="primary">
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(index)} color="error">
                        <DeleteIcon />
                      </IconButton>
                      <Button onClick={() => handleShowData(row.id)}>
                        Show Data
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Example;
