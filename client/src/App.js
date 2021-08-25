import Routers from "./Routes/Routes"
import { BrowserRouter as Router} from 'react-router-dom'
import { createTheme, ThemeProvider } from '@material-ui/core'
import { UserProvider } from "./Context/UserContext"


const theme = createTheme({
  palette: {
    primary: {
      main: '#549e39'
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
