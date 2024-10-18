import {createAsyncThunk} from '@reduxjs/toolkit';
import {Cocktail, CocktailFields, GlobalError} from '../../types';
import axiosApi from '../../axiosApi';
import {RootState} from '../../app/store';
import {isAxiosError} from 'axios';
import AxiosApi from '../../axiosApi';

export const fetchCocktails = createAsyncThunk<Cocktail[]>(
  'cocktails/fetchCocktails',
  async () => {
    const {data: cocktails} = await axiosApi.get<Cocktail[]>('/cocktails');
    return cocktails;
  }
);

export const addCocktail = createAsyncThunk<void, CocktailFields, { rejectValue: GlobalError, state: RootState }>(
  'cocktails/add',
  async (cocktailData, {rejectWithValue}) => {
    try {
      const formData = new FormData();
      formData.append('user', cocktailData.user);
      formData.append('title', cocktailData.title);

      if (cocktailData.image) {
        formData.append('image', cocktailData.image);
      }
      formData.append('recipe', cocktailData.recipe);
      formData.append('ingredients', JSON.stringify(cocktailData.ingredients));
      await axiosApi.post('/cocktails', formData);

    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  }
);

export const fetchOneCocktail = createAsyncThunk<Cocktail, string | undefined>(
  'products/fetchOneCocktail',
  async (id) => {
    const {data: cocktail} = await axiosApi.get(`/cocktails/${id}`);
    return cocktail;
  }
);

export const fetchUserCocktails = createAsyncThunk<Cocktail[]>(
  'cocktails/fetchMyCocktails',
  async () => {
    const {data: userCocktails} = await AxiosApi.get<Cocktail[]>('/cocktails/my-cocktails');
    return userCocktails;
  });

export const togglePublishedCocktail = createAsyncThunk<Cocktail, string, { rejectValue: GlobalError }>(
  'cocktails/togglePublishedCocktail',
  async (id, {rejectWithValue}) => {
    try {
      const {data: cocktailData} = await axiosApi.patch(`/cocktails/${id}/togglePublished`);
      return cocktailData;
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  }
);

export const deleteCocktail = createAsyncThunk<void, string, { rejectValue: GlobalError }>(
  'cocktails/deleteCocktail',
  async (id, {rejectWithValue}) => {
    try {
      await axiosApi.delete(`/cocktails/${id}`);
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  }
);