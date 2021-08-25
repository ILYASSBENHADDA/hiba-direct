import { alpha, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
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


     depositContext: {
          flex: 1,
     },

     margin: {
          margin: theme.spacing(1),
     },
     
}));

export default useStyles