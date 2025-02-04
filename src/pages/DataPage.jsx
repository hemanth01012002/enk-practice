import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

const DataPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const data = useSelector((state) => state.form.data);
  const person = data.find((row) => row.id === parseInt(id));

  const handleExit = () => {
    navigate('/user');
  };

  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', padding: 3 }}>
      {person ? (
        <>
          <Typography variant="h5" gutterBottom>
            User Details
          </Typography>
          <Typography variant="body1">
            <strong>First Name:</strong> {person.firstName}
          </Typography>
          <Typography variant="body1">
            <strong>Last Name:</strong> {person.lastName}
          </Typography>
          <Typography variant="body1">
            <strong>Email:</strong> {person.email}
          </Typography>
          <Typography variant="body1">
            <strong>Date of Birth:</strong> {person.dateOfBirth}
          </Typography>
          <Typography variant="body1">
            <strong>Mobile Number:</strong> {person.mobileNumber}
          </Typography>
        </>
      ) : (
        <Typography variant="body1">No data found for this ID.</Typography>
      )}
      <Button variant="contained" onClick={handleExit} sx={{ mt: 2 }}>
        Exit
      </Button>
    </Box>
  );
};

export default DataPage;
