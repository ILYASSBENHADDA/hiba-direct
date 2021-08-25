import React from 'react'
import { Route, Redirect } from 'react-router-dom'


const AuthRouter = ({component:Component, isAuth, ...rest}) => {
     return (
          <Route
               {...rest}
               render={() => !isAuth ? <Component/> : <Redirect to='/' />}
          />
     )
}


const AdminRouter = ({component:Component, isAuth, role, ...rest}) => {
     return (
          <Route
               {...rest}
               render={() => {
                    if(isAuth && role === "Admin") {
                         return <Component/>
                    } 
                    else {
                         return <Redirect to='/sign-in'/>
                    }
                    // (isAuth && role === 'Admin')  
                    // ? <Component/> : <Redirect to="/sign-in" /> 

                    // return ( isAuth ? <Component/> : <Redirect to='/login' /> )
               }}
          />
     )
}


const UserRouter = ({ component:Component, isAuth, role, ...rest }) => {
     return (
          <Route
               {...rest}
               render={() => {
                    if(isAuth && role === 'User') {
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