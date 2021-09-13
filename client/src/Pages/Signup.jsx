import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import useStyles from '../Styles/ThemeStyle';
import Navbar from '../Components/Navbar';
import api from '../Api/api';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import MuiAlert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';
import { Helmet } from 'react-helmet';

function Alert(props) {
     return <MuiAlert elevation={6} variant="filled" {...props} />
}


export default function SignUp() {
const classes = useStyles();
const [open, setOpen] = useState(false)
const [msg, setMsg] = useState('')


const initialValues = {
     first_name: '',
     last_name: '',
     email: '',
     password: '',
}

// Validation Schema
const validationSchema = Yup.object().shape({
     first_name: Yup.string().required("Required"),
     last_name: Yup.string().required("Required"),
     email: Yup.string().email('Please enter valid email').required("Required"),
     password: Yup.string().min(4, 'Password so short').required("Required")
})

// onSubmit
const onSubmit = (values, props) => {

     api.post('sign-up', values, { withCredentials: true })
     .then(resp => {
          setTimeout(()=> {
               props.resetForm()
               props.setSubmitting(false)
               setMsg(resp.data.message)
               setOpen(true)
          }, 1000)
     })
     .catch((error) => alert(error))
}

// Close handle Alert
const handleClose = (event, reason) => {
     if (reason === 'clickaway') {
          return;
     }
     setOpen(false);
};

return (
     <>
     {/* REACT HELMET */}
     <Helmet>
          <title>{'Sign Up - Hiba Direct'}</title>
     </Helmet>

     {/* NAVIGATION BAR */}
     <Navbar />
     <Container component="main" maxWidth="xs">
          <div className={classes.paper}>
               <Avatar className={classes.avatar}>
                    <ExitToAppIcon />
               </Avatar>
               <Typography component="h1" variant="h5">
                    Sign up
               </Typography>

               <div className={classes.form}>
               <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
               {(props) => (
                    <Form noValidate>
                         <Grid container spacing={2}>
                              <Grid item xs={12} sm={6}>
                                   <Field 
                                    as={TextField} 
                                    label='First Name' 
                                    name="first_name" 
                                    variant="outlined" 
                                    fullWidth 
                                    error={props.errors.first_name && props.touched.first_name}
                                    required
                                    helperText={<ErrorMessage name="first_name" />}
                                   />
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                   <Field 
                                    as={TextField} 
                                    label='Last Name' 
                                    name="last_name"
                                    variant="outlined" 
                                    fullWidth 
                                    error={props.errors.last_name && props.touched.last_name}
                                    required
                                    helperText={<ErrorMessage name="last_name" />}
                                   />
                              </Grid>
                              <Grid item xs={12}>
                                   <Field 
                                    as={TextField} 
                                    label='Email Address' 
                                    name="email" 
                                    variant="outlined" 
                                    fullWidth 
                                    error={props.errors.email && props.touched.email}
                                    required
                                    helperText={<ErrorMessage name="email" />}
                                   />
                              </Grid>
                              <Grid item xs={12}>
                                   <Field 
                                    as={TextField} 
                                    label='Password' 
                                    name="password" 
                                    type="password"
                                    variant="outlined" 
                                    fullWidth 
                                    error={props.errors.password && props.touched.password}
                                    required
                                    helperText={<ErrorMessage name="password" />}
                                   />
                              </Grid>
                         </Grid>

                         <Button
                              type="submit"
                              fullWidth
                              variant="contained"
                              color="primary"
                              size="large"
                              className={classes.submit}
                              disabled={props.isSubmitting}
                         >
                         {props.isSubmitting ? "Loading..." : "Sign Up"}
                         </Button>

                    </Form>
               )}
               </Formik>
               </div>


               <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
               <Alert onClose={handleClose} severity="success">
                    {msg}
               </Alert>
               </Snackbar>

               {/********************************/}
               {/* <form onSubmit={onSubmit} className={classes.form} noValidate>
                    <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                    <TextField
                         name="first_name"
                         variant="outlined"
                         fullWidth
                         label="First Name"
                         autoFocus
                         onChange={onChange}
                    />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                    <TextField
                         variant="outlined"
                         fullWidth
                         label="Last Name"
                         name="last_name"
                         onChange={onChange}
                    />
                    </Grid>

                    <Grid item xs={12}>
                    <TextField
                         variant="outlined"
                         fullWidth
                         label="Email Address"
                         name="email"
                         onChange={onChange}
                    />
                    </Grid>

                    <Grid item xs={12}>
                    <TextField
                         variant="outlined"
                         // required
                         fullWidth
                         name="password"
                         label="Password"
                         type="password"
                         onChange={onChange}
                    />
                    </Grid>

                    </Grid>
                    <Button
                         type="submit"
                         fullWidth
                         variant="contained"
                         color="primary"
                         size="large"
                         className={classes.submit}
                    >
                    Sign Up
                    </Button>
                    
                    <Grid container justifyContent="flex-end">
                    <Grid item>
                    <Link href="sign-in" variant="body2">
                         Already have an account? Sign in
                    </Link>
                    </Grid>
                    </Grid>
               </form> */}
          </div>
     </Container>
     </>
  );
}