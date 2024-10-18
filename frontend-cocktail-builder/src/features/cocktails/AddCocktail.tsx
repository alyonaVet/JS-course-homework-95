import {Alert, Box, Snackbar, Typography} from '@mui/material';
import AddCocktailForm from './components/AddCocktailForm';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectUser} from '../users/usersSlice';
import {selectCocktailCreating} from './cocktailsSlice';
import {addCocktail, fetchCocktails} from './cocktailsThunk';
import {CocktailFields} from '../../types';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

const AddCocktail = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cocktailCreating = useAppSelector(selectCocktailCreating);

  const [successMessage, setSuccessMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  if (!user) {
    return;
  }
  const submitHandler = async (cocktailData: CocktailFields) => {
    await dispatch(addCocktail(cocktailData));
    await dispatch(fetchCocktails());
    setSuccessMessage('Your cocktail is under moderator review.');
    setSnackbarOpen(true);
    setTimeout(() => {
      navigate('/');
    }, 4000);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{m: 3}}>
      <Typography variant="h4">Add new cocktail</Typography>
      <AddCocktailForm onSubmit={submitHandler} isLoading={cocktailCreating} user={user}/>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddCocktail;