import './App.css';
import AppToolbar from './UI/AppToolbar/AppToolbar';
import {Route, Routes} from 'react-router-dom';
import NotFoundPage from './UI/NotFoundPage/NotFoundPage';
import Register from './features/users/components/Register';
import Login from './features/users/components/Login';
import Cocktails from './features/cocktails/Cocktails';
import AddCocktail from './features/cocktails/AddCocktail';
import FullOneCocktail from './features/cocktails/FullOneCocktail';
import UserCocktails from './features/cocktails/UserCocktails';
import {useAppSelector} from './app/hooks';
import {selectUser} from './features/users/usersSlice';
import ProtectedRoute from './UI/ProtectedRoute/ProtectedRoute';

const App = () => {
  const user = useAppSelector(selectUser);

  return (
    <>
      <header>
        <AppToolbar/>
      </header>
      <Routes>
        <Route path="/" element={<Cocktails/>}/>
        <Route path="/cocktails/add-cocktail" element={
          <ProtectedRoute isAllowed={!!user}>
            <AddCocktail/>
          </ProtectedRoute>
        }/>
        <Route path="/cocktails/:id" element={<FullOneCocktail/>}/>
        <Route path="/cocktails/my-cocktails" element={<UserCocktails/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
    </>
  );
};

export default App;
