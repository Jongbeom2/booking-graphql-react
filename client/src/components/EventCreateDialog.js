import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AuthContext from '../context/authContext';
import Loading from '../components/Loading';
import gql from 'graphql-tag';
import { useMutation, } from '@apollo/react-hooks';
function EventCreateDialog(props) {
  const { signOut} = useContext(AuthContext);
  const { open, handleClose, getEvents } = props;
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const CREATE_EVENT = gql`
    mutation createEvent($eventInput: EventInput){
      createEvent(eventInput: $eventInput){
        title
        description
        price
        date
      }
    }
  `
  const [createEvent, { loading }] = useMutation(CREATE_EVENT, {
    onCompleted: (data) => {
      alert('Create event Succeed');
      getEvents();
      console.log('Create event Succeed', data)
      handleClose();
    },
    onError: (error) => {
      if (error.graphQLErrors[0]?.message === 'Unauthenticatd!') {
        signOut();
        alert('Unauthenticatd');
        console.log('Unauthenticatd', error);
      }else{
        alert('Create event Failed');
        console.log('Create event Failed', error);
      }
    }
  });
  const handleCreate = () => {
    if (!title || !price || !date || !description) {
      alert('All Fileds Can\'t Be Empty');
      return;
    }
    createEvent({
      variables: { eventInput: { title, price, date, description } }
    })
  }
  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  }
  const handleChangePrice = (e) => {
    setPrice(parseFloat(e.target.value));
  }
  const handleChangeDate = (e) => {
    setDate(e.target.value);
  }
  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  }
  return (
    <div>
      {loading ? <Loading /> : null}
      <Dialog open={open} onClose={handleClose} >
        <DialogTitle>Create Event</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter information about event you want to create!
          </DialogContentText>
          <TextField autoFocus margin="dense" label="Title" fullWidth onChange={handleChangeTitle} />
          <TextField margin="dense" label="Price" fullWidth onChange={handleChangePrice} />
          <TextField margin="dense" label="Date" fullWidth onChange={handleChangeDate} />
          <TextField margin="dense" label="Description" fullWidth onChange={handleChangeDescription} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCreate} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default EventCreateDialog;