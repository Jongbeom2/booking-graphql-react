import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
function CreatorInfoDialog(props) {
  const { open, handleClose, creator } = props;
  return (
    <div>
      <Dialog open={open} onClose={handleClose} >
        <DialogTitle>Creator Information</DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            Email : {creator.email}
          </Typography >
          <Typography >
            Ceated Events : {creator.createdEvents?.reduce((arg,ele)=>arg+ele.title+', ','')}
          </Typography >
        </DialogContent>
        <DialogActions >
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default CreatorInfoDialog