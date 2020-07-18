import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Booking from '../components/Booking';
import AuthContext from '../context/authContext';
import Loading from '../components/Loading';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(5),
  },
}));
function BookingPage() {
  const { signOut } = useContext(AuthContext);
  const classes = useStyles();
  const GET_BOOKINGS = gql`
    query bookingList{
      getBookings{
        _id
        createdAt
        event{
          title
          date
        }
      }
    }
  `
  const { data, loading, refetch } = useQuery(GET_BOOKINGS,{
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
  return (
    <div>
      {loading?<Loading/>:null}
      <Container maxWidth="lg" className={classes.root}>
      {data?.getBookings.map(booking =>
        (<Booking getBookings={refetch} id={booking._id} createdAt={booking.createdAt} event={booking.event} />)
      )}
    </Container>
    </div>
  );
}
export default BookingPage;