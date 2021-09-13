import Routers from "./Routes/Routes"
import { BrowserRouter as Router} from 'react-router-dom'
import { createTheme, ThemeProvider } from '@material-ui/core'
import { UserProvider } from "./Context/UserContext"
import { Helmet } from "react-helmet"
import favicon from "./Assets/images/favicon.png"


const theme = createTheme({
  palette: {
    primary: {
      main: '#549e39'
    },
    secondary: {
      main: '#ffffff'
    },
    typography: {
      fontFamily: 'Lato',
      // fontSize: 20
    }
  }
})

function App() {
  return (
    <>
    <Helmet>
      <link rel="icon" href={favicon} />
    </Helmet>
    <ThemeProvider theme={theme}>
      <UserProvider>
        <Router>
          <Routers />
        </Router>
      </UserProvider>
    </ThemeProvider>
    
    </>
  );
}

export default App;
