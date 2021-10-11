import React, { useState, useEffect } from 'react';
import { Grid, TextField, Button, Snackbar, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import Title from '../dashboard/Title';
import useStyles from '../../Styles/ThemeStyle';
import api from '../../Api/api';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

function Alert(props) {
     return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function AddFundraisingFrom() {
     const classes = useStyles();

     const [open, setOpen] = useState(false);
     const [openBackDrop, setOpenBackDrop] = useState(false);
     const [msg, setMsg] = useState('');
     const [accepted, setAccepted] = useState(false);
     const [city, setCity] = useState([]);
     const [category, setCategory] = useState([]);
     const [fundraiser, setFundraiser] = useState({
          city: '',
          category: '',
          amount: '',
          title: '',
          description: '', 
          image: ''
     })

     // Get City
     useEffect(() => {
          api.get('get-city')
          .then(resp => 
               setCity(resp.data)
          )
          .catch((error) => alert(error))
     }, [])

     // Get Category
     useEffect(() => {
          api.get('get-category')
          .then(resp => 
               setCategory(resp.data)
          )
          .catch((error) => alert(error))
     }, [])


     // Handle Change
     const handleChange = (name) => (e) => {
          const value = name === 'image' ? e.target.files[0] : e.target.value;
          setFundraiser({ ...fundraiser, [name]: value });
     };


     // On Submit
     const onSubmit = (e) => {
          e.preventDefault()

          const data = new FormData();
          data.append("city", fundraiser.city);
          data.append("category", fundraiser.category);
          data.append("amount", fundraiser.amount);
          data.append("title", fundraiser.title);
          data.append("description", fundraiser.description);
          data.append("image", fundraiser.image);

          api.post('create-fundraiser', data)
          .then(resp => {
               if(!resp.data.accepted) {
                    handleCloseBackDrop()
                    setMsg(resp.data.msg)
                    setOpen(true)
               }
               if(resp.data.accepted) {
                    handleCloseBackDrop()
                    setAccepted(true)
                    setMsg(resp.data.msg)
                    setOpen(true)
                    setTimeout(() => {
                         window.location.href = '/dashboard'
                    }, 1500);
               }
          })
          .catch((error) => alert(error))
     }

     // Alert 
     const handleClose = (event, reason) => {
          if (reason === 'clickaway') {
               return;
          }
          setOpen(false);
     };

     // Backdrop
     const handleCloseBackDrop = () => {
          setOpenBackDrop(false);
     };

     const handleToggleBackDrop = () => {
          setOpenBackDrop(!open);
     };


     return (
     <>
          <Title>Recent Deposits</Title>
          <form onSubmit={onSubmit}>
          <Grid container spacing={2}>
               
               {/* City */}
               <Grid item xs={12}>
                    <FormControl variant="outlined" style={{width: '100%'}}>
                         <InputLabel id="city-label">City</InputLabel>
                         <Select
                              labelId="city-label"
                              fullWidth
                              value={fundraiser.city}
                              onChange={handleChange('city')}
                              label='City'
                              name='city'
                         >
                              {city.map((item, key) => (
                              <MenuItem key={key} value={item._id}>
                                   {item.name}
                              </MenuItem>
                              ))}
                         </Select>
                    </FormControl>
               </Grid>
               
               {/* Category */}
               <Grid item xs={12}>
                    <FormControl variant="outlined" style={{width: '100%'}}>
                         <InputLabel id="category-label">Category</InputLabel>
                         <Select
                              labelId="category-label"
                              fullWidth
                              value={fundraiser.category}
                              onChange={handleChange('category')}
                              label='Category'
                              name='category'
                         >
                              {category.map((item, key) => (
                              <MenuItem key={key} value={item._id}>
                                   {item.name}
                              </MenuItem>
                              ))}
                         </Select>
                    </FormControl>
               </Grid>

               {/* Amount */}
               <Grid item xs={12}>
                    <TextField
                         onChange={handleChange('amount')}
                         variant="outlined"
                         fullWidth
                         name="amount"
                         label="Amunt ($)"
                    />
               </Grid>

               {/* Image */}
               <Grid item xs={12}>
                    <TextField
                         variant="outlined"
                         fullWidth
                         type='file'
                         name='image'
                         onChange={handleChange('image')}
                    />
               </Grid>
               
               {/* Title */}
               <Grid item xs={12}>
                    <TextField
                         onChange={handleChange('title')}
                         variant="outlined"
                         fullWidth
                         name="title"
                         label="Title"
                    />
               </Grid>
               
               {/* Description */}
               <Grid item xs={12}>
                    <TextField
                         onChange={handleChange('description')}
                         variant="outlined"
                         fullWidth
                         name="description"
                         label="Description"
                         multiline
                         rows={5}
                    />
               </Grid>

               {/* Submit Button */}
               <Grid item xs={4}>
               <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="large"
                    className={classes.submit}
                    onClick={handleToggleBackDrop}
               >
               Create Fundraiser
               </Button>

               {/************************ A L E R T ******************************/}
               <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={accepted ? "success" : "warning"}>
                         {msg}
                    </Alert>
               </Snackbar>
               {/********************* B A C K D R O P ***************************/}
               <Backdrop className={classes.backdrop} open={openBackDrop}>
                         <CircularProgress color="inherit" />
                    </Backdrop>
               {/*****************************************************************/}
               </Grid>

          </Grid>
          </form>
         

     </>
     );
}