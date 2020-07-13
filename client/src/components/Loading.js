import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import LoadingContext from '../context/loadingContext';
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
  const { isLoading} = useContext(LoadingContext);
  const classes = useStyles();
  return(
    <div >
      {isLoading
      ?<div className = {classes.root}>
        <CircularProgress className={classes.icon} />
      </div>
      :null}
    </div>
  )
}
export default Loading;