import React,{useContext}from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AuthContext from '../context/authContext';
import gql from 'graphql-tag';
import { useMutation, } from '@apollo/react-hooks';
import Loading from '../components/Loading';
const useStyles = makeStyles(theme => ({
  card: {
    marginBottom: theme.spacing(2)
  },
}));
function Booking(props) {
  const { signOut} = useContext(AuthContext);
  const classes = useStyles();
  const {id, createdAt, event, getBookings} = props;
  const {title, date} = event;
  const CANCEL_BOOKING = gql`
    mutation cancelBooking($bookingId: ID!){
      cancelBooking(bookingId:$bookingId){
        _id
        title
      }
    }
  `
  const [cancelBooking, {  loading }] = useMutation(CANCEL_BOOKING,{
    onCompleted: (data)=>{
      getBookings();
      alert('Cancel Booking Succeed');
      console.log('Cancel Booking Succeed', data);
    },
    onError: (error)=>{
      if (error.graphQLErrors[0].message === 'Unauthenticatd!') {
        signOut();
        alert('Unauthenticatd');
        console.log('Unauthenticatd', error);
      }else{
        alert('Get Bookings Failed');
        console.log('Get Bookings Failed', error);
      }
    }
  });
  const handleBtnCancel = () => {
    cancelBooking({
      variables: { bookingId: id }
    })   
  }
  return (
    <div>
      {loading?<Loading/>:null}
      <Card className={classes.card} variant="outlined">
        <CardContent>
          <Typography variant ="h4" color="primary" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body2" gutterBottom>
            Event Date : {date}
          </Typography>
          <Typography variant="body2">
            Booking Date : {createdAt}
          </Typography>
        </CardContent>
        <CardActions>
          <Button color="primary"size="small" onClick = {handleBtnCancel}>Cancel</Button>
        </CardActions>
      </Card>
    </div>
  );
}
export default Booking;