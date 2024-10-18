export interface RegisterCredentials {
  email: string;
  password: string;
  displayName: string;
  avatar: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  _id: string;
  email: string;
  token: string;
  role: string;
  displayName: string;
  avatar?: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    }
  },
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}

export interface Ingredient {
  _id: string;
  name: string;
  amount: string;
}

export interface IngredientFields {
  name: string;
  amount: string;
}

export interface Cocktail {
  _id: string;
  user: string;
  title: string;
  image: string | null;
  recipe: string;
  isPublished: boolean;
  ingredients: Ingredient[];
}

export interface CocktailFields {
  user: string;
  title: string;
  image: string | null;
  recipe: string;
  ingredients: IngredientFields[];
}