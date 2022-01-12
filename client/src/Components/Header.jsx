import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import { UserContext } from "../Context/UserContext"
import ImageBg from "../Assets/images/header-bg.jpg"
import { Link } from 'react-router-dom';
import useStyles from '../Styles/ThemeStyle';
// ------------------------------------------------------

const post = {
     title: 'Fundraising for the people',
     description:
       "“ Never underestimate the difference you can make in the lives of others. Step forward, reach out, and help. Reach out to someone that might need a lift. ” — Pablo",
     image: ImageBg,
     imgText: 'main image description',
     linkText: 'Continue reading…',
};

export default function Header() {
  const classes = useStyles();
  const { infos:{ isAuth }} = useContext(UserContext)
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
                  <Button variant="contained" color="primary">          
                    <Link to="/add-fundraiser" className={classes.linkPrimary}> Start a new fundraising </Link>
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