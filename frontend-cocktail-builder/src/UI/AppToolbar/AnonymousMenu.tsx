import {Button, Stack} from '@mui/material';
import {NavLink} from 'react-router-dom';

const AnonymousMenu = () => {
  return (
    <Stack direction="row" spacing={1}>
      <Button component={NavLink} to="/register" color={'inherit'}>Sign up</Button>
      <Button component={NavLink} to="/login" color={'inherit'}>Sign in</Button>
    </Stack>
  );
};

export default AnonymousMenu;