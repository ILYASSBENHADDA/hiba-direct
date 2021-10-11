import React, {useEffect, useState} from 'react';
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
import DateFormat from '../Utils/DateFormat';
import PriceFormat from '../Utils/PriceFormat';
import coverImg from '../Assets/images/cover.png';
import pricePerCent from '../Utils/pricePerCent';
import Header from '../Components/Header';
import { Helmet } from 'react-helmet';
import CategoryIcon from '@material-ui/icons/LocalOffer';



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
    {/* REACT HELMET */}
    <Helmet>
      <title>{'Hiba Direct - Platform For Donations'}</title>
    </Helmet>
    
    {/* NAVIGATION BAR */}
    <Navbar />
    
      <main>
        {/* HEADER */}
        <Container maxWidth="lg">
          <main style={{marginTop: 30}}>
            <Header />
          </main>
        </Container>
                
        <Container className={classes.cardGrid} maxWidth="md">
          {/* CARDS */}
          <Grid container spacing={4}>
            {fundraiser.map((item, key) => (
              item.isFreezed ? null : <>
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
                        icon={<CategoryIcon />}
                        label={item.category_id.name}
                        color="primary"
                      />
                    </Box>
                    {/* End Chip */}
                    
                    {/* Progess */}
                    <Box style={{marginTop: 15, marginBottom: 15}}>
                      <LinearProgress variant="determinate" value={pricePerCent(item.amount, item.paid)} />
                    </Box>
                    {/* End Progess */}
                    <Typography><span style={{fontWeight: 700, fontSize: 18}}>{PriceFormat(item.paid)} raised</span> of {PriceFormat(item.amount)}</Typography>
                  </CardContent>
                </Card>
                </Link>
              </Grid>
              </>
              
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




const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
    backgroundImage: `url("${coverImg}")`,
    height: 360,
    backgroundSize: "cover",
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
