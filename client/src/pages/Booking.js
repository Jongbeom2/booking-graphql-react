import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Booking from '../components/Booking';
import AuthContext from '../context/authContext';
import LoadingContext from '../context/loadingContext';
import axios from 'axios';
const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(5),
  },
}));
function BookingPage() {
  const { signOut } = useContext(AuthContext);
  const {setIsLoading} = useContext(LoadingContext);
  const classes = useStyles();
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    getBookings();
  },[]);
  const getBookings = async () => {
    const requestBody = {
      query: `
        query{
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
    };
    try {
      setIsLoading(true);
      const result = await axios({
        url: '/graphql',
        method: 'POST',
        data: requestBody,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if(result.data?.errors){
        if (result.data.errors[0].message=== 'Unauthenticatd!'){
          signOut();
          throw new Error('Unauthenticatd');
        }
      }
      if (!result.data.data) {
        throw new Error('Get bookings Failed');
      }
      setBookings(result.data.data.getBookings);
    } catch (err) {
      alert(err);
      console.log(err);
    } finally{
      setIsLoading(false);
    }
  }
  return (
    <Container maxWidth="lg" className={classes.root}>
      {bookings?.map(booking =>
        (<Booking getBookings = {getBookings} id={booking._id} createdAt={booking.createdAt} event={booking.event} />)
      )}
    </Container>
  );
}
export default BookingPage;