// import axios from 'axios'
import React, { useEffect } from 'react'
import {Redirect} from 'react-router-dom'
import api from '../Api/api'


function Logout() {
     useEffect(()=> {
          api.get('logout').then(() => {
               console.log('You\'re Logged Out')
          })
     }, [])

     return (
          <>
               <Redirect to="/" />
          </>
     )
}


export default Logout