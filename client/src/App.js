import React from 'react';
import { BrowserRouter, Route, Redirect, Switch, Link } from 'react-router-dom';
import './App.css';
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
  return (
    <BrowserRouter>
      <Switch>
        <div className={classes.root}>
          <div className={classes.main}>
            <AppBar position="static">
              <Toolbar>
                <IconButton className={classes.menuButton} edge="start" color="inherit" aria-label="menu"><MenuIcon /></IconButton>
                <Typography className={classes.title} variant="h6" >Booking</Typography>
                <Button component = {Link} to ="/signin" color="inherit">SignIn</Button>
                <Button component = {Link} to ="/event" color="inherit">Event</Button>
                <Button component = {Link} to ="/booking" color="inherit">Booking</Button>
              </Toolbar>
            </AppBar>
            <Redirect from="/" to="/auth" exact />
            <Route path="/signin" component={SignInPage} />
            <Route path="/signup" component={SignUpPage} />
            <Route path="/event" component={EventPage} />
            <Route path="/booking" component={BookingPage} />
          </div>
        </div>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
