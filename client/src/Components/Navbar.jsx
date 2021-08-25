import React, {useContext} from 'react';
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

import useStyles from '../Styles/ThemeStyle';
import { Button } from '@material-ui/core';
import { UserContext } from "../Context/UserContext"


export default function Navbar() {
     const classes = useStyles();
     const { infos:{isAuth, role}} = useContext(UserContext)


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
          <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
          <MenuItem onClick={handleMenuClose}><Link href='/sign-in'>MY</Link></MenuItem>
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
          <MenuItem>
          <IconButton aria-label="show 4 new mails" color="inherit">
               <Badge badgeContent={4} color="secondary">
               <MailIcon />
               </Badge>
          </IconButton>
          <p>Messages</p>
          </MenuItem>
          <MenuItem>
          <IconButton aria-label="show 11 new notifications" color="inherit">
               <Badge badgeContent={11} color="secondary">
               <NotificationsIcon />
               </Badge>
          </IconButton>
          <p>Notifications</p>
          </MenuItem>
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
                    Material-UI
               </Typography>

               {/* START SEARCH BAR */}
               <div className={classes.search}>
                    <div className={classes.searchIcon}>
                    <SearchIcon />
                    </div>
                    <InputBase
                    placeholder="Search…"
                    classes={{
                         root: classes.inputRoot,
                         input: classes.inputInput,
                    }} 
                    />
                    
               </div>
               {/* END SEARCH BAR */}

               <div className={classes.grow} />
               <div className={classes.sectionDesktop}>
                    <IconButton aria-label="show 4 new mails" color="inherit">
                         <Badge badgeContent={4} color="secondary">
                              <MailIcon />
                         </Badge>
                    </IconButton>
                    <IconButton aria-label="show 17 new notifications" color="inherit">
                         <Badge badgeContent={17} color="secondary">
                              <NotificationsIcon />
                         </Badge>
                    </IconButton>
                    <IconButton
                         edge="end"
                         aria-label="account of current user"
                         aria-controls={menuId}
                         aria-haspopup="true"
                         onClick={handleProfileMenuOpen}
                         color="inherit"
                    >
                         <AccountCircle />
                    </IconButton>

                    {/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
                    {/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
                    {/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
                    {/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
                    <Button color="inherit" onClick={() => window.location.href = "/dashboard"}>
                         {/* <Link href="/dashboard" color="inherit"> */}
                              Dashboard
                         {/* </Link> */}
                    </Button>
                    <Button color="inherit">
                         <Link href="/sign-in" color="inherit">
                              Sign in
                         </Link>
                    </Button>
                    <Button color="inherit">
                         <Link href="/sign-up" color="inherit">
                              Sign up
                         </Link>
                    </Button>
                    <Button color="inherit">
                         <Link href="#" color="inherit">
                              {role + ' Mode'}
                         </Link>
                    </Button>
                    {isAuth ? 
                    <Button color="inherit">
                         <Link href="/logout" color="inherit">
                              Logout
                         </Link>
                    </Button>
                    : null}
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