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


export default function PaymentList() {

  const [payment, setPayment] = useState([])

  useEffect(() => {
    api.get('get-payment')
    .then(resp => setPayment(resp.data))
    .catch((error) => alert(error))
  }, [])

  return (
    <>
    <Title>Payment list</Title>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Is Logged In</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {payment === !null ? payment.map((item, key) => (
            <TableRow key={key}>
              <TableCell component="th">{item.date}</TableCell>
              <TableCell>{item.amount}</TableCell>
            </TableRow>
          )): 'Table is empty'}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}