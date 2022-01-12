import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DateIcon from '@material-ui/icons/CalendarTodayTwoTone';
import CategoryIcon from '@material-ui/icons/LocalOffer';
import Navbar from '../Components/Navbar';
import Share from '../Components/Share';
import Donate from '../Components/Payment';
import Footer from '../Components/footer';
import Copyright from '../Components/Copyright';
import api from '../Api/api';
import { CardMedia, LinearProgress } from '@material-ui/core';
import Title from '../Components/dashboard/Title';
import DateFormat from '../Utils/DateFormat';
import pricePerCent from '../Utils/pricePerCent';
import PriceFormat from '../Utils/PriceFormat';
import {Helmet} from 'react-helmet';
// ------------------------------------------------------------------



export default function Single() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const [fundraiser, setFundraiser] = useState([])
  const { id } = useParams()

  const getData = async () => {
    try {
      const respence = await api.get(`get-fundraiser/${id}`)
      setFundraiser(respence.data)
      console.log(respence.data)
    } catch (error) {
      alert(error)
    }
    // .then(resp => setFundraiser(resp.data))
    // .catch((error) => alert(error))
  }
  useEffect(() => {
    getData()
  }, [])

  // ---------------
  

  // Total rest
  const totalRest = fundraiser.amount - fundraiser.paid

  return (
    <>
    {/* REACT HELMET */}
    <Helmet>
      <title>{fundraiser.title}</title>
    </Helmet>

    {/* NAVIGATION BAR */}
    <Navbar />
    
    {/* CONTENT */}
    <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            
            {/* Hedding */}
            <Grid item xs={12}>
              <Typography style={{fontWeight: 500}} component="h1" variant="h4">
                {fundraiser.title}
              </Typography>
            </Grid>

            {/* Image */}
            <Grid item xs={12} md={8} lg={7}>
              {/* <Paper className={fixedHeightPaper}>
                <img src={fundraiser.image} alt="" />
              </Paper> */}
              <CardMedia
                style={{
                  height: 0,
                  paddingTop: '54%',
                  borderRadius: 5,
                }}
                // className={classes.media}
                image={`/uploads/${fundraiser.image}`}
                title={fundraiser.title}
              />
            </Grid>

            {/* Donation Info */}
            <Grid item xs={12} md={4} lg={5} 
            // style={{position: 'relative'}}
            >
              <Paper className={fixedHeightPaper} 
              // style={{position: 'fixed'}}
              >

                <Box style={{padding: 10}}>
                {/* Amount & Progress */}
                <Typography color="textSecondary">
                  <span 
                  style={{fontWeight: 700, fontSize: 25, color: '#000'}}
                  >
                    {PriceFormat(fundraiser.paid)}
                  </span>  
                    {` raised of ${PriceFormat(fundraiser.amount)} goal`}
                </Typography>

                <Box display="flex" alignItems="center">
                  <Box width="100%" mr={1}>
                    <LinearProgress variant="determinate" value={pricePerCent(fundraiser.amount, fundraiser.paid)} />
                  </Box>
                  <Box minWidth={35}>
                    <Typography variant="body2" color="textSecondary">
                      {`%${pricePerCent(fundraiser.amount, fundraiser.paid)}`}
                    </Typography>
                  </Box>
                </Box>
                {/* End Amount & Progress */}

                {/* Donors */}
                <Box style={{marginTop: 15, marginBottom: 15}}>
                  <Chip
                    variant="outlined"
                    icon={<PeopleOutlineIcon />}
                    label={`${fundraiser.donors} Donors`}
                    color="primary"
                  />
                </Box>
                {/* End Donors */}

                {/* Amount details */}
                <Box className={classes.amountDetails}>
                  <Box width="33%" className="m1">
                    <Typography component="h1" variant="h6">{PriceFormat(fundraiser.amount)}</Typography>
                    Total amount
                  </Box>
                  <Box width="33%" className="m1">
                    <Typography component="h1" variant="h6">{PriceFormat(fundraiser.paid)}</Typography>
                    Total raised
                  </Box>
                  <Box width="33%" className="m1">
                    <Typography component="h1" variant="h6">{PriceFormat(totalRest)}</Typography>
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
            
            {/* Details Infos */}
            <Grid item xs={12} md={8} lg={7} style={{marginBottom: 30}}>
              <Paper className={classes.paper}>
                <Title>Details informations:</Title>
                <Box>
                  <Chip
                    variant="outlined"
                    icon={<AccountCircleIcon />}
                    label={fundraiser?.user_id?.first_name + " " + fundraiser?.user_id?.last_name}
                    color="primary"
                  />
                </Box>
                <Box style={{marginTop: 12, marginBottom: 12}}>
                  <Chip
                    style={{marginRight: 10}}
                    size='small'
                    variant="outlined"
                    icon={<DateIcon />}
                    label={DateFormat(fundraiser.publishDate)}
                    color="primary"
                  />
                </Box>
                <Box>
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
  amountDetails : {
    display: "flex",
    alignItems:"center",
    marginTop: 25, 
    marginBottom: 20, 
    borderBottom: '1 solid #c8c8c8',
  }
}));