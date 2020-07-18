import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Loading from '../components/Loading';
import gql from 'graphql-tag';
import { useMutation, } from '@apollo/react-hooks';
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
function SignUpPage() {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  }
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  }
  const handleChangePassword2 = (e) => {
    setPassword2(e.target.value);
  }
  const SIGNUP = gql`
    mutation createUser($userInput: UserInput){
      createUser(userInput: $userInput){
        _id
        email
      }
    }
  `
  const [signUp, { loading }] = useMutation(SIGNUP, {
    onCompleted: (data) => {
      alert('Sign Up Succeed');
      console.log('Sign Up Succeed', data)
    },
    onError: (error) => {
      alert('Sign Up Failed');
      console.log('Sign Up Failed', error);
    }
  });
  const handleClickSignUp = () => {
    if (password !== password2) {
      alert('Check Password Confirmed');
      return;
    }
    signUp({
      variables: { userInput: { email, password } }
    });
  }
  return (
    <div>
      {loading ? <Loading /> : null}
      <Container maxWidth="xs">
        <Typography className={classes.title} variant="h4" align="center" paragraph="true">Sign in</Typography>
        <TextField label="Email" fullWidth="true" margin="normal" onChange={handleChangeEmail} />
        <TextField type="password" label="Password" fullWidth="true" margin="normal" onChange={handleChangePassword} />
        <TextField type="password" label="Password Confirm" fullWidth="true" margin="normal" onChange={handleChangePassword2} />
        <Button className={classes.signInbutton} variant="contained" color="primary" fullWidth="true" size="large" onClick={handleClickSignUp}>Sign up</Button>
        <Button component={Link} to="/signin" className={classes.signUpbutton} variant="outlined" fullWidth="true" size="large">Already have an account? Sign in</Button>
      </Container>
    </div>
  );
}
export default SignUpPage;