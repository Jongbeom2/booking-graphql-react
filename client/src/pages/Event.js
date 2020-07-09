import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import eventImg from '../img/event.png';
import EventCreateDialog from '../components/EventCreateDialog';
import axios from 'axios';
import { set } from 'mongoose';
const useStyles = makeStyles(theme => ({
  card: {
    marginTop: theme.spacing(5)
  },
  media: {
    height: '10rem'
  },
}));

function EventPage() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [events, setEvents] = useState([]);
  useEffect(() => {
    getEvents();
  }, []);
  useEffect(() => {
    setEventsComponent();
  }, [events]);
  const setEventsComponent = () => {
    console.log(events);
  }
  const getEvents = async () => {
    const requestBody = {
      query: `
        query{
          getEvents{
            _id
            title
            description
            price
            date
            creator{
              _id
              email
            }
          }
        }
      `
    };
    try {
      const result = await axios({
        url: '/graphql',
        method: 'POST',
        data: requestBody,
      });
      if (!result.data.data) {
        throw new Error('Get events Failed');
      }
      setEvents(result.data.data.getEvents);
    } catch (err) {
      alert('Get events Failed');
      console.log(err);
    }
  }
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Container maxWidth="lg">
        <Card className={classes.card}>
          <CardActionArea onClick={handleOpen}>
            <CardMedia
              className={classes.media}
              image={eventImg}
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                Create event whatever you want!
            </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Container>
      <EventCreateDialog handleClose={handleClose} open={open} getEvents={getEvents} />
    </div>
  );
}
export default EventPage;