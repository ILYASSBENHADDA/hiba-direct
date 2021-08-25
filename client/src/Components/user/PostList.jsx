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
import Chip from '@material-ui/core/Chip';


export default function PostList() {

  const [fundraiser, setFundraiser] = useState([])

  useEffect(() => {
    api.get('current-post')
    .then(resp => {
      setFundraiser(resp.data) 
      console.log(resp.data)
    })
    .catch((error) => alert(error))
  }, [])


  return (
    <>
    <Title>Recent Orders</Title>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Category</TableCell>
            <TableCell align='center'>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {fundraiser.map((item) => (
            <TableRow key={item.title}>
              <TableCell component="th" scope="row">{(item.publishDate).toLocaleString().split('T')[0]}</TableCell>
              <TableCell><Link href={`/review/${item._id}`}>{item.title}</Link></TableCell>
              <TableCell>{item.city_id.name}</TableCell>
              <TableCell>{item.category_id.name}</TableCell>
              <TableCell align='center'> 
                {item.isAccepted === null 
                ? 
                <Chip 
                  size="small" 
                  label="Panding.." 
                  style={{color: '#fff', background: '#ffc400'}}
                />
                : 
                (item.isAccepted === false ? <Chip size="small" label="Regected" style={{color: '#fff', background: '#e00000'}} /> : <Chip size="small" label="Approved" color='primary' /> )
                } 
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}