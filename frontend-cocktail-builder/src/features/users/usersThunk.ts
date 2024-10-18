import {createAsyncThunk} from '@reduxjs/toolkit';
import {GlobalError, LoginCredentials, RegisterCredentials, User, ValidationError} from '../../types';
import {isAxiosError} from 'axios';
import axiosApi from '../../axiosApi';
import {unsetUser} from './usersSlice';

export const register = createAsyncThunk<User, RegisterCredentials, { rejectValue: ValidationError }>(
  'users/register',
  async (registerCredentials, {rejectWithValue}) => {
    try {
      const formData = new FormData();
      const keys = Object.keys(registerCredentials) as (keyof RegisterCredentials)[];
      keys.forEach((key) => {
        const value = registerCredentials[key];
        if (value !== null) {
          formData.append(key, value);
        }
      });
      const {data: user} = await axiosApi.post<User>('/users', formData);
      return user;
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data);
      }

      throw error;
    }
  }
);

export const login = createAsyncThunk<User, LoginCredentials, { rejectValue: GlobalError }>(
  'users/login',
  async (loginCredentials, {rejectWithValue}) => {
    try {
      const {data: user} = await axiosApi.post<User>('/users/sessions', loginCredentials);
      return user;

    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data);
      }

      throw error;
    }
  }
);

export const logout = createAsyncThunk(
  'users/logout',
  async (_, {dispatch}) => {
    await axiosApi.delete('/users/sessions');
    dispatch(unsetUser());
  }
);

export const googleLogin = createAsyncThunk<User, string, { rejectValue: GlobalError }>(
  'users/googleLogin',
  async (credential, {rejectWithValue}) => {
    try {
      const {data: user} = await axiosApi.post('/users/google', {credential});
      return user;
    } catch (error) {
      if (isAxiosError<GlobalError>(error) && error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data);
      }

      throw error;
    }
  },
);