import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
const useStyles = makeStyles(theme => ({
  root: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '-webkit-fill-available',
    height: '-webkit-fill-available',
    background: 'black',
    opacity: '0.5',
  },
  icon:{
    position: 'absolute',
    top: '50%',
    left: '50%',
  }
}));
function Loading() {
  const classes = useStyles();
  return(
    <div className = {classes.root}>
      <CircularProgress className={classes.icon} />
    </div>
  )
}
export default Loading;