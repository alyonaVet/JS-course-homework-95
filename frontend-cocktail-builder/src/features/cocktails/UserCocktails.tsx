import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {
  selectCocktailDeleting,
  selectCocktailsFetching,
  selectCocktailToggling,
  selectUserCocktails
} from './cocktailsSlice';
import {useEffect} from 'react';
import {deleteCocktail, fetchUserCocktails, togglePublishedCocktail} from './cocktailsThunk';
import {Box, Button, CircularProgress, Stack, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import CocktailCard from './components/CocktailCard';
import {selectUser} from '../users/usersSlice';

const UserCocktails = () => {
  const dispatch = useAppDispatch();
  const cocktails = useAppSelector(selectUserCocktails);
  const user = useAppSelector(selectUser);
  const cocktailsFetching = useAppSelector(selectCocktailsFetching);
  const cocktailPublishToggling = useAppSelector(selectCocktailToggling);
  const cocktailDeleting = useAppSelector(selectCocktailDeleting);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUserCocktails());
  }, [dispatch]);

  const handleUserCardClick = (id: string) => {
    navigate(`/cocktails/${id}`);
  };

  const handleAddCocktailClick = () => {
    navigate('/cocktails/add-cocktail');
  };

  const handleTogglePublished = async (id: string) => {
    await dispatch(togglePublishedCocktail(id));
  };

  const handleDelete = async (id: string) => {
    await dispatch(deleteCocktail(id));
  };

  return (
    <Stack m={3} alignItems="center" >
      <Typography variant="h4" textAlign="center">My Cocktails</Typography>

      {cocktailsFetching ? (
        <CircularProgress />
      ) : cocktails.length === 0 ? (
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body1">No cocktails added yet.</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddCocktailClick}
            sx={{ mt: 2 }}
          >
            Add Cocktail
          </Button>
        </Box>
      ) : (
        <Stack direction="row" alignItems="center" gap={2} flexWrap="wrap" justifyContent="center">
          {cocktails.map(cocktail => (
            <CocktailCard
              key={cocktail._id}
              id={cocktail._id}
              title={cocktail.title}
              image={cocktail.image}
              onClick={() => handleUserCardClick(cocktail._id)}
              user={user}
              isPublished={cocktail.isPublished}
              onToggle={() => handleTogglePublished(cocktail._id)}
              onDelete={() => handleDelete(cocktail._id)}
              isToggling={cocktailPublishToggling}
              isDeleting={cocktailDeleting}
            />
          ))}
        </Stack>
      )}
    </Stack>
  );
};

export default UserCocktails;
