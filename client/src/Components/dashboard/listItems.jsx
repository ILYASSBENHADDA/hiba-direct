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
import { UserContext } from "../../Context/UserContext"


export const MainListItems = () => {

  const { infos:{ role }} = useContext(UserContext)

  return (
  <div>
    <ListItem button onClick={() => window.location.href = "/dashboard"}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>

    <ListItem button onClick={() => window.location.href = "/add-fundraiser"}>
      <ListItemIcon>
        <PostAddIcon />
      </ListItemIcon>
      <ListItemText primary="Fundraisers" />
    </ListItem>
    {role !== 'Admin' ? null :
    <>
    <ListItem button onClick={() => window.location.href = "/users"}>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Users" />
    </ListItem>

    <ListItem button onClick={() => window.location.href = "/payments"}>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Payments" />
    </ListItem>
    </>}
  </div>
)
}

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Configirations</ListSubheader>
    <ListItem button onClick={() => window.location.href = "/add-category"}>
      <ListItemIcon>
        <CategoryIcon />
      </ListItemIcon>
      <ListItemText primary="Add category" />
    </ListItem>

    <ListItem button onClick={() => window.location.href = "/add-city"}>
      <ListItemIcon>
        <CityIcon />
      </ListItemIcon>
      <ListItemText primary="Add city" />
    </ListItem>
  </div>
);