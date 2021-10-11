import { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Title from '../dashboard/Title';
import api from '../../Api/api';
import IconButton from '@material-ui/core/IconButton';
import NotValid from '@material-ui/icons/NotInterested';
import Valid from '@material-ui/icons/Check';
import OpenLink from '@material-ui/icons/OpenInNew';
import DateFormat from '../../Utils/DateFormat';


export default function UserList() {

  const [users, setUsers] = useState([])

  useEffect(() => {
    api.get('get-users')
    .then(resp => {
         console.log(resp)
     setUsers(resp.data)
    })
    .catch((error) => alert(error))
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