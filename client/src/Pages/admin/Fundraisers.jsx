import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import NavAndSideBar from '../../Components/dashboard/NavAndSideBar';
import FundraisersList from '../../Components/admin/FundraisersList';
import Copyright from '../../Components/Copyright';
import { Helmet } from 'react-helmet';
// -------------------------------------------------------------------


export default function Fundraisers() {
  const classes = useStyles();

  return (
    <>
    {/* REACT HELMET */}
    <Helmet>
      <title>{'Fundraisers - Hiba Direct'}</title>
    </Helmet>

    <div className={classes.root}>
      {/* HERE NAV & SIDE BAR */}
      <NavAndSideBar />

      {/* CONTENT */}
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          
          <Grid container spacing={3}>            
            {/* Recent Fundraisers */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <FundraisersList />
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
  </>
  );
}


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