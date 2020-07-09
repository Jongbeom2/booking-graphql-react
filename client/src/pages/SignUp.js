import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from 'axios';
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
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  }
  const handleChangePassword1 = (e) => {
    setPassword1(e.target.value);
  }
  const handleChangePassword2 = (e) => {
    setPassword2(e.target.value);
  }
  const handleClickSignUp = async (e) => {
    const requestBody = {
      query: `
        mutation {
          createUser(userInput: {
            email: "${email}"
            password: "${setPassword1}"
          }){
            _id
            email
          }
        }
      `
    };
    try {
      const result = await axios({
        url:'/graphql',
        method: 'POST',
        data: requestBody,
      });
      console.log(result.data.data.createUser);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div>
      <Container maxWidth="xs">
        <Typography className={classes.title} variant="h4" align="center" paragraph="true">Sign in</Typography>
        <TextField label="Email" fullWidth="true" margin="normal" onChange={handleChangeEmail} />
        <TextField type="password" label="Password" fullWidth="true" margin="normal" onChange={handleChangePassword1} />
        <TextField type="password" label="Password Confirm" fullWidth="true" margin="normal" onChange={handleChangePassword2} />
        <Button className={classes.signInbutton} variant="contained" color="primary" fullWidth="true" size="large" onClick={handleClickSignUp}>Sign up</Button>
        <Button component = {Link} to ="/signin" className={classes.signUpbutton} variant="outlined" fullWidth="true" size="large">Already have an account? Sign in</Button>
      </Container>
    </div>
  );
}
export default SignUpPage;