import { BrowserRouter, Routes,Route,  Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import './App.css';
import { themeSettings } from 'theme';
import { useMemo } from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { useSelector } from 'react-redux';
// The CssBaseline component is used to normalize and apply baseline CSS styles to your application. 
// It helps in providing consistent styling across different browsers by resetting some default styles.
//  It ensures that your application starts with a consistent baseline, eliminating browser inconsistencies. 


function App() {
     const mode=useSelector((state)=>state.mode);
    //  here we are setting the theme of our app according to the current Mode
//  theme will get its value from useMemo hook The useMemo hook is used to memoize expensive calculations or values in React.
//  It allows you to cache the result of a computation and recompute it only when the dependencies change.
     const theme=useMemo(()=>

     createTheme(themeSettings(mode))

     ,[mode]);

     const isAuth = Boolean(useSelector((state) => state.token));
  return (

    <div className='app'>
    <BrowserRouter>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
    <Routes>
      <Route path='/' element={<LoginPage/>} />
      <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            />
     <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
