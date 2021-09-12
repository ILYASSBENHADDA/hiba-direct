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
import DateFormat from '../../Utils/DateFormat';
import Tooltip from '@material-ui/core/Tooltip';


export default function ReqList() {

  const [fundraiser, setFundraiser] = useState([])

  useEffect(() => {
    api.get('get-fundraiser-null')
    .then(resp => setFundraiser(resp.data))
    .catch((error) => alert(error))
  }, [])


  const ValidReq = (id, confirmation) => {
    const alert = window.confirm(`Are you sure you want to valide`)
    if(alert) {
      api.post('confirm-fundraiser', {id, confirmation})
      .then(resp => console.log(resp.data))
      .catch((error) => alert(error))
    } 

  }

  const NotValidReq = (id, confirmation) => {
    const alert = window.confirm(`Are you sure you want to refuse`)
    if(alert) {
      api.post('confirm-fundraiser', {id, confirmation})
      .then(resp => console.log(resp.data))
      .catch((error) => alert(error))
    } 
  }

  return (
    <>
    <Title>Recent Orders</Title>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Date</TableCell>
            <TableCell align='center'>Confirm</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {fundraiser.map((item, key) => (
            <TableRow key={key}>
              <TableCell component="th">{item.user_id.first_name + ' ' + item.user_id.last_name}</TableCell>
              <TableCell><Link href={`/review/${item._id}`}>{item.title}</Link></TableCell>
              <TableCell>{item.city_id.name}</TableCell>
              <TableCell>{item.category_id.name}</TableCell>
              <TableCell>{DateFormat(item.publishDate)}</TableCell>
              <TableCell align='center'>
                {/* Validate */}
                <Tooltip title='Validate'>
                  <IconButton onClick={() => ValidReq(item._id, true)}>
                    <Valid />
                  </IconButton>
                </Tooltip>
                {/* Refuse */}
                <Tooltip title='Refuse'>
                  <IconButton onClick={() => NotValidReq(item._id, false)}>
                    <NotValid />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}