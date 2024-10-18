import React from 'react';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  styled,
  Typography
} from '@mui/material';
import {apiURL} from '../../../constants';
import {User} from '../../../types';

interface Props {
  id: string;
  title: string;
  image: string | null;
  onClick: () => void;
  user: User | null;
  isPublished: boolean;
  onToggle: VoidFunction;
  onDelete: VoidFunction;
  isToggling: boolean;
  isDeleting: boolean;
}

const CocktailCard: React.FC<Props> = ({
                                         title,
                                         image,
                                         onClick,
                                         user,
                                         isPublished,
                                         onToggle,
                                         onDelete,
                                         isToggling,
                                         isDeleting
                                       }) => {
  const ImageCardMedia = styled(CardMedia)({
    height: 0,
    paddingTop: '100%',
    objectFit: 'cover',
  });

  const cardImage = image ? apiURL + '/' + image : '';

  return (
    <Box sx={{mt: 3}}>
      {user && user.role === 'admin' &&
        (<Stack direction="row" justifyContent="space-between" mb={2}>
            <Button type="submit" sx={{cursor: 'pointer'}} color={isPublished ? 'error' : 'success'}
                    onClick={onToggle} disabled={isToggling}>{isPublished ? 'Unpublish' : 'Publish'}</Button>
            <Button type="submit" variant="outlined" color="error" sx={{mr: 1}} onClick={onDelete}
                    disabled={isDeleting}>Delete</Button>
          </Stack>
        )}
      <Card sx={{
        width: 300,
        m: 1,
        position: 'relative',
        '&:hover': {
          boxShadow: 6,
          transform: 'scale(1.03)',
        },
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      }}>
        {!isPublished && (
          <Chip
            label="Unpublished"
            color="warning"
            size="small"
            sx={{position: 'absolute', top: 10, right: 10, zIndex: 1}}
          />
        )}
        <CardActionArea onClick={onClick}>
          {image ? (
            <ImageCardMedia image={cardImage}/>
          ) : (
            <Box sx={{height: 0, paddingTop: '100%', backgroundColor: '#fafafa'}}/>
          )}
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" textAlign="center">
              {title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
};

export default CocktailCard;