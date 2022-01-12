import Routers from "./Routes/Routes"
import { BrowserRouter as Router} from 'react-router-dom'
import { UserProvider } from "./Context/UserContext"
import { Helmet } from "react-helmet"
import favicon from "./Assets/images/favicon.png"
import CustomTheme from "./Styles/CustomTheme"
import { SnackbarProvider } from 'notistack';
// -------------------------------------------------------------


function App() {
  return (
    <>
    <Helmet>
      <link rel="icon" href={favicon} />
    </Helmet>
    <CustomTheme>
      <UserProvider>
        <SnackbarProvider maxSnack={3}>
          <Router>
            <Routers />
          </Router>
        </SnackbarProvider>
      </UserProvider>
    </CustomTheme>
    
    </>
  );
}

export default App;
