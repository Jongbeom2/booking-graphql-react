import React, { useState, useContext}  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CreatorInfoDialog from '../components/CreatorInfoDialog';
import AuthContext from '../context/authContext';
import LoadingContext from '../context/loadingContext';
import gql from 'graphql-tag';
import { useMutation, } from '@apollo/react-hooks';
const useStyles = makeStyles(theme => ({
  card: {
    marginBottom: theme.spacing(2)
  },
}));

function Event(props) {
  const { signOut} = useContext(AuthContext);
  const {setIsLoading} = useContext(LoadingContext);
  const classes = useStyles();
  const {id, title, price, description, date, creator} = props;
  const [open, setOpen] = useState(false);
  const BOOK_EVENT = gql`
    mutation bookEvent($eventId: ID!){
      bookEvent(eventId: $eventId){
        _id
      }
    }
  `
  const [bookEvent, {  data, loading, error }] = useMutation(BOOK_EVENT);
  if (loading) {
    setIsLoading(true);
  }
  if (data) {
    setIsLoading(false);
  }
  const handleDialogOpen = () => {
    setOpen(true);
  };
  const handleDialogClose = () => {
    setOpen(false);
  };
  const handleBtnBooking = () => {
    bookEvent({
      variables: { eventId: id},
    })
    .catch(err=>{
      console.log(err)
      if(err.graphQLErrors[0].message==='Unauthenticatd!'){
        signOut();
        console.log(err.graphQLErrors);
        alert('Unauthenticatd!');
      }
      setIsLoading(false);
      console.log(err)
    });
  }
  return (
    <div>
    <Card className={classes.card} variant="outlined">
      <CardContent>
        <Typography variant ="h4" color="primary" gutterBottom>
          {title}
        </Typography>
        <Typography variant ="h6">
          Created By : {creator.email}
        </Typography>
        <Typography variant ="h6" gutterBottom>
          Price : {price}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Date : {date}
        </Typography>
        <Typography variant="body2" >
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button color="primary"size="small" onClick ={handleBtnBooking}>Book</Button>
        <Button color="primary"size="small" onClick = {handleDialogOpen}>Creator Info</Button>
      </CardActions>
    </Card>
    <CreatorInfoDialog handleClose={handleDialogClose} open={open} creator = {creator} />
    </div>
  );
}
export default Event;