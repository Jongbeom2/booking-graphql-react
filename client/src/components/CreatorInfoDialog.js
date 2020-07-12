import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
function CreatorInfoDialog(props) {
  const { open, handleClose, creator } = props;
  const [user, setUser] = useState('');
  useEffect(() => {
    getUser();
  },[]);
  const getUser = async () => {
    const requestBody = {
      query: `
        query{
          getUser(email:"${creator.email}"){
            _id
            email
            createdEvents{
              title
            }
            password
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
        throw new Error('Get user failed');
      }
      setUser(result.data.data.getUser)
    } catch (err) {
      alert('Get user failed');
      console.log(err);
    }
  }
  return (
    <div>
      <Dialog open={open} onClose={handleClose} >
        <DialogTitle>Creator Information</DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            Email : {user.email}
          </Typography >
          <Typography >
            Ceated Events : {user.createdEvents?.reduce((arg,ele)=>arg+ele.title+', ','')}
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