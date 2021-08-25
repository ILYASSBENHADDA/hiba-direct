import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { FormControl, InputLabel, OutlinedInput, InputAdornment } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import api from '../../Api/api';
import AddIcon from '@material-ui/icons/Add';


// Add city Pop-up
const AddCategotyForm = () => {
     const [open, setOpen] = useState(false);
     const [name, setName] = useState('');

     // On Submit
     const OnSubmit = token => {
          const body = {
               name
          };

          api.post('add-category', body)
          .then(response => {
               console.log("RESPONSE ", response);
          })
          .catch(error => console.log(error));
     };


     // Open Close Dialog
     const handleClickOpen = () => {
     setOpen(true);
     };

     const handleClose = () => {
     setOpen(false);
     };

  return (
    <>
      <Button
        style={{marginBottom: 20}}
        onClick={handleClickOpen}
     //    fullWidth
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
      >
      Add new category
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>{"Add new city"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
               Enter category
          </DialogContentText>
          
          <form onSubmit={OnSubmit}>
          {/* city input */}
          <FormControl fullWidth variant="outlined">
               <InputLabel htmlFor="category">category</InputLabel>
               <OutlinedInput
               onChange={(e) => setName(e.target.value)}
               autoFocus
               placeholder='Category'
               id="category"
               labelWidth={60}
               />
          </FormControl>

          <Button
               type='submit'
               style={{marginTop: 20, marginBottom: 15}}
               fullWidth
               variant="contained"
               color="primary"
               size="large"
          >
          ADD NEW
          </Button>
          {/* End Payment Form */}
          </form>

        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddCategotyForm