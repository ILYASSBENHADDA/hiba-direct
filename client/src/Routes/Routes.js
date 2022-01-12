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
import AddCategory from '../Pages/admin/AddCategory'
import Payment from '../Pages/admin/Payment'
import Users from '../Pages/admin/Users'
// Protected Routes
import { AuthRouter, AdminRouter, UserRouter } from './ProtectedRoutes'
// Context Api 
import { UserContext } from "../Context/UserContext"
import Fundraisers from '../Pages/admin/Fundraisers'



function Routes() {
     const { infos: {isAuth, role} } = useContext(UserContext)

     return (
          <>
          
               <Switch>

                    {/* Global Routes */}
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/post/:id" component={Single}/>
                    <Route exact path="/logout" component={Logout}/>
                    
                    {/* Authentication */}
                    <Route exact path="/sign-up" component={SignUp} />
                    <AuthRouter exact path="/sign-in" component={SignIn} isAuth={isAuth} role={role}/>

                    {/* Admin & User Routes */}
                    <AdminRouter exact path="/dashboard" isAuth={isAuth} role={role} component={Dashboard}/>
                    <AdminRouter exact path="/add-fundraiser" component={AddFundraiser} isAuth={isAuth} role={role}/>
                    {/* <AdminRouter exact path="/review/:id" component={DetailsInfo} isAuth={isAuth} role={role}/> */}
                    <Route exact path="/review/:id" component={DetailsInfo} />

                    <AdminRouter exact path="/fundraisers" component={Fundraisers} isAuth={isAuth} role={role}/>
                    <AdminRouter exact path="/payments" component={Payment} isAuth={isAuth} role={role}/>
                    <AdminRouter exact path="/add-city" component={AddCity} isAuth={isAuth} role={role}/>
                    <AdminRouter exact path="/add-category" component={AddCategory} isAuth={isAuth} role={role}/>
                    <AdminRouter exact path="/users" component={Users} isAuth={isAuth} role={role}/>

               
                    <Route exact path="/404" component={NotFound}/>
                    <Redirect to="/404" />
               </Switch>

          </>
     )
}

export default Routes