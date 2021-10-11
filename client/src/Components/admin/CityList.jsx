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


export default function CityList() {

  const [city, setCity] = useState([])

  useEffect(() => {
    api.get('get-city')
    .then(resp => setCity(resp.data))
    .catch((error) => alert(error))
  }, [])

  return (
    <>
    <Title>Cities list</Title>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>CITY NAME</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {city.map((item, key) => (
            <TableRow key={key}>
              <TableCell component="th">{item._id}</TableCell>
              <TableCell>{item.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}