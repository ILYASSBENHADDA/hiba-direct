import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';
import Location from '@material-ui/icons/LocationOn';
import PostTime from '@material-ui/icons/WatchLater';
import Link from '@material-ui/core/Link';
import Navbar from '../Components/Navbar';
import api from '../Api/api';
import FooterContainer from '../Components/footer';
import Copyright from '../Components/Copyright';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));

// Generate Date format
function taskDate(dateMilli) {
  var d = (new Date(dateMilli) + '').split(' ');
  d[2] = d[2] + ',';

  return [d[0], d[1], d[2], d[3]].join(' ');
}

export default function Home() {
  const classes = useStyles();

  const [fundraiser, setFundraiser] = useState([])
  
  useEffect(() => {
    api.get('get-fundraiser')
    .then(resp => setFundraiser(resp.data))
    .catch((error) => alert(error))
  }, [])

  return (
    <>
      <Navbar />
      
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Album layout
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Something short and leading about the collection below—its contents, the creator, etc.
              Make it short and sweet, but not too short so folks don&apos;t simply skip over it
              entirely.
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justifyContent="center">
                <Grid item>
                  <Button variant="contained" color="primary">
                    Main call to action
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary">
                    Secondary action
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        {/* End hero unit */}
        
        <Container className={classes.cardGrid} maxWidth="md">
          {/* Cards */}
          <Grid container spacing={4}>
            {fundraiser.map((item, key) => (
              <Grid item key={key} xs={12} sm={6} md={4}>
                <Link href={`/post/${item._id}`} style={{ textDecoration: 'none' }}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={item.image}
                    title={item.title}
                  />
                  <CardContent className={classes.cardContent}>
                    {/* Title */}
                    <Typography gutterBottom variant="h6" component="h2">
                      {item.title}
                    </Typography>
                    {/* End Title */}

                    {/* Chip */}
                    <Box>
                      <Chip
                        style={{ marginRight: 5 }}
                        variant="outlined"
                        size="small"
                        icon={<Location />}
                        label={item.city_id.name}
                        color="primary"
                      />
                      <Chip
                        variant="outlined"
                        size="small"
                        icon={<PostTime />}
                        label={taskDate(item.publishDate)}
                        color="primary"
                      />
                    </Box>
                    {/* End Chip */}
                    
                    {/* Progess */}
                    <Box style={{marginTop: 15, marginBottom: 15}}>
                      <LinearProgress variant="determinate" value={50} />
                    </Box>
                    {/* End Progess */}
                    <Typography><span style={{fontWeight: 700, fontSize: 18}}>$300,000 raised</span> of $500,000</Typography>
                  </CardContent>
                </Card>
                </Link>
              </Grid>
              
            ))}
          </Grid>
          {/* End Cards */}
        </Container>
      </main>


      

      {/* Footer */}
      <FooterContainer />

      <Box pt={4} pb={4}>
        <Copyright />
      </Box>
      {/* End footer */}
    </>
  );
}