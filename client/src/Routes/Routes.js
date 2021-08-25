import Dashboard from '../Pages/admin/Dashboard'
import React, { useContext } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import NotFound from '../Pages/404'
import Home from '../Pages/Home'
import Logout from '../Pages/Logout'
import SignIn from '../Pages/Signin'
import SignUp from '../Pages/Signup'
import AddFundraiser from '../Pages/admin/AddFundraiser'
import Single from '../Pages/Single'
import DetailsInfo from '../Pages/admin/DetailsInfo'
import AddCity from '../Pages/admin/AddCity'
// Protected Routes
import { AuthRouter, AdminRouter, UserRouter } from './ProtectedRoutes'
// Context Api 
import { UserContext } from "../Context/UserContext"
import AddCategory from '../Pages/admin/AddCategory'
import Payment from '../Pages/admin/Payment'




function Routes() {
     const { infos:{isAuth, role}} = useContext(UserContext)
     console.table({isAuth , role});

     return (
          <>
          
               <Switch>

                    {/* Global Routes */}
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/post/:id" component={Single}/>
                    <Route exact path="/logout" component={Logout}/>
                    
                    {/* Authentication */}
                    {/* <AuthRouter exact path="/sign-in" component={SignIn} isAuth={isAuth} />
                    <AuthRouter exact path="/sign-up" component={SignUp} isAuth={isAuth} /> */}
                    <Route exact path="/sign-up" component={SignUp}/>
                    <Route exact path="/sign-in" component={SignIn}/>

                    {/* Admin Routes */}
                    {/* <AdminRouter exact isAuth={isAuth} role={role} path="/dashboard" component={Dashboard}/>
                    <AdminRouter path="/add-fundraiser" component={AddFundraiser} isAuth={isAuth} role={role} />
                    <AdminRouter path="/review/:id" component={DetailsInfo} isAuth={isAuth} role={role} /> */}
                    <Route exact path="/dashboard" component={Dashboard}/>
                    <Route exact path="/add-fundraiser" component={AddFundraiser}/>
                    <Route exact path="/add-city" component={AddCity}/>
                    <Route exact path="/add-category" component={AddCategory}/>
                    <Route exact path="/get-payment" component={Payment}/>
                    <Route exact path="/review/:id" component={DetailsInfo}/>

               
                    <Route exact path="/404" component={NotFound}/>
                    <Redirect to="/404" />
               </Switch>

          </>
     )
}

export default Routes