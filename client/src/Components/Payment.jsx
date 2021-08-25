import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { FormControl, InputLabel, OutlinedInput, InputAdornment } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import StripeCheckout from "react-stripe-checkout";
import api from '../Api/api';
import useStyles from '../Styles/ThemeStyle';

// Share Pop-up
const Payment = ({name, fundraiserId}) => {
     const classes = useStyles();
     const [open, setOpen] = useState(false);
     const [price, setPrice] = useState('');

     // On Submit
     const makePayment = token => {
          const body = {
               token,
               price,
               fundraiserId
          };
          // const headers = {
          //      "Content-Type": "application/json"
          // };

          // return fetch(`http://localhost:5000/api/payment`, {
          //      method: "POST",
          //      headers,
          //      body: JSON.stringify(body)
          // })
          //      .then(response => {
          //      console.log("RESPONSE ", response);
          //      const { status } = response;
          //      console.log("STATUS ", status);
          //      })
          //      .catch(error => console.log(error));

          api.post('payment', body)
          .then(response => {
               console.log("RESPONSE ", response);
          })
          .catch(error => console.log(error));
     };


     // Open Close Dialog
     const handleClickOpen = () => {
     setOpen(true);
     };

     const handleClose = () => {
     setOpen(false);
     };

  return (
    <>
      <Button
        style={{marginTop: 20, marginBottom: 15}}
        onClick={handleClickOpen}
        fullWidth
        variant="contained"
        color="primary"
        size="large"
     //    startIcon={<ShareIcon />}
      >
      DONATE
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>{"Your Donation Will Make A Difference"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
               Enter your donation
          </DialogContentText>
          
          <form>
          {/* Amount input */}
          <FormControl fullWidth className={classes.margin} variant="outlined">
               <InputLabel htmlFor="amount">Amount</InputLabel>
               <OutlinedInput
               onChange={(e) => setPrice(e.target.value)}
               type='number'
               autoFocus
               placeholder='10.00'
               id="amount"
               // value={values.amount}
               // onChange={handleChange('amount')}
               startAdornment={<InputAdornment position="start">$</InputAdornment>}
               labelWidth={60}
               />
          </FormControl>

          {/* Payment Form */}
          <StripeCheckout
               stripeKey={process.env.REACT_APP_KEY}
               token={makePayment}
               name={name}
               amount={price * 100}
               // shippingAddress
               // billingAddress
          >
               <Button
                    style={{marginTop: 20, marginBottom: 15}}
                    onClick={handleClose}
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="large"
               >
               DONATE NOW
               </Button>
          </StripeCheckout>
          {/* End Payment Form */}
          </form>

        </DialogContent>
      </Dialog>
    </>
  );
}

export default Payment