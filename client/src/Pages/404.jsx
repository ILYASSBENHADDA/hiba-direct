import React from 'react'
import {Redirect} from 'react-router-dom'

function NotFound() {
     return (
          <>
               {/* <h1>404 page not found!</h1> */}
               <Redirect to='/' />
          </>
     )
}

export default NotFound
