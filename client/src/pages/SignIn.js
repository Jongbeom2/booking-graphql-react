import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AuthContext from '../context/authContext';
import Loading from '../components/Loading';
import gql from 'graphql-tag';
import { useLazyQuery , } from '@apollo/react-hooks';
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
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  }
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  }
  const SIGNIN = gql`
    query signIn($email: String!, $password: String!){
      login(email: $email, password: $password){
        userId
        token
        tokenExpiration
      }
    }
  `
  const[doSignIn,{loading}]= useLazyQuery(SIGNIN,{
    onCompleted: (data)=>{
      alert('Sign In Succeed');
      console.log('Sign In Succeed', data);
      signIn(data.login.token);
    },
    onError: (error)=>{
      alert('Sign In Failed')
      console.log('Sign In Failed', error);
    }
  });
  const handleClickSignIn = () => {
    doSignIn({
      variables: { email, password }
    });
  }
  return (
    <div>
      {loading?<Loading/>:null}
      <Container maxWidth="xs">
        <Typography className={classes.title} variant="h4" align="center" paragraph>Sign in</Typography>
        <TextField label="Email" fullWidth margin="normal" onChange={handleChangeEmail} />
        <TextField type="password" label="Password" fullWidth margin="normal" onChange={handleChangePassword} />
        <Button className={classes.signInbutton} variant="contained" color="primary" fullWidth size="large" onClick={handleClickSignIn}>Sign in</Button>
        <Button component={Link} to="/signup" className={classes.signUpbutton} variant="outlined" fullWidth size="large">Don't have an account? Sign Up</Button>
      </Container>
    </div>
  );
}
export default SignInPage;