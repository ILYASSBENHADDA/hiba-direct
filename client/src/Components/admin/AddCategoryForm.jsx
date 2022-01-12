import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { FormControl, TextField } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import api from '../../Api/api';
import AddIcon from '@material-ui/icons/Add';
import { useSnackbar } from 'notistack';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
// --------------------------------------------------------------------

// Add city Pop-up
const AddCategotyForm = () => {
    const [open, setOpen] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    const initialValues = {
      name: ''
    }

    // Validation Schema
    const validationSchema = Yup.object().shape({
      name: Yup.string().required("Required"),
    })

    // On Submit
    const onSubmit = (values, props) => {

      api.post('add-category', values)
      .then(() => {
          handleClose()
          enqueueSnackbar('New Category Added!', { variant: 'success' })
      })
      .catch(error => {
        console.log(error)
        enqueueSnackbar('Something wrong, Try again!', { variant: 'error' })
      });
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
        style={{marginBottom: 20}}
        onClick={handleClickOpen}
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
      >
      Add new category
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>{"Add new city"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
               Enter category
          </DialogContentText>
          
          {/* FORM */}
          <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
          {(props) => (
            <Form noValidate>
            {/* city input */}
            <FormControl fullWidth variant="outlined">
                <Field 
                as={TextField} 
                label='Category' 
                name="name" 
                variant="outlined" 
                fullWidth 
                error={props.errors.name && props.touched.name}
                required
                helperText={<ErrorMessage name="name" />}
                />
            </FormControl>

            <Button
                type='submit'
                style={{marginTop: 20, marginBottom: 15}}
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                disabled={props.isSubmitting}
            >
            {props.isSubmitting ? "Loading..." : "ADD NEW"}
            </Button>
            {/* End Payment Form */}
            </Form>
            )}
          </Formik>

        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddCategotyForm