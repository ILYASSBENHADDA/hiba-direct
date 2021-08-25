import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import NavAndSideBar from '../../Components/dashboard/NavAndSideBar';
import CityList from '../../Components/admin/CityList';
import AddCityForm from '../../Components/admin/AddCityForm';
import Copyright from '../../Components/Copyright';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  }
}));

export default function AddCity() {
  const classes = useStyles();

  return (
    <div className={classes.root}>

      {/* HERE NAV & SIDE BAR */}
      <NavAndSideBar />

      {/* CONTENT */}
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          {/* End Add Fundraiser Button */}
          
          <AddCityForm />
          {/* End Add Fundraiser Button */}
          
          <Grid container spacing={3}>
            
            {/* Recent Orders */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <CityList />
              </Paper>
            </Grid>
          </Grid>

          {/* Copyright */}
          <Box pt={4}>
            <Copyright />
          </Box>
          {/* End Copyright */}
        </Container>
      </main>
      {/* END CONTENT */}

    </div>
  );
}