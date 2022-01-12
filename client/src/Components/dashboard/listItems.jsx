import React, {useContext} from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import CityIcon from '@material-ui/icons/LocationCity';
import CategoryIcon from '@material-ui/icons/LocalOffer';
import PostAddIcon from '@material-ui/icons/PostAdd';
import ListIcon from '@material-ui/icons/FormatListBulleted';
import { UserContext } from "../../Context/UserContext"
import { Link } from 'react-router-dom';
import useStyles from '../../Styles/ThemeStyle';
// -----------------------------------------------------------

export const MainListItems = () => {
  const classes = useStyles();
  const { infos:{ role }} = useContext(UserContext)

  return (
  <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <Link to="/dashboard" className={classes.linkSecondary}> 
        <ListItemText primary="Dashboard" /> 
      </Link>
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <PostAddIcon />
      </ListItemIcon>
      <Link to="/add-fundraiser" className={classes.linkSecondary}> 
        <ListItemText primary="Add Fundraiser" /> 
      </Link>
    </ListItem>
    {role !== 'admin' ? null :
    <>
    <ListItem button>
      <ListItemIcon>
        <ListIcon />
      </ListItemIcon>
      <Link to="/fundraisers" className={classes.linkSecondary}> 
        <ListItemText primary="Fundraisers" /> 
      </Link>
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <Link to="/users" className={classes.linkSecondary}> 
        <ListItemText primary="Users" /> 
      </Link>
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <Link to="/payments" className={classes.linkSecondary}> 
        <ListItemText primary="Payments" /> 
      </Link>
    </ListItem>
    </>}
  </div>
)
}

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Configirations</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <CategoryIcon />
      </ListItemIcon>
      <Link to="/add-category" style={{textDecoration: 'none', color: '#000'}}> 
        <ListItemText primary="Add category" /> 
      </Link>
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <CityIcon />
      </ListItemIcon>
      <Link to="/add-city" style={{textDecoration: 'none', color: '#000'}}> 
        <ListItemText primary="Add city" /> 
      </Link>
    </ListItem>
  </div>
);