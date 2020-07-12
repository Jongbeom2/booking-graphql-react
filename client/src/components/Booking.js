import React,{useContext}from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import AuthContext from '../context/authContext';
const useStyles = makeStyles(theme => ({
  card: {
    marginBottom: theme.spacing(2)
  },
}));
function Booking(props) {
  const { token} = useContext(AuthContext);
  const classes = useStyles();
  const {id, createdAt, event} = props;
  const {title, date} = event;
  const handleBtnCancel = async () => {
    const requestBody = {
      query: `
        mutation{
          cancelBooking(bookingId:"${id}"){
            _id
            title
          }
        }
      `
    };
    try {
      const result = await axios({
        url:'/graphql',
        method: 'POST',
        data: requestBody,
        headers: {
        'Authorization': `Bearer ${token}`,
        },
      });
      if(!result.data.data){
        throw new Error('Cancel Booking Failed');
      }
      alert('Cancel Booking Succeed');
    } catch (err) {
      alert('Cancel Booking Failed');
      console.log(err);
    }
  }
  return (
    <div>
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