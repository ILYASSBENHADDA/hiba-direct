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
import PriceFormat from '../../Utils/PriceFormat';


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
            <TableCell>AMOUNT</TableCell>
            <TableCell>FUNDRAISER</TableCell>
            <TableCell>EMAIL</TableCell>
            <TableCell>DONOR</TableCell>
            <TableCell>DATE</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {payment.map((item, key) => (
            <TableRow key={key}>
              <TableCell>{PriceFormat(item.amount)}</TableCell>
              <TableCell><Link href={`/post/${item.fundraiser_id}`}><OpenLink fontSize='small'/>{' Review'}</Link></TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.donor_name}</TableCell>
              <TableCell component="th">{DateFormat(item.date)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}