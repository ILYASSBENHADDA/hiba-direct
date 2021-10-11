import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from '../dashboard/Title';
import DateFormat from '../../Utils/DateFormat';

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits({title, number, link}) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>{title}</Title>
      <Typography component="p" variant="h4">
        {number}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        on {DateFormat(new Date())}
      </Typography>
      <div>
        <Link color="primary" href={link}>
          View Details
        </Link>
      </div>
    </React.Fragment>
  );
}