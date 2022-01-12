import React from 'react'
import { Route, Redirect } from 'react-router-dom'


const AdminRouter = ({component:Component, isAuth, role, ...rest}) => {
     return (
          <Route
               {...rest}
               render={() => (
                    (isAuth)
                    ? <Component/> : <Redirect to="/" />  
               )}
          />
     )
}


const AuthRouter = ({component:Component, isAuth, role, ...rest}) => {
     return (
          <Route
               {...rest}
               render={() => 
                    
               {
                    if(!isAuth) {
                         return <Component/>
                    } else {
                         return (
                              <Redirect to='/' />
                         )
                    }
               }
                    
                    // (
                    // !isAuth ? <Component/> 
                    //         : (role === "admin" 
                    //           ? <Redirect to="/dashboard" />  
                    //             : ( role === "user"
                    //              ? <Redirect to="/technician" /> 
                    //              : <Redirect to="/profileUser" />)
                    // ))
               }

               // render={() => !isAuth ? <Component/> : <Redirect to='/' />}
          />
     )
}


const UserRouter = ({ component:Component, isAuth, role, ...rest }) => {
     return (
          <Route
               {...rest}
               render={() => {
                    if(isAuth && role === 'user') {
                         return <Component/>
                    } else {
                         return (
                              <Redirect to='/' />
                         )
                    }

                    // return ( isAuth ? <Component/> : <Redirect to='/login' /> )
               }}
          />
     )
}


export { AuthRouter, AdminRouter, UserRouter }