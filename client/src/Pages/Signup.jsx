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



export default function SignUp() {
const classes = useStyles();

const [user, setUser] = useState({
     first_name: '',
     last_name: '',
     email: '',
     password: '',
})

// onChange
const onChange = (e) => {
     setUser({...user, [e.target.name]: e.target.value})
}

// onSubmit
const onSubmit = (e) => {
     e.preventDefault()
     api.post('sign-up', user)
     .then(resp => console.log(resp.data))
     .catch((error) => alert(error))
}

return (
     <>
     <Navbar />
     <Container component="main" maxWidth="xs">
          <div className={classes.paper}>
               <Avatar className={classes.avatar}>
                    <ExitToAppIcon />
               </Avatar>
               <Typography component="h1" variant="h5">
                    Sign up
               </Typography>
               <form onSubmit={onSubmit} className={classes.form} noValidate>
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
               </form>
          </div>
     </Container>
     </>
  );
}