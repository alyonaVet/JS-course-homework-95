import React, {useState} from 'react';
import {CocktailFields, User} from '../../../types';
import {Box, Button, Stack, TextField, Typography} from '@mui/material';
import FileInput from '../../../UI/FileInput/FileInput';
import {LoadingButton} from '@mui/lab';

interface Props {
  user: User;
  onSubmit: (cocktail: CocktailFields) => void;
  isLoading: boolean;
}

const AddCocktailForm: React.FC<Props> = ({user, onSubmit, isLoading}) => {
  const [cocktailData, setCocktailData] = useState<CocktailFields>({
    user: user._id,
    title: '',
    ingredients:[{ name: '', amount: '' }],
    image: null,
    recipe: ''
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);


  const addIngredient = () => {
    setCocktailData((cocktail) => ({
      ...cocktail,
      ingredients: [...cocktail.ingredients, {name: '', amount: ''}]
    }));
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setCocktailData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onIngredientChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    const {name, value} = event.target;
    setCocktailData((prevState) => {
      const ingredientsCopy = [...prevState.ingredients];
      ingredientsCopy[index] = {...ingredientsCopy[index], [name]: value};
      return {
        ...prevState,
        ingredients: ingredientsCopy,
      };
    });
  };

  const fileInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = event.target;
    const value = files && files[0] ? files[0] : null;

    setCocktailData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onIngredientDelete = (index: number) => {
    setCocktailData((prevState) => {
      return {
        ...prevState,
        ingredients: prevState.ingredients.filter((_, i) => i !== index),
      };
    });
  };

  const submitFormHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (!cocktailData.title || !cocktailData.ingredients || !cocktailData.recipe || !cocktailData.image) {
      setErrorMessage('All fields should be filled.');
      return;
    }
    onSubmit({...cocktailData});
    setCocktailData({
      user: user._id,
      title: '',
      ingredients:[{ name: '', amount: '' }],
      image: null,
      recipe: ''
    })
  };

  return (
    <Stack
      component="form"
      onSubmit={submitFormHandler}
      direction="column"
      alignItems="start"
      gap={2}
      mt={3}>
      <Stack direction="row" alignItems="center" gap={1}>
        <Box width="150px">
          <Typography variant="body1">Title:</Typography>
        </Box>
        <TextField
          label="Enter cocktail title"
          id="title"
          name="title"
          value={cocktailData.title}
          onChange={inputChangeHandler}
          error={!!errorMessage && !cocktailData.title}
          helperText={!!errorMessage && !cocktailData.title ? 'Title is required' : ''}
          fullWidth
        />
      </Stack>

      <Stack direction="row" alignItems="start" gap={1}>
        <Box width="100px">
          <Typography variant="body1">Ingredients:</Typography>
        </Box>
        <Stack direction="column" alignItems="start" gap={1}>
          {cocktailData.ingredients.map((ingredient, index) => (
            <Stack key={index} direction="row" alignItems="center" gap={1}>
              <TextField
                label="Enter ingredient"
                value={ingredient.name}
                name="name"
                onChange={(event) => onIngredientChange(event, index)}
                error={!!errorMessage && !ingredient.name}
                helperText={!!errorMessage && !ingredient.name ? 'Ingredients are required' : ''}
              />
              <TextField
                label="Amount"
                value={ingredient.amount}
                name="amount"
                onChange={(event) => onIngredientChange(event, index)}
                error={!!errorMessage && !ingredient.amount}
                helperText={!!errorMessage && !ingredient.amount ? 'Ingredients are required' : ''}
              />
              {index > 0 && (
                <Button type={'button'} onClick={() => onIngredientDelete(index)}>Delete</Button>
              )}
            </Stack>
          ))}
          <Button type="button" onClick={addIngredient}>Add ingredient</Button>
        </Stack>
      </Stack>

      <Stack direction="row" alignItems="center" gap={1}>
        <Box width="150px">
          <Typography variant="body1">Recipe:</Typography>
        </Box>
        <TextField
          label="Enter recipe here"
          id="recipe"
          name="recipe"
          value={cocktailData.recipe}
          onChange={inputChangeHandler}
          error={!!errorMessage && !cocktailData.recipe}
          helperText={!!errorMessage && !cocktailData.recipe ? 'Recipe is required' : ''}          fullWidth
        />
      </Stack>
      <Stack direction="row" alignItems="center" gap={1}>
        <Box width="100px">
          <Typography variant="body1">Image:</Typography>
        </Box>
        <FileInput
          label="Image"
          name="image"
          onChange={fileInputChangeHandler}
          error={!!errorMessage && !cocktailData.image}
          helperText={!!errorMessage && !cocktailData.image ? 'Image is required' : ''}
        />
      </Stack>

      <Stack direction="row" alignItems="center" mt={5}>
        <LoadingButton
          type="submit"
          disabled={isLoading}
          loadingPosition="center"
          variant="contained"
        >
          <span>create cocktail</span>
        </LoadingButton>
      </Stack>

    </Stack>
  );
};

export default AddCocktailForm;