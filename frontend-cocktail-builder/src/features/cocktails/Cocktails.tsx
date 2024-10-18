import {Box, CircularProgress, Stack, Typography} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectCocktailDeleting, selectCocktails, selectCocktailToggling, selectIsFetching} from './cocktailsSlice';
import CocktailCard from './components/CocktailCard';
import {useEffect} from 'react';
import {deleteCocktail, fetchCocktails, togglePublishedCocktail} from './cocktailsThunk';
import {useNavigate} from 'react-router-dom';
import {selectUser} from '../users/usersSlice';

const Cocktails = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cocktails = useAppSelector(selectCocktails);
  const cocktailsFetching = useAppSelector(selectIsFetching);
  const user = useAppSelector(selectUser);
  const cocktailPublishToggling = useAppSelector(selectCocktailToggling);
  const cocktailDeleting = useAppSelector(selectCocktailDeleting);

  useEffect(() => {
    dispatch(fetchCocktails());
  }, [dispatch]);

  const handleCardClick = (id: string) => {
    navigate(`/cocktails/${id}`);
  };

  const handleTogglePublished = async (id: string) => {
    await dispatch(togglePublishedCocktail(id));
  };

  const handleDelete = async (id: string) => {
    await dispatch(deleteCocktail(id));
  };

  return (
    <Box sx={{m: 4}}>
      <Typography variant="h4" component="h1" gutterBottom textAlign="center">
        Cocktails
      </Typography>
      {cocktailsFetching ? (
        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh'}}>
          <CircularProgress/>
        </Box>
      ) : (
        <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} flexWrap={'wrap'} gap={3}>
          {cocktails.map((cocktail) => (
            <CocktailCard
              key={cocktail._id}
              id={cocktail._id}
              title={cocktail.title}
              image={cocktail.image}
              onClick={() => handleCardClick(cocktail._id)}
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
    </Box>

  );
};

export default Cocktails;