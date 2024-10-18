import { Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <Box sx={{ textAlign: 'center', mt: 5 }}>
      <Typography variant="h3" gutterBottom>
        Page not found
      </Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        The page you're looking for doesn't exist.
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/" sx={{mt: 2, backgroundColor: '#8e44ad' }}>
        Homepage
      </Button>
    </Box>
  );
};

export default NotFoundPage;