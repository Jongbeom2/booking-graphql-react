import React, { useState, useEffect, useContext } from 'react';
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
import Event from '../components/Event';
import LoadingContext from '../context/loadingContext';
const useStyles = makeStyles(theme => ({
  createCard: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(3)
  },
  media: {
    height: '10rem'
  },
}));

function EventPage() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const {setIsLoading} = useContext(LoadingContext);
  useEffect(() => {
    getEvents();
  }, []);
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
      setIsLoading(true);
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
    } finally{
      setIsLoading(false);
    }
  }
  const handleDialogOpen = () => {
    setOpen(true);
  };
  const handleDialogClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Container maxWidth="lg">
        <Card className={classes.createCard}>
          <CardActionArea onClick={handleDialogOpen}>
            <CardMedia
              className={classes.media}
              image={eventImg}
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography className={classes.title} variant ="h6" color="primary" gutterBottom>
                Create event whatever you want!
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        {events.map(event =>
          (<Event id = {event._id} title={event.title} description={event.description} price={event.price} date={event.date} creator={event.creator}/>)
        )}
      </Container>
      <EventCreateDialog handleClose={handleDialogClose} open={open} getEvents={getEvents} />
    </div>
  );
}
export default EventPage;