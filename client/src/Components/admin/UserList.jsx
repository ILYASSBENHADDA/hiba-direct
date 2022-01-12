import { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Title from '../dashboard/Title';
import api from '../../Api/api';
// --------------------------------------------------------------


export default function UserList() {
  const [users, setUsers] = useState([])


  // Loop data
  const getData = async () => {
    try {
      const {data} = await api.get('get-users')
      setUsers(data)
      console.log(data)
    } 
    catch (error) {
      alert(error)
    }
  }
  useEffect(() => {
    getData()
  }, [])

  let x = 1
  return (
    <>
    <Title>Users list</Title>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>FIRST NAME</TableCell>
            <TableCell>LAST NAME</TableCell>
            <TableCell>EMAIL</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((item, key) => (
            <TableRow key={key}>
              <TableCell>{x++}</TableCell>
              <TableCell>{item.first_name}</TableCell>
              <TableCell>{item.last_name}</TableCell>
              <TableCell>{item.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}