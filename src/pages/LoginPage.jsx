import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, TextField, Box, Typography, Container, CssBaseline, Card, CardContent } from '@mui/material';
import { useDispatch } from 'react-redux';
import { login } from '../Redux/authActions'; // import login action
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // Watch values of username and password
  const username = watch('username', '');
  const password = watch('password', '');

  // Login handler
  const onSubmit = (data) => {
    dispatch(login(data.username)); // Dispatch login action
    navigate('/userpage'); // Redirect to the user page
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 8,
        }}
      >
        <Card
          sx={{
            width: '100%',
            padding: 3,
            boxShadow: 3,
            borderRadius: 2,
          }}
        >
          <CardContent>
            <Typography variant="h5" gutterBottom align="center">
              Login
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                margin="normal"
                {...register('username', { required: 'Username is required.' })}
                error={!!errors.username}
                helperText={errors.username?.message}
              />
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                fullWidth
                margin="normal"
                {...register('password', {
                  required: 'Password is required.',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters.',
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^(){}[\]:;<>,.~_+-=|/\\]).{6,}$/,
                    message:
                      'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.',
                  },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ marginTop: 2 }}
                disabled={!username || !password} 
              >
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default LoginPage;
