import React, { useContext } from 'react';
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
import { Helmet } from 'react-helmet';
// Context Api 
import { UserContext } from "../Context/UserContext"
import { useSnackbar } from 'notistack';
// ----------------------------------------------------------------------


export default function SignIn() {
     const { setInfos } = useContext(UserContext)
     const classes = useStyles()
     const { enqueueSnackbar } = useSnackbar();


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
               // console.log(resp)
               if(resp) {
                    setInfos(resp.data)
               }

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
                         enqueueSnackbar('Email or password incorrect, Please try again!', { variant: 'warning' })
                    }, 1000)
               }
          })
          .catch((error) => alert(error))
     }


     return (
          <>
          {/* REACT HELMET */}
          <Helmet>
               <title>{'Sign In - Hiba Direct'}</title>
          </Helmet>

          {/* NAVIGATION BAR */}
          <Navbar />

          {/* CONTENT */}
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

               </div>
          </Container>
          </>
     );
}