import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Booking from '../components/Booking';
import AuthContext from '../context/authContext';
import LoadingContext from '../context/loadingContext';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(5),
  },
}));
function BookingPage() {
  const { signOut } = useContext(AuthContext);
  const {setIsLoading} = useContext(LoadingContext);
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
  const { data, loading, error, refetch } = useQuery(GET_BOOKINGS);
  if (loading) {
    setIsLoading(true);
  }
  if (data) {
    setIsLoading(false);
  }
  if (error) return <p>ERROR</p>;
  return (
    <Container maxWidth="lg" className={classes.root}>
      {data?.getBookings.map(booking =>
        (<Booking getBookings = {refetch} id={booking._id} createdAt={booking.createdAt} event={booking.event} />)
      )}
    </Container>
  );
}
export default BookingPage;