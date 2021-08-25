import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import AddIcon from '@material-ui/icons/Add';
import Chip from '@material-ui/core/Chip';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Navbar from '../Components/Navbar';
import Share from '../Components/Share';
import Donate from '../Components/Payment';
import Footer from '../Components/footer';
import Copyright from '../Components/Copyright';
import api from '../Api/api';
import ShareIcon from '@material-ui/icons/Share';
import { LinearProgress } from '@material-ui/core';
import Title from '../Components/dashboard/Title';


export default function Single() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const [fundraiser, setFundraiser] = useState([])
  const { id } = useParams()

  useEffect(() => {
    api.get(`get-fundraiser/${id}`)
    .then(resp => setFundraiser(resp.data))
    .catch((error) => alert(error))
  }, [id])

  return (
    <>
    <Navbar />
    {/* CONTENT */}
    <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            
            {/* Hedding */}
            <Grid item xs={12}>
              <Typography component="h1" variant="h4">
                {fundraiser.title}
              </Typography>
            </Grid>

            {/* Image */}
            <Grid item xs={12} md={8} lg={7}>
              <Paper className={fixedHeightPaper}>
                <img src={fundraiser.image} alt="" />
              </Paper>
            </Grid>

            {/* Fundraiser Info */}
            <Grid item xs={12} md={4} lg={5}>
              <Paper className={fixedHeightPaper}>

                <Box style={{padding: 10}}>
                {/* Amount & Progress */}
                <Typography color="textSecondary">
                  <span 
                  style={{fontWeight: 700, fontSize: 25, color: '#000'}}
                  >
                    $300,000  
                  </span>  
                    {' raised of $500,000 goal'}
                </Typography>

                <Box display="flex" alignItems="center">
                  <Box width="100%" mr={1}>
                    <LinearProgress variant="determinate" value={50} />
                  </Box>
                  <Box minWidth={35}>
                    <Typography variant="body2" color="textSecondary">
                      {'50%'}
                    </Typography>
                  </Box>
                </Box>
                {/* End Amount & Progress */}

                {/* Donors */}
                <Box style={{marginTop: 15, marginBottom: 15}}>
                  <Chip
                    variant="outlined"
                    icon={<PeopleOutlineIcon />}
                    label='100 Donors'
                    color="primary"
                  />
                </Box>
                {/* End Donors */}

                {/* Amount details */}
                <Box display="flex" alignItems="center" style={{marginTop: 25, marginBottom: 20, borderBottom: '1 solid #c8c8c8'}}>
                  <Box width="33%">
                    <Typography component="h1" variant="h6">$100,00</Typography>
                    Total amount
                  </Box>
                  <Box width="33%">
                    <Typography component="h1" variant="h6">$10,00</Typography>
                    Total raised
                  </Box>
                  <Box width="33%">
                    <Typography component="h1" variant="h6">$90,00</Typography>
                    Total rest
                  </Box>
                </Box>
                {/* End amount details */}

                {/* Buttons */}
                <Donate name={fundraiser.title} fundraiserId={fundraiser._id} />
                <Share link='https://ilyass.net'/>
                {/* End Buttons */}
                </Box>
              </Paper>
            </Grid>
            
            {/* Recent Orders */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Title>Details Fundraising:</Title>
                <Box>
                    <Typography>
                      Organisation:
                    </Typography>
                  <Chip
                    variant="outlined"
                    icon={<AccountCircleIcon />}
                    label='Ilyass Benhadda'
                    color="primary"
                  />
                </Box>
                <Box>
                    <Typography>
                      Description:
                    </Typography>
                    <Typography>
                      {fundraiser.description}
                    </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>

          {/* Footer */}
          <Footer />
          <Box pt={4}>
            <Copyright />
          </Box>
          {/* End Footer */}
        </Container>
      </main>
    </>
  );
}


const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    height: '100vh',
    // overflow: 'auto',
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