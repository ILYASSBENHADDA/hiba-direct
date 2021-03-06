import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import NavAndSideBar from '../../Components/dashboard/NavAndSideBar';
import AddFundraisingFrom from '../../Components/admin/AddFundraisingFrom';
import Copyright from '../../Components/Copyright';
import MuiAlert from '@material-ui/lab/Alert';
import { Helmet } from 'react-helmet';
import Title from '../../Components/dashboard/Title';


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export default function AddFundraiser() {
  const classes = useStyles();

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <>
    {/* REACT HELMET */}
    <Helmet>
      <title>{'Start a new fundraising - Hiba Direct'}</title>
    </Helmet>

    <div className={classes.root}>

      {/* HERE NAV & SIDE BAR */}
      <NavAndSideBar />

      {/* CONTENT */}
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>

          <Grid container spacing={3}>

          <Grid item xs={12}>
            {/* <Alert severity="info">Please make sure to complete the following field with the right information, because you can't modify this later.</Alert> */}
            <Title>Add a fundraising</Title>
          </Grid>

            {/* Chart */}
            <Grid item xs={12}>
              <Paper className={fixedHeightPaper}>
                    <AddFundraisingFrom />
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
  },
  fixedHeight: {
    height: 'auto',
  },
}));