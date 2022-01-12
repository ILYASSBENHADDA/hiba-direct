import React, { useContext, useEffect, useState } from 'react';
import clsx from 'clsx';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Statistics from '../../Components/admin/Statistics';
import ReqList from '../../Components/admin/ReqList';
import PostList from '../../Components/user/PostList';
import NavAndSideBar from '../../Components/dashboard/NavAndSideBar';
import AddIcon from '@material-ui/icons/Add';
import Copyright from '../../Components/Copyright';
import api from '../../Api/api';
import PriceFormat from '../../Utils/PriceFormat';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import useStyles from '../../Styles/ThemeStyle';
// Context Api 
import { UserContext } from "../../Context/UserContext"
// --------------------------------------------------------------------

export default function Dashboard() {
  const classes = useStyles();
  const [statistic, setStatistic] = useState('')
  const { infos:{ role }} = useContext(UserContext)

  const fixedHeightPaper = clsx(classes.paperDash, classes.fixedHeight);

  useEffect(() => {
    api.get('statistics').then(resp => {
      console.log(resp)
      setStatistic(resp.data)
    })
  }, [statistic])

  return (
    <>
    {/* REACT HELMET */}
    <Helmet>
      <title>{'Dashboard'}</title>
    </Helmet>
    
    <div className={classes.root}>
      {/* HERE NAV & SIDE BAR */}
      <NavAndSideBar />

      {/* CONTENT */}
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          {/* End Add Fundraiser Button */}
          <Button
            style={{marginBottom: 20}}
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<AddIcon />}
          >
            <Link to="/add-fundraiser" className={classes.linkPrimary}> Start a new fundraiser </Link>
          </Button>
          {/* End Add Fundraiser Button */}
          
          <Grid container spacing={3}>

            {role === 'admin' ?
            <>
            {/* Recent Statistics (ADMIN) */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <Statistics title={'Fundraiser Activated'} number={statistic.fundraiserApprovedCount} link={'/dashboard'}/>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <Statistics title={'Fundraiser Pending'} number={statistic.fundraiserPendingCount} link={'/dashboard'}/>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <Statistics title={'Total Users'} number={statistic.UsersCount} link={'/users'}/>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <Statistics title={'Total paid'} number={PriceFormat(statistic.PaidXCount)} link={'/payments'}/>
              </Paper>
            </Grid>
            
            {/* Recent Requists (AMDIN) */}
            <Grid item xs={12}>
              <Paper className={classes.paperDash}>
                <ReqList />              
              </Paper>
            </Grid>
            </>
            : 
            <>
            {/* Recent Post list (USER) */}
            <Grid item xs={12}>
              <Paper className={classes.paperDash}>
                <PostList />              
              </Paper>
            </Grid>
            </>
            }


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