import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import eventImg from '../img/event.png';
import EventCreateDialog from '../components/EventCreateDialog';
import Event from '../components/Event';
import LoadingContext from '../context/loadingContext';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
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
  const { setIsLoading } = useContext(LoadingContext);
  const GET_EVENTS = gql`
    query eventLis{
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
  const { data, loading, error } = useQuery(GET_EVENTS);
  if (loading) {
    setIsLoading(true);
  }
  if (data) {
    setIsLoading(false);
  }
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;
  const getEvents = async () => {

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
            />
            <CardContent>
              <Typography className={classes.title} variant="h6" color="primary" gutterBottom>
                Create event whatever you want!
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        {data?.getEvents.map(event =>
          (<Event id={event._id} title={event.title} description={event.description} price={event.price} date={event.date} creator={event.creator} />)
        )}
      </Container>
      <EventCreateDialog handleClose={handleDialogClose} open={open} getEvents={getEvents} />
    </div>
  );
}
export default EventPage;