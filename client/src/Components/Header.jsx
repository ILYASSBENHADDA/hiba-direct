import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { Button } from '@material-ui/core';
import { UserContext } from "../Context/UserContext"
import ImageBg from "../Assets/images/header-bg.jpg"

const useStyles = makeStyles((theme) => ({
  mainFeaturedPost: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  mainFeaturedPostContent: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
  heroButtons: {
     marginTop: theme.spacing(4),
   },
}));


const post = {
     title: 'Fundraising for the people',
     description:
       "` Never underestimate the difference you can make in the lives of others. Step forward, reach out, and help. Reach out to someone that might need a lift. ` — Pablo",
     image: ImageBg,
     imgText: 'main image description',
     linkText: 'Continue reading…',
};

export default function Header() {
  const classes = useStyles();
  const { infos:{isAuth, role}} = useContext(UserContext)
  return (
    <Paper className={classes.mainFeaturedPost} style={{ backgroundImage: `url(${post.image})` }}>
      {/* Increase the priority of the hero background image */}
      {<img style={{ display: 'none' }} src={post.image} alt={post.imageText} />}
      <div className={classes.overlay} />
      <Grid container>
        <Grid item md={6}>
          <div className={classes.mainFeaturedPostContent}>
            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
              {post.title}
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              {post.description}
            </Typography>
            {/* <Link variant="subtitle1" href="#">
              {post.linkText}
            </Link> */}
            <div className={classes.heroButtons}>
              <Grid container spacing={2}>
                {isAuth ? 
                <Grid item>
                  <Button variant="contained" color="primary" onClick={() => window.location.href = "/add-fundraiser"}>
                    Start a new fundraising
                  </Button>
                </Grid>
                : <>
                <Grid item>
                  <Button variant="contained" color="primary" onClick={() => window.location.href = "/sign-up"}>
                    Sign up now
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary" style={{background: '#fff'}} onClick={() => window.location.href = "/sign-in"}>
                    Sign in
                  </Button>
                </Grid>
                </>}
              </Grid>
            </div>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
}

Header.propTypes = {
  post: PropTypes.object,
};






{/* Hero unit */}
        {/* <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
              Fundraising for the people
            </Typography>
            <Typography variant="h5" align="center" color="textPrimary" paragraph>
            &quot;Never underestimate the difference you can make in the lives of others. 
              Step forward, reach out, and help. Reach out to someone that might need a lift.&quot; — Pablo
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justifyContent="center">
                {isAuth ? 
                <Grid item>
                  <Button variant="contained" color="primary" onClick={() => window.location.href = "/add-fundraiser"}>
                    Start a new fundraising
                  </Button>
                </Grid>
                : <>
                <Grid item>
                  <Button variant="contained" color="primary" onClick={() => window.location.href = "/sign-up"}>
                    Sign up now
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary" onClick={() => window.location.href = "/sign-in"}>
                    Sign in
                  </Button>
                </Grid>
                </>}
              </Grid>
            </div>
          </Container>
        </div> */}