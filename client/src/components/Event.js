import React, { useState}  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CreatorInfoDialog from '../components/CreatorInfoDialog';
const useStyles = makeStyles(theme => ({
  card: {
    marginBottom: theme.spacing(2)
  },
}));

function Event(props) {
  const classes = useStyles();
  const {title, price, description, date, creator} = props;
  const [open, setOpen] = useState(false);
  const handleDialogOpen = () => {
    setOpen(true);
  };
  const handleDialogClose = () => {
    setOpen(false);
  };
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
        <Button color="primary"size="small">Book</Button>
        <Button color="primary"size="small" onClick = {handleDialogOpen}>Creator Info</Button>
      </CardActions>
    </Card>
    <CreatorInfoDialog handleClose={handleDialogClose} open={open} creator = {creator} />
    </div>
  );
}
export default Event;