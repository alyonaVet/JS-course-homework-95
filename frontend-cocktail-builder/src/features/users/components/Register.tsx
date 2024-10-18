import React, {ChangeEvent, useState} from 'react';
import {RegisterCredentials} from '../../../types';
import {Avatar, Box, Button, Container, TextField, Typography, Link, Stack} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {googleLogin, register} from '../usersThunk';
import {selectRegisterError} from '../usersSlice';
import FileInput from '../../../UI/FileInput/FileInput';
import {CredentialResponse, GoogleLogin} from '@react-oauth/google';

const Register = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectRegisterError);
  const navigate = useNavigate();

  const [registerData, setRegisterData] = useState<RegisterCredentials>({
    email: '',
    password: '',
    displayName: '',
    avatar: '',
  });

  const getFieldError = (fieldName: string) => {
    return error?.errors[fieldName]?.message;
  };

  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setRegisterData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fileInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = event.target;
    const value = files && files[0] ? files[0] : null;

    setRegisterData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await dispatch(register(registerData)).unwrap();
      navigate('/');
    } catch (error) {

    }
  };

  const googleLoginHandler = async (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      await dispatch(googleLogin(credentialResponse.credential)).unwrap();
    }
    navigate('/');
  };

  return (
    <Container maxWidth="xs">
      <Box
        component="form"
        noValidate
        onSubmit={submitFormHandler}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          p: 2,
          border: '1px solid #ddd',
          borderRadius: 2,
          mt: 3,
          alignItems: 'center',
        }}
      >
        <Avatar sx={{m: 1, backgroundColor: 'secondary.main'}}>
          <LockOutlinedIcon/>
        </Avatar>
        <Typography variant="h5" component="h1" textAlign="center" gutterBottom  sx={{m: 0}}>
          Sign up
        </Typography>

        <Typography variant="body2" textAlign="center" color="gray">or</Typography>

        <Box sx={{pb: 1}}>
          <GoogleLogin onSuccess={googleLoginHandler}
                       onError={() => {
                         console.log('Login Failed');
                       }}
          />
        </Box>

        <TextField
          required
          label="Email"
          name="email"
          autoComplete="new-email"
          value={registerData.email}
          onChange={inputChangeHandler}
          error={Boolean(getFieldError('email'))}
          helperText={getFieldError('email')}
          fullWidth
        />

        <TextField
          required
          label="Display Name"
          name="displayName"
          value={registerData.displayName}
          onChange={inputChangeHandler}
          error={Boolean(getFieldError('displayName'))}
          helperText={getFieldError('displayName')}
          fullWidth
        />

        <TextField
          required
          label="Password"
          name="password"
          type="password"
          autoComplete="new-password"
          value={registerData.password}
          onChange={inputChangeHandler}
          error={Boolean(getFieldError('password'))}
          helperText={getFieldError('password')}
          fullWidth
        />

        <Stack direction="row" alignSelf="start">
          <FileInput
            label="Avatar"
            name="avatar"
            onChange={fileInputChangeHandler}
          />
        </Stack>

        <Button type="submit" variant="contained" sx={{mt: 2, backgroundColor: '#8e44ad'}} fullWidth>
          Sign up
        </Button>
        <Typography variant="body2" color="text.secondary" sx={{mt: 2}}>
          Already have an account?{' '}
          <Link component={RouterLink} to={'/login'} variant="body2">
            Sign in
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Register;