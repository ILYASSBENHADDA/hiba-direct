// import axios from 'axios'
import React, { useEffect, useContext } from 'react'
import {Redirect} from 'react-router-dom'
import api from '../Api/api'
// Context Api 
import { UserContext } from "../Context/UserContext"
// ----------------------------------------------------------------------

function Logout() {
     const { setInfos } = useContext(UserContext)
     useEffect(()=> {
          api.get('logout')
          .then((response) => setInfos(response.data))
     }, [])

     return (
          <>
               <Redirect to="/" />
          </>
     )
}


export default Logout