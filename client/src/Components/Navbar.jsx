import React, {useContext, useState, useEffect} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import useStyles from '../Styles/ThemeStyle';
import { Button } from '@material-ui/core';
import { UserContext } from "../Context/UserContext"
import api from '../Api/api';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DashboardIcon from '@material-ui/icons/Dashboard';
import logo from '../Assets/images/logo.png';
import { Link } from 'react-router-dom';
// -----------------------------------------------------------------


export default function Navbar() {
     const classes = useStyles();
     const { infos:{ role, isAuth }} = useContext(UserContext)
     const [fundraiser, setFundraiser] = useState([])

     useEffect(() => {
          api.get('get-fundraiser')
          .then(resp => setFundraiser(resp.data))
          .catch((error) => alert(error))
     }, [])


     const onSelect = (id) => {
          window.location.href = `/post/${id}`
     }


     const [anchorEl, setAnchorEl] = useState(null);
     const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

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
          <MenuItem> <Link to="/dashboard" className={classes.linkSecondary}> Dashboard </Link> </MenuItem>
          <MenuItem> <Link to="/add-fundraiser" className={classes.linkSecondary}> Start a new fundraiser </Link> </MenuItem>
          {role === 'admin' ? 
          <MenuItem> <Link to="/payments" className={classes.linkSecondary}> Payments </Link> </MenuItem>
          : null}
          <MenuItem> <Link to="/logout" className={classes.linkSecondary}> Logout </Link> </MenuItem>
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
          {isAuth ? 
          <>
          {/* item mobile */}
          <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton
               aria-label="account of current user"
               aria-controls="primary-search-account-menu"
               aria-haspopup="true"
               color="inherit"
          >
               <DashboardIcon />
          </IconButton>
          <p>Dashboard</p>
          </MenuItem>

          {/* item mobile */}
          <MenuItem>
               <IconButton color="inherit">
                    <ExitToAppIcon />
               </IconButton>
               <Link to="/logout" className={classes.linkSecondary}> Logout </Link>
          </MenuItem>

          </> : <>

          {/* item mobile */}
          <MenuItem>
               <Link to="/sign-up" className={classes.linkSecondary}> Sign up </Link>
          </MenuItem>

          {/* item mobile */}
          <MenuItem>
               <Link to="/sign-in" className={classes.linkSecondary}> Sign in </Link>
          </MenuItem>
          </>}
     </Menu>
     );

     return (
     <div className={classes.grow}>
          <AppBar position="static">
          <Toolbar>
               
               {/* LOGO */}
               <div style={{paddingTop: 2, cursor: 'pointer'}}>
                    <img src={logo} className="logo" alt="Logo" width="230px" onClick={() => window.location.href = "/"}/>
               </div>

               {/* START SEARCH BAR */}
               <div className={classes.search} style={{ width: 300 }}>
                    <div className={classes.searchIcon}>
                         <SearchIcon />
                    </div>
                    <Autocomplete
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
                              style={{ color: "#ffffff" }}
                              size='small'
                              placeholder="Search.."
                              variant="outlined"
                              />
                         )}
                    />
               </div>
               {/* END SEARCH BAR */}

               <div className={classes.grow} />
               <div className={classes.sectionDesktop}>
                    
                    {isAuth ? 
                    <>
                    {/* item web */}
                    <Button 
                    color="inherit"
                    startIcon={<DashboardIcon />}
                    endIcon={<ArrowDropDownIcon />}
                    onClick={handleProfileMenuOpen}
                    >
                         Dashboard
                    </Button>

                    {/* item web */}
                    <Button 
                    color="inherit"
                    startIcon={<ExitToAppIcon />}
                    >
                         <Link to="/logout" className={classes.linkPrimary}> Logout</Link>
                    </Button>

                    </> : <>

                    {/* item web */}
                    <Button color="inherit">
                         <Link to="/sign-up" className={classes.linkPrimary}> Sign up </Link>
                    </Button>

                    {/* item web */}
                    <Button
                     onClick={() => window.location.href = "/sign-in"}
                     variant="outlined"
                     color="primary"
                     style={{ background: "#ffffff", marginLeft: 10 }}
                    >
                         Sign in
                    </Button>
                    </>}

               </div>
               <div className={classes.sectionMobile}>
                    <IconButton
                         aria-label="show more"
                         aria-controls={mobileMenuId}
                         aria-haspopup="true"
                         onClick={handleMobileMenuOpen}
                         color="inherit"
                    >
                         <MenuIcon />
                    </IconButton>
               </div>
          </Toolbar>
          </AppBar>
          {renderMobileMenu}
          {renderMenu}
     </div>
     );
}