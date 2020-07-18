import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Redirect, Switch, Link } from 'react-router-dom';
import './App.css';
import HomePage from './pages/Home';
import SignInPage from './pages/SignIn';
import SignUpPage from './pages/SignUp';
import BookingPage from './pages/Booking';
import EventPage from './pages/Event';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AuthContext from './context/authContext';
import PrivateRoute from './components/PrivateRoute';
const useStyles = makeStyles(theme => ({
  root: {
    background: '#ecf0f1',
    width: '100%',
    height: '100%',
    flexGrow: 1,
  },
  main: {
    background: '#ffffff',
    overflowY: 'scroll',
    width: '50%',
    height: '100%',
    margin: '0 25% 0 25%',
    boxSizing: 'border-box',
    '@media (max-width:960px)': {
      width: '100%',
      margin: '0'
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));
function App() {
  const classes = useStyles();
  const [token, setToken] = useState('');
  useEffect(()=>{
    const token = localStorage.getItem('token');
    if (token){
      setToken(token);
    }
  },[])
  const signIn = (token) => {
    setToken(token);
    localStorage.setItem('token', token);
  }
  const signOut = () => {
    setToken(null);
    localStorage.setItem('token', '');
  }
  console.log('Render')
  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ signIn, signOut }}>
        <Switch>
          <div className={classes.root}>
            <div className={classes.main}>
              <AppBar position="static">
                <Toolbar>
                  <IconButton className={classes.menuButton} edge="start" color="inherit" aria-label="menu"><MenuIcon /></IconButton>
                  <Typography className={classes.title} variant="h6" >Booking</Typography>
                  <Button component={Link} to="/event" color="inherit">Event</Button>
                  <Button component={Link} to="/booking" color="inherit">Booking</Button>
                  {token
                    ? <Button onClick={signOut} color="inherit">Logout</Button>
                    : <Button component={Link} to="/signin" color="inherit">SignIn</Button>
                  }
                </Toolbar>
              </AppBar>
              {token && <Redirect from="/signin" to="/home" exact />}
              {token && <Redirect from="/signup" to="/home" exact />}
              <Route exact path="/" component={HomePage} />
              <Route exact path="/home" component={HomePage} />
              <Route exact path="/signin" component={SignInPage} />
              <Route exact path="/signup" component={SignUpPage} />
              <PrivateRoute exact path="/event" token={token}>
                <EventPage />
              </PrivateRoute>
              <PrivateRoute exact path="/booking" token={token}>
                <BookingPage />
              </PrivateRoute>
            </div>
          </div>
        </Switch>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
