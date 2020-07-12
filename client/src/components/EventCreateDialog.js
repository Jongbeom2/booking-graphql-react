import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
import AuthContext from '../context/authContext';
function EventCreateDialog(props) {
  const { token} = useContext(AuthContext);
  const { open, handleClose, getEvents } = props;
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const handleCreate = async () => {
    if(!title || !price || !date || !description){
      alert('Create event failed');
      return;
    }
    const requestBody = {
      query: `
        mutation{
          createEvent(eventInput:{
            title: "${title}"
            description: "${description}"
            price: ${+price}
            date: "${date}"
          }){
            _id
            title
            description
            price
            date
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
        throw new Error('Create event Failed');
      }
      alert('Create event Succeed');
      getEvents();
      handleClose();
    } catch (err) {
      alert('Create event Failed');
      console.log(err);
    }
  }
  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  }
  const handleChangePrice = (e) => {
    setPrice(e.target.value);
  }
  const handleChangeDate = (e) => {
    setDate(e.target.value);
  }
  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  }
  
  return (
    <div>
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