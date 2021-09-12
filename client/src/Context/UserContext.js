// import axios from 'axios'
import React, { createContext, useState, useEffect } from 'react'
import api from '../Api/api'

// Set Up Context
export const UserContext = createContext(null)

export const UserProvider = ({ children }) => {

     // const [isAuth, setIsAuth] = useState(false)
     // const [role, setRole] = useState('')
     // const [userInfo, setUserInfo] = useState([])

     // useEffect(()=> {
     //      api.get('').then((response) => {
     //           console.log(response.data)
     //           setIsAuth(response.data.isAuth)
     //           setRole(response.data.role)
     //      })
     //      .catch(err => { console.log(err) })
     // }, [])

     const [infos, setInfos] = useState({ isAuth: false, role: '' });
     const getData = async () => {
          try {
               const { data } = await api.get('');
               if (data) {
                    console.log(data);
                    setInfos(data);
               }
          } catch (error) {
               console.log(error)
          }
     
     };
     useEffect(() => {
          getData();
     }, []);


     return (
          <>
               <UserContext.Provider value={{ infos }}>
                    {children}
               </UserContext.Provider>
          </>
     )
}