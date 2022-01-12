import { alpha, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
     /* Header styles */
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
     /* End Header styles */

     /* Start Signin & Signup forms */
     paper: {
          marginTop: theme.spacing(8),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
     },
     avatar: {
          margin: theme.spacing(1),
          backgroundColor: '#549e39',
     },
     form: {
          width: '100%', // Fix IE 11 issue.
          marginTop: theme.spacing(3),
     },
     submit: {
          margin: theme.spacing(3, 0, 2),
     },
     /* End Signin & Signup forms */


     /* Start Navbar */
     grow: {
          flexGrow: 1,
     },
     menuButton: {
          marginRight: theme.spacing(2),
     },
     title: {
          display: 'none',
          [theme.breakpoints.up('sm')]: {
               display: 'block',
          },
     },
     search: {
          position: 'relative',
          borderRadius: theme.shape.borderRadius,
          backgroundColor: alpha(theme.palette.common.white, 0.15),
          '&:hover': {
               backgroundColor: alpha(theme.palette.common.white, 0.25),
          },
          marginRight: theme.spacing(2),
          marginLeft: 0,
          width: '100%',
          [theme.breakpoints.up('sm')]: {
               marginLeft: theme.spacing(3),
               width: 'auto',
          },
     },
     searchIcon: {
          padding: theme.spacing(0, 2),
          height: '100%',
          position: 'absolute',
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
     },
     inputRoot: {
          color: 'inherit',
     },
     inputInput: {
          padding: theme.spacing(1, 1, 1, 0),
          // vertical padding + font size from searchIcon
          paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
          transition: theme.transitions.create('width'),
          width: '100%',
          [theme.breakpoints.up('md')]: {
               width: '20ch',
          },
     },
     sectionDesktop: {
          display: 'none',
          [theme.breakpoints.up('md')]: {
               display: 'flex',
          },
     },
     sectionMobile: {
          display: 'flex',
          [theme.breakpoints.up('md')]: {
               display: 'none',
          },
     },
     /* End Navbar */

     /* Link */
     linkPrimary: {
          color: '#fff',
          textDecoration: 'none',
     },
     linkSecondary: {
          color: '#000',
          textDecoration: 'none',
     },
     /* End Link */

     /* Dashboard Styles */
     root: {
          display: 'flex',
     },
     appBarSpacer: theme.mixins.toolbar,
     content: {
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
     },
     container: {
          paddingTop: theme.spacing(4),
          paddingBottom: theme.spacing(4),
     },
     paperDash: {
          padding: theme.spacing(2),
          display: 'flex',
          overflow: 'auto',
          flexDirection: 'column',
     },
     fixedHeight: {
          height: 240,
     },
     /* End Dashboard Styles */


     depositContext: {
          flex: 1,
     },
     margin: {
          margin: theme.spacing(1),
     },
     backdrop: {
          zIndex: theme.zIndex.drawer + 1,
          color: '#fff',
     },
}));

export default useStyles