import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import Link from '@material-ui/core/Link';
import { Grid, TextField, Button, Snackbar, FormLabel } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import Title from '../dashboard/Title';
import useStyles from '../../Styles/ThemeStyle';
import api from '../../Api/api';

function Alert(props) {
     return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Review() {
     const classes = useStyles();

     const [open, setOpen] = useState(false);
     const [fundraiser, setFundraiser] = useState([])
     const { id } = useParams()

     useEffect(() => {
          api.get(`get-fundraiser/${id}`)
          .then(resp => {
               setFundraiser(resp.data)
               console.log(resp.data)
          })
          .catch((error) => alert(error))  
     }, [id])


     // On Submit
     const onSubmit = (e) => {
          e.preventDefault()

          api.post('create-fundraiser')
          .then(resp => console.log(resp))
          .catch((error) => alert(error))
     }

     
     // For Alert
     const handleClick = () => {
          setOpen(true);
     };

     const handleClose = (event, reason) => {
          if (reason === 'clickaway') {
               return;
          }
          setOpen(false);
     };



     return (
     <>
          <Title>Fundraising Details</Title>
          <form onSubmit={onSubmit}>
          <Grid container spacing={2}>
               
               <Grid item xs={12}>
                    <FormLabel>Username</FormLabel>
                    <TextField
                         variant="outlined"
                         fullWidth
                         // value={fundraiser.user_id.first_name}
                         // InputProps={{
                         //      readOnly: true,
                         // }}
                         // defaultValue='kkdndf'
                    />
               </Grid>

               <Grid item xs={12}>
                    <FormLabel>City</FormLabel>
                    <TextField
                         variant="outlined"
                         fullWidth
                         // value={fundraiser.city_id.name}
                         // InputProps={{
                         //      readOnly: true,
                         // }}
                         // defaultValue='kkdndf'
                    />
               </Grid>

               <Grid item xs={12}>
                    <FormLabel>Category</FormLabel>
                    <TextField
                         variant="outlined"
                         fullWidth
                         // value={fundraiser.category_id.name}
                    />
               </Grid>

               <Grid item xs={12}>
                    <FormLabel>Amount</FormLabel>
                    <TextField
                         variant="outlined"
                         fullWidth
                         value={fundraiser.amount}
                    />
               </Grid>

               <Grid item xs={12}>
                    <FormLabel>Image</FormLabel>
                    <div>
                         <img src={fundraiser.image} alt="" width='60%' />
                    </div>
               </Grid>

               <Grid item xs={12}>
                    <FormLabel>Title</FormLabel>
                    <TextField
                         variant="outlined"
                         fullWidth
                         value={fundraiser.title}
                    />
               </Grid>

               <Grid item xs={12}>
                    <FormLabel>Description</FormLabel>
                    <TextField
                         variant="outlined"
                         fullWidth
                         value={fundraiser.description}
                         multiline
                         rows={5}
                    />
               </Grid>

               <Grid item xs={4}>
               <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="large"
                    className={classes.submit}
                    onClick={handleClick}
               >
               Create Fundraiser
               </Button>
               {/* ******************************************************************** */}
               <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success">
                         The fundraiser created successfully, waiting for approving
                    </Alert>
               </Snackbar>
               {/* ******************************************************************** */}
               </Grid>


          </Grid>
          </form>
         
                         

     </>
     );
}