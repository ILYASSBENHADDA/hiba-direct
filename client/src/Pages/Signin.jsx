import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
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

function Alert(props) {
     return <MuiAlert elevation={6} variant="filled" {...props} />
}

export default function SignIn() {
const classes = useStyles()
const [open, setOpen] = useState(false)
const [msg, setMsg] = useState('')

const initialValues = {
     email: '',
     password: ''
}

// Validation Schema
const validationSchema = Yup.object().shape({
     email: Yup.string().email('Please enter valid email').required("Required"),
     password: Yup.string().min(4, 'Password so short').required("Required")
})

// onSubmit
const onSubmit = (values, props) => {

     api.post('sign-in', values, { withCredentials: true })
     .then(resp => {
          console.log(resp)
          if(resp.data.isAuth) {
               setTimeout(()=> {
                    props.resetForm()
                    props.setSubmitting(false)
                    window.location.href = '/'
               }, 1000)
          } else {
               setTimeout(()=> {
                    props.resetForm()
                    props.setSubmitting(false)
                    setMsg(resp.data.message)
                    setOpen(true)
               }, 1000)
          }
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
     <Navbar />
     <Container component="main" maxWidth="xs">
          <div className={classes.paper}>
               <Avatar className={classes.avatar}>
                    <ExitToAppIcon />
               </Avatar>
               <Typography component="h1" variant="h5">
                    Sign In
               </Typography>

               <div className={classes.form}>
               <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
               {(props) => (
                    <Form noValidate>
                         <Grid container spacing={2}>
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
                         {props.isSubmitting ? "Loading..." : "Sign In"}
                         </Button>

                    </Form>
               )}
               </Formik>
               </div>


               <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
               <Alert onClose={handleClose} severity="warning">
                    {msg}
               </Alert>
               </Snackbar>

               {/* -V 222222222222222222222222222222222222 */}

               {/* <form onSubmit={onSubmit} className={classes.form}>
                    <Grid container spacing={2}>

                    <Grid item xs={12}>
                    <TextField
                    required
                         variant="outlined"
                         fullWidth
                         label="Email Address"
                         name="email"
                         type="email"
                         autoFocus
                         onChange={onChange}
                    />
                    </Grid>

                    <Grid item xs={12}>
                    <TextField
                         variant="outlined"
                         required
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
                    Sign In
                    </Button>
                    
                    <Grid container justifyContent="flex-end">
                    <Grid item>
                    <Link href="/sign-up" variant="body2">
                         have not account? Sign Up
                    </Link>
                    </Grid>
                    </Grid>
               </form> */}
          </div>
     </Container>
     </>
  );
}