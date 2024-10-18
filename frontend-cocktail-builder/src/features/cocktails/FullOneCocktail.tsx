import {Box, CardMedia, CircularProgress, List, ListItem, ListItemText, Stack, styled, Typography} from '@mui/material';
import {apiURL} from '../../constants';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectOneCocktail, selectOneCocktailFetching} from './cocktailsSlice';
import {useParams} from 'react-router-dom';
import {useEffect} from 'react';
import {fetchOneCocktail} from './cocktailsThunk';


const FullOneCocktail = () => {
  const {id} = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const cocktail = useAppSelector(selectOneCocktail);
  const oneCocktailFetching = useAppSelector(selectOneCocktailFetching);

  useEffect(() => {
    dispatch(fetchOneCocktail(id));
  }, [dispatch, id]);

  const ImageCardMedia = styled(CardMedia)({
    height: 0,
    paddingTop: '100%',
    objectFit: 'cover',
    border: '1px solid #ccc',
    borderRadius: '8px',
  });

  const cardImage = cocktail?.image ? apiURL + '/' + cocktail.image : '';

  return (
    <Stack m={3} direction="row">
      {oneCocktailFetching ? (
        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh'}}>
          <CircularProgress/>
        </Box>
      ) : (
        cocktail && (
          <Stack p={1} width="100%">
            <Typography variant="h2" textAlign={'center'}>{cocktail.title}</Typography>
            <Stack direction="row" gap={4} mt={4}>
              <Box width={250}>
                {cardImage && (
                  <ImageCardMedia image={cardImage}/>
                )}
              </Box>
              <Stack>
                <Box>
                  <Typography variant="h6">Ingredients:</Typography>
                  <List>
                    {cocktail.ingredients.map((ingredient, index) => (
                      <ListItem key={index}>
                        <ListItemText primary={`- ${ingredient.amount} of ${ingredient.name}`}/>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Stack>
            </Stack>
            <Box sx={{marginTop: 4}}>
              <Typography variant="h5">Recipe:</Typography>
              <Typography variant="body1">{cocktail.recipe}</Typography>
            </Box>
          </Stack>
        )
      )}
    </Stack>
  );
};

export default FullOneCocktail;