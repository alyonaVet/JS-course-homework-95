import {Ingredient} from '../types';

export const parseIngredients = (ingredients: string) => {
  try {
      return JSON.parse(ingredients) as Ingredient[] ;
  } catch (error) {
    return [];
  }
}