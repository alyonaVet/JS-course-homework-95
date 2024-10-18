import {Cocktail} from '../../types';
import {createSlice} from '@reduxjs/toolkit';
import {
  addCocktail, deleteCocktail,
  fetchCocktails,
  fetchOneCocktail,
  fetchUserCocktails,
  togglePublishedCocktail
} from './cocktailsThunk';

export interface CocktailsState {
  cocktails: Cocktail[],
  isFetching: boolean,
  cocktailCreating: boolean;
  oneCocktail: Cocktail | null;
  oneCocktailFetching: boolean;
  userCocktails: Cocktail[],
  cocktailsFetching: boolean,
  cocktailToggling: boolean;
  cocktailDeleting: boolean;
}

const initialState: CocktailsState = {
  cocktails: [],
  isFetching: false,
  cocktailCreating: false,
  oneCocktail: null,
  oneCocktailFetching: false,
  userCocktails: [],
  cocktailsFetching: false,
  cocktailToggling: false,
  cocktailDeleting: false,
};

export const cocktailsSlice = createSlice({
  name: 'cocktails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCocktails.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchCocktails.fulfilled, (state, {payload: cocktails}) => {
        state.isFetching = false;
        state.cocktails = cocktails;
      })
      .addCase(fetchCocktails.rejected, (state) => {
        state.isFetching = false;
      });
    builder
      .addCase(addCocktail.pending, (state) => {
        state.cocktailCreating = true;
      })
      .addCase(addCocktail.fulfilled, (state) => {
        state.cocktailCreating = false;
      })
      .addCase(addCocktail.rejected, (state) => {
        state.cocktailCreating = false;
      });
    builder
      .addCase(fetchOneCocktail.pending, (state) => {
        state.oneCocktail = null;
        state.oneCocktailFetching = true;
      })
      .addCase(fetchOneCocktail.fulfilled, (state, {payload: cocktail}) => {
        state.oneCocktail = cocktail;
        state.oneCocktailFetching = false;
      })
      .addCase(fetchOneCocktail.rejected, (state) => {
        state.oneCocktailFetching = false;
      });
    builder
      .addCase(fetchUserCocktails.pending, (state) => {
        state.cocktailsFetching = true;
      })
      .addCase(fetchUserCocktails.fulfilled, (state, {payload: cocktails}) => {
        state.cocktailsFetching = false;
        state.userCocktails = cocktails;
      })
      .addCase(fetchUserCocktails.rejected, (state) => {
        state.cocktailsFetching = false;
      });
    builder
      .addCase(togglePublishedCocktail.pending, (state) => {
        state.cocktailToggling = true;
      })
      .addCase(togglePublishedCocktail.fulfilled, (state, {payload: publishedCocktails}) => {
        state.cocktailToggling = false;
        state.cocktails = state.cocktails.map(cocktail =>
          cocktail._id === publishedCocktails._id ? publishedCocktails : cocktail
        );
      })
      .addCase(togglePublishedCocktail.rejected, (state) => {
        state.cocktailToggling = false;
      });
    builder
      .addCase(deleteCocktail.pending, (state, action) => {
        state.cocktailDeleting = true;
        state.cocktails = state.cocktails.filter(cocktail => cocktail._id !== action.meta.arg);
      })
      .addCase(deleteCocktail.fulfilled, (state) => {
        state.cocktailDeleting = false;
      })
      .addCase(deleteCocktail.rejected, (state) => {
        state.cocktailDeleting = false;
      });
  },
  selectors: {
    selectCocktails: (state) => state.cocktails,
    selectIsFetching: (state) => state.isFetching,
    selectCocktailCreating: (state) => state.cocktailCreating,
    selectOneCocktail: (state) => state.oneCocktail,
    selectOneCocktailFetching: (state) => state.oneCocktailFetching,
    selectUserCocktails: (state) => state.userCocktails,
    selectCocktailsFetching: (state) => state.cocktailsFetching,
    selectCocktailToggling: (state) => state.cocktailToggling,
    selectCocktailDeleting: (state) => state.cocktailDeleting,
  },
});

export const cocktailsReducer = cocktailsSlice.reducer;

export const {
  selectCocktails,
  selectIsFetching,
  selectCocktailCreating,
  selectOneCocktail,
  selectOneCocktailFetching,
  selectUserCocktails,
  selectCocktailsFetching,
  selectCocktailToggling,
  selectCocktailDeleting,
} = cocktailsSlice.selectors;