import React, {useContext, useState, useEffect} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import useStyles from '../Styles/ThemeStyle';
import { Button } from '@material-ui/core';
import { UserContext } from "../Context/UserContext"
import api from '../Api/api';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

export default function Navbar() {
     const classes = useStyles();
     const { infos:{isAuth, role}} = useContext(UserContext)
     const [fundraiser, setFundraiser] = useState([])
     const [value, setValue] = useState('')

     useEffect(() => {
          api.get('get-fundraiser')
          .then(resp => setFundraiser(resp.data))
          .catch((error) => alert(error))
     }, [])


     const onSelect = (id) => {
          window.location.href = `/post/${id}`
     }


     const [anchorEl, setAnchorEl] = React.useState(null);
     const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

     const isMenuOpen = Boolean(anchorEl);
     const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

     const handleProfileMenuOpen = (event) => {
          setAnchorEl(event.currentTarget);
     };

     const handleMobileMenuClose = () => {
          setMobileMoreAnchorEl(null);
     };

     const handleMenuClose = () => {
          setAnchorEl(null);
          handleMobileMenuClose();
     };

     const handleMobileMenuOpen = (event) => {
          setMobileMoreAnchorEl(event.currentTarget);
     };

     const menuId = 'primary-search-account-menu';
     const renderMenu = (
     <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          id={menuId}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMenuOpen}
          onClose={handleMenuClose}
     >
          <MenuItem onClick={() => window.location.href = "/dashboard"}>Profile</MenuItem>
          <MenuItem onClick={() => window.location.href = "/dashboard"}>Your fundraisers</MenuItem>
          <MenuItem onClick={() => window.location.href = "/add-fundraiser"}>Start a new fundraiser</MenuItem>
          <MenuItem onClick={() => window.location.href = "/logout"}>Sign out</MenuItem>
     </Menu>
     );

     const mobileMenuId = 'primary-search-account-menu-mobile';
     const renderMobileMenu = (
     <Menu
          anchorEl={mobileMoreAnchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          id={mobileMenuId}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMobileMenuOpen}
          onClose={handleMobileMenuClose}
     >

          {/* item mobile */}
          <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton
               aria-label="account of current user"
               aria-controls="primary-search-account-menu"
               aria-haspopup="true"
               color="inherit"
          >
               <AccountCircle />
          </IconButton>
          <p>Profile</p>
          </MenuItem>

          {/* item mobile */}
          <MenuItem>
          <IconButton color="inherit">
               <ExitToAppIcon />
          </IconButton>
          <p>Sign out</p>
          </MenuItem>
     </Menu>
     );

     return (
     <div className={classes.grow}>
          <AppBar position="static">
          <Toolbar>
               <IconButton
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="open drawer"
               >
                    <MenuIcon />
               </IconButton>
               
               <Typography className={classes.title} variant="h6" noWrap>
                    HIBA DIRECT {value}
               </Typography>

               {/* START SEARCH BAR */}
               <div className={classes.search} style={{ width: 300 }}>
                    {/* <div className={classes.searchIcon}>
                         <SearchIcon />
                    </div> */}
                    <Autocomplete
                         style={{ color: "#ffffff" }}
                         options={fundraiser}
                         // autoHighlight
                         freeSolo
                         getOptionLabel={(option) => option.title}
                         renderOption={(option) => (
                              <>
                              <span onClick={() => onSelect(option._id)}>{option.title}</span>
                              </>
                         )}
                         renderInput={(params) => (
                              <TextField
                              {...params}
                              color="secondary"
                              style={{ color: "#ffffff" }}
                              size='small'
                              // color='secondary'
                              placeholder="Search.."
                              variant="outlined"
                              />
                         )}
                    />
               </div>
               {/* END SEARCH BAR */}

               <div className={classes.grow} />
               <div className={classes.sectionDesktop}>
                    
                    {/* item web */}
                    <Button 
                    color="inherit"
                    startIcon={<AccountCircle />}
                    endIcon={<ArrowDropDownIcon />}
                    onClick={handleProfileMenuOpen}
                    >
                         Profile
                    </Button>

                    {/* item web */}
                    <IconButton color="inherit">
                         <ExitToAppIcon />
                    </IconButton>

                    {/* item web */}
                    <Button 
                     color="inherit"
                     onClick={() => window.location.href = "/sign-up"}
                    >
                         Sign up
                    </Button>

                    {/* item web */}
                    <Button
                     onClick={() => window.location.href = "/sign-in"}
                     size="small"
                     variant="outlined"
                     color="primary"
                     style={{ background: "#ffffff", marginLeft: 10 }}
                    >
                         Sign in
                    </Button>

               </div>
               <div className={classes.sectionMobile}>
                    <IconButton
                         aria-label="show more"
                         aria-controls={mobileMenuId}
                         aria-haspopup="true"
                         onClick={handleMobileMenuOpen}
                         color="inherit"
                    >
                         <MoreIcon />
                    </IconButton>
               </div>
          </Toolbar>
          </AppBar>
          {renderMobileMenu}
          {renderMenu}
     </div>
     );
}