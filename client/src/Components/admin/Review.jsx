import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { Grid, TextField, Button, FormLabel, Box, CardMedia } from '@material-ui/core';
import Title from '../dashboard/Title';
import useStyles from '../../Styles/ThemeStyle';
import api from '../../Api/api';
import FreezeIcon from '@material-ui/icons/AcUnit';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import UpdateIcon from '@material-ui/icons/Update';
import CancelIcon from '@material-ui/icons/Cancel';
import { useSnackbar } from 'notistack';
const UploadPlacehoder = '/uploads/placeholder-image.png'
// -----------------------------------------------------------


export default function Review() {
     const classes = useStyles();
     const { enqueueSnackbar } = useSnackbar();
     const { id } = useParams()

     const [thumbnial, setThumbnial] = React.useState(null)
     const [content, setContent] = useState({
          image: '',
          title: '',
          description: ''
     })

     useEffect(() => {
          api.get(`get-fundraiser/${id}`)
          .then(resp => {
               setContent(resp.data)
          })
          .catch((error) => alert(error))  
     }, [id])

     // On Change
     const onChange = (name) => (e) => {
          const value = name === 'image' ? e.target.files[0] : e.target.value;
          setContent({ ...content, [name]: value });

          // Image preview upload
          if (name === 'image') {
               const reader = new FileReader();
               const img = e.target.files[0]
               reader.onload = () =>{
                    if(reader.readyState === 2){
                         setThumbnial(reader.result)
                    }
               }
               img ? reader.readAsDataURL(img) : setThumbnial(UploadPlacehoder)
          }
     }

     // Remove Preveiw Image
     const RemovePreviewImg = () => {
          setThumbnial(UploadPlacehoder)
          content.image = "placeholder.png"
     }

     // On Update
     const onUpdate = (e) => {
          e.preventDefault()

          const data = new FormData();
          data.append("image", content.image);
          data.append("title", content.title);
          data.append("description", content.description);
          
          api.post(`update-fundraiser/${id}`, data)
          .then(() => {
               enqueueSnackbar('Data is updated!', { variant: 'success' })
          })
          .catch((error) => alert(error))
     }

     // On Freeze
     const onFreeze = (id, boolean) => {

          const alert = window.confirm(`Are you sure you want to ${boolean ? 'defrost': 'freeze'} this fundraier?`)
          if(alert) {
               api.post('freeze-fundraiser', { id, boolean })
               .then((resp) => {
                    enqueueSnackbar(resp.data.msg, { variant: 'success' })
               })
               .catch((error) => alert(error))
          }
     }

     // On Delete
     const onDelete = (id) => {

          const alert = window.confirm(`Are you sure you want to delete this fundraising?`)
          if(alert) {
               api.post('delete-fundraiser', { id })
               .then(() => {
                    enqueueSnackbar("Item is deleted!", { variant: 'success' })
                    setTimeout(() => {
                         window.location.href = "/"
                    }, 1500);
               })
               .catch((error) => alert(error))
          } 
     }



     return (
     <>
          <Title>{content.title}</Title>
          <form>
          <Grid container spacing={2}>

               {/* IMAGE */}
               <Grid item xs={12}>
                    <FormLabel sx={{ mb: -2 }}>Image</FormLabel>
                    <label htmlFor="input">
                         <CardMedia
                              style={{
                                   height: 0,
                                   paddingTop: '30%',
                                   borderRadius: 10,
                                   width: 500,
                                   cursor: 'pointer',
                                   position: 'relative'
                              }}
                              image={thumbnial ? thumbnial : `/uploads/${content.image}`}
                         >
                              <CancelIcon 
                                   style={{color: "#549e39", position: 'absolute', top: 10, right: 10, fontSize: 30, display: thumbnial === UploadPlacehoder ? 'none' : 'block'}} 
                                   onClick={RemovePreviewImg} 
                              />
                         </CardMedia>
                    </label>
                    <input type="file" hidden accept="image/*" name="image" id="input" onChange={onChange("image")} />
               </Grid>

               <Grid item xs={12}>
                    <FormLabel>Amount</FormLabel>
                    <TextField
                         variant="outlined"
                         fullWidth
                         value={content.amount}
                    />
              </Grid>

               <Grid item xs={12}>
                    <FormLabel>Title</FormLabel>
                    <TextField
                         variant="outlined"
                         fullWidth
                         value={content.title}
                         name="title"
                         onChange={onChange("title")}
                    />
               </Grid>

               <Grid item xs={12}>
                    <FormLabel>Description</FormLabel>
                    <TextField
                         variant="outlined"
                         fullWidth
                         value={content.description}
                         multiline
                         rows={5}
                         name="description"
                         onChange={onChange("description")}
                    />
               </Grid>

               <Grid item xs={12}>

               {content.isAccepted === null ? null 
               : 
               (content.isAccepted === false ?
               null
               : 
               <>
               <Box display="flex" justifyContent="space-around" >
                    {/* Update Button */}
                    <Button
                         type="submit"
                         // fullWidth
                         variant="contained"
                         color="primary"
                         size="large"
                         className={classes.submit}
                         onClick={onUpdate}
                         startIcon={<UpdateIcon />}
                    >
                    Update Fundraiser
                    </Button>

                    {/* Stop button */}
                    <Button
                    style={{color: '#fff', background: '#2196f3'}}
                         // fullWidth
                         variant="contained"
                         size="large"
                         className={classes.submit}
                         onClick={() => onFreeze(content._id, content.isFreezed)}
                         startIcon={<FreezeIcon />}
                    >
                         {content.isFreezed ? 'Defrost fundraiser' : 'Freeze fundraiser'}
                    </Button>

                    {/* Delete button */}
                    <Button
                    style={{color: '#fff', background: '#e00000'}}
                         // fullWidth
                         variant="contained"
                         size="large"
                         className={classes.submit}
                         onClick={() => onDelete(content._id)}
                         startIcon={<DeleteIcon />}
                    >
                    Delete fundraiser
                    </Button>
               </Box>

               </> )}

               </Grid>


          </Grid>
          </form>
         
                         

     </>
     );
}