import React, {ChangeEvent, useState} from 'react';
import {LoginCredentials} from '../../../types';
import {Alert, Avatar, Box, Button, Container, Link, TextField, Typography} from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {selectLoginError} from '../usersSlice';
import {googleLogin, login} from '../usersThunk';
import {CredentialResponse, GoogleLogin} from '@react-oauth/google';

const Login = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectLoginError);
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState<LoginCredentials>({
    email: '',
    password: '',
  });

  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setLoginData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    await dispatch(login(loginData)).unwrap();
    navigate('/');
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
        onSubmit={submitFormHandler}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          p: 4,
          border: '1px solid #ddd',
          borderRadius: 2,
          mt: 5,
          alignItems: 'center',
        }}
      >
        <Avatar sx={{m: 1, backgroundColor: 'secondary.main'}}>
          <LockOpenIcon/>
        </Avatar>
        <Typography variant="h5" component="h1" textAlign="center" gutterBottom sx={{mb: 0}}>
          Sign in
        </Typography>
        {error && (
          <Alert severity="error" sx={{width: '100%'}}>
            {error.error}
          </Alert>
        )}
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
          value={loginData.email}
          onChange={inputChangeHandler}
          fullWidth
        />

        <TextField
          required
          label="Password"
          name="password"
          type="password"
          autoComplete="new-password"
          value={loginData.password}
          onChange={inputChangeHandler}
          fullWidth
        />

        <Button type="submit" variant="contained" sx={{mt: 2, backgroundColor: '#8e44ad'}} fullWidth>
          Sign in
        </Button>
        <Typography variant="body2" color="text.secondary" sx={{mt: 2}}>
          Do not have an account?{' '}
          <Link component={RouterLink} to={'/register'} variant="body2">
            Sign up
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;