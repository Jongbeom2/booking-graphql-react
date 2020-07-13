import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import AuthContext from '../context/authContext';
import LoadingContext from '../context/loadingContext';
const useStyles = makeStyles(theme => ({
  title: {
    marginTop: theme.spacing(10)
  },
  signInbutton: {
    marginTop: theme.spacing(5)
  },
  signUpbutton: {
    marginTop: theme.spacing(2)
  },
}));
function SignInPage() {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useContext(AuthContext);
  const {setIsLoading} = useContext(LoadingContext);
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  }
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  }
  const handleClickSignIn = async () => {
    const requestBody = {
      query: `
        query{
          login(email: "${email}", password: "${password}"){
            userId
            token
            tokenExpiration
          }
        }
      `
    };
    try {
      setIsLoading(true);
      const result = await axios({
        url: '/graphql',
        method: 'POST',
        data: requestBody,
      })
      if(!result.data.data){
        throw new Error('Sign in Failed');
      }
      signIn(result.data.data.login.token, result.data.data.login.userId, result.data.data.login.tokenExpiration);
      alert('Sign in Succeed');
    } catch (err) {
      alert('Sign in Failed');
      console.log(err);
    } finally{
      setIsLoading(false);
    }
  }
  return (
    <div>
      <Container maxWidth="xs">
        <Typography className={classes.title} variant="h4" align="center" paragraph="true">Sign in</Typography>
        <TextField label="Email" fullWidth="true" margin="normal" onChange={handleChangeEmail} />
        <TextField type="password" label="Password" fullWidth="true" margin="normal" onChange={handleChangePassword} />
        <Button className={classes.signInbutton} variant="contained" color="primary" fullWidth="true" size="large" onClick={handleClickSignIn}>Sign in</Button>
        <Button component={Link} to="/signup" className={classes.signUpbutton} variant="outlined" fullWidth="true" size="large">Don't have an account? Sign Up</Button>
      </Container>
    </div>
  );
}
export default SignInPage;