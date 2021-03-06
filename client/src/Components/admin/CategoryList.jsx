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
// --------------------------------------------------------------------


export default function CategoryList() {

  const [category, setCategory] = useState([])

  useEffect(() => {
    api.get('get-category')
    .then(resp => setCategory(resp.data))
    .catch((error) => alert(error))
  }, [category])

  // Static count for table
  let id = 1

  return (
    <>
    <Title>Category list</Title>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>CITY NAME</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {category.map((item, key) => (
            <TableRow key={key}>
              <TableCell component="th">{id++}</TableCell>
              <TableCell>{item.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}