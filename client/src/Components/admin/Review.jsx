import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { Grid, TextField, Button, Snackbar, FormLabel, Box, CardMedia } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import Title from '../dashboard/Title';
import useStyles from '../../Styles/ThemeStyle';
import api from '../../Api/api';
import FreezeIcon from '@material-ui/icons/AcUnit';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import UpdateIcon from '@material-ui/icons/Update';

function Alert(props) {
     return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Review() {
     const classes = useStyles();

     const [open, setOpen] = useState(false);
     const [msg, setMsg] = useState('');
     const [fundraiser, setFundraiser] = useState({
          title: '',
          description: ''
     })
     // const [newValue, setNewValue] = useState({
     //      amount: ''
     // })

     const { id } = useParams()

     useEffect(() => {
          api.get(`get-fundraiser/${id}`)
          .then(resp => {
               setFundraiser(resp.data)
               console.log(resp.data)
          })
          .catch((error) => alert(error))  
     }, [id])

     const onChange = (e) => {
          setFundraiser({...fundraiser, [e.target.name]: e.target.value})
     }

     // On Update
     const onUpdate = (e) => {
          e.preventDefault()

          api.post(`update-fundraiser/${id}`, fundraiser)
          .then((resp) => {
               setMsg(resp.data.msg)
               setOpen(true)
          })
          .catch((error) => alert(error))
     }

     // On Freeze
     const onFreeze = (id, boolean) => {

          const alert = window.confirm(`Are you sure you want to ${boolean ? 'defrost': 'freeze'} this fundraier?`)
          if(alert) {
               api.post('freeze-fundraiser', { id, boolean })
               .then((resp) => {
                    setMsg(resp.data.msg)
                    setOpen(true)
                    setTimeout(() => {
                         window.location.reload()
                    }, 1500);
               })
               .catch((error) => alert(error))
          }
     }

     // On Delete
     const onDelete = (id) => {

          const alert = window.confirm(`Are you sure you want to delete this fundraising?`)
          if(alert) {
               api.post('delete-fundraiser', { id })
               .then((resp) => {
                    setMsg(resp.data.msg)
                    setOpen(true)
                    setTimeout(() => {
                         window.location.href = "/dashboard"
                    }, 1500);
               })
               .catch((error) => alert(error))
          } 
     }

     // On Fix
     const onFix = (id) => {
          console.log(id)
          
     }

     const handleClose = (event, reason) => {
          if (reason === 'clickaway') {
               return;
          }
          setOpen(false);
     };



     return (
     <>
          {/* <Title><Link href={`/post/${fundraiser.id}`}> {fundraiser.title} <OpenLink fontSize='small'/> </Link></Title> */}
          <Title>{fundraiser.title}</Title>
          <form>
          <Grid container spacing={2}>

               <Grid item xs={12}>
                    <CardMedia
                    style={{
                         height: 0,
                         paddingTop: '30%',
                         borderRadius: 10,
                    }}
                    // className={classes.media}
                    image={fundraiser.image}
                    title={fundraiser.title}
                    />
               </Grid>
               
               {/* <Grid item xs={12}>
                    <FormLabel>Username</FormLabel>
                    <TextField
                         variant="outlined"
                         fullWidth
                         defaultValue='kkdndf'
                    />
               </Grid>

               <Grid item xs={12}>
                    <FormLabel>City</FormLabel>
                    <TextField
                         variant="outlined"
                         fullWidth
                         value={fundraiser.city_id.name}
                         InputProps={{
                              readOnly: true,
                         }}
                    />
               </Grid>

               <Grid item xs={12}>
                    <FormLabel>Category</FormLabel>
                    <TextField
                         variant="outlined"
                         fullWidth
                         value={fundraiser.category_id.name}
                    />
               </Grid> */}

               <Grid item xs={12}>
                    <FormLabel>Amount</FormLabel>
                    <TextField
                         variant="outlined"
                         fullWidth
                         value={fundraiser.amount}
                    />
              </Grid>

               <Grid item xs={12}>
                    <FormLabel>Title</FormLabel>
                    <TextField
                         variant="outlined"
                         fullWidth
                         value={fundraiser.title}
                         name="title"
                         onChange={onChange}
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
                         name="description"
                         onChange={onChange}
                    />
               </Grid>

               <Grid item xs={12}>

               {fundraiser.isAccepted === null ? null 
               : 
               (fundraiser.isAccepted === false ?
               <Button
                    type="submit"
                    // fullWidth
                    variant="contained"
                    color="primary"
                    size="large"
                    className={classes.submit}
                    onClick={onFix}
                    startIcon={<UpdateIcon />}
               >
               {'Fix & Resend'}
               </Button>
               : 
               <>
               <Box display="flex" justifyContent="space-around" >
                    {/* Update Button */}
                    <Button
                         type="submit"
                         // fullWidth
                         variant="contained"
                         color="primary"
                         size="large"
                         className={classes.submit}
                         onClick={onUpdate}
                         startIcon={<UpdateIcon />}
                    >
                    Update Fundraiser
                    </Button>

                    {/* Stop button */}
                    <Button
                    style={{color: '#fff', background: '#2196f3'}}
                         // fullWidth
                         variant="contained"
                         size="large"
                         className={classes.submit}
                         onClick={() => onFreeze(fundraiser._id, fundraiser.isFreezed)}
                         startIcon={<FreezeIcon />}
                    >
                         {fundraiser.isFreezed ? 'Defrost fundraiser' : 'Freeze fundraiser'}
                    </Button>

                    {/* Stop button */}
                    <Button
                    style={{color: '#fff', background: '#e00000'}}
                         // fullWidth
                         variant="contained"
                         size="large"
                         className={classes.submit}
                         onClick={() => onDelete(fundraiser._id)}
                         startIcon={<DeleteIcon />}
                    >
                    Delete fundraiser
                    </Button>
               </Box>

               </> )}


               {/* ******************************************************************** */}
               <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success">
                         {msg}
                    </Alert>
               </Snackbar>
               {/* ******************************************************************** */}
               </Grid>


          </Grid>
          </form>
         
                         

     </>
     );
}