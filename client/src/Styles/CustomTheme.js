import React from 'react'
import { createTheme, ThemeProvider } from '@material-ui/core'
// -----------------------------------------------------------

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

function CustomTheme({children}) {
     return (
          <ThemeProvider theme={theme}>
               {children}
          </ThemeProvider>
     )
}

export default CustomTheme
