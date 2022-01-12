import React, { useState, useEffect } from 'react';
import { Grid, TextField, Button, FormControl, InputLabel, Select, MenuItem, CardMedia, FormLabel } from '@material-ui/core';
import useStyles from '../../Styles/ThemeStyle';
import api from '../../Api/api';
import CancelIcon from '@material-ui/icons/Cancel';
import { useSnackbar } from 'notistack';
const UploadPlacehoder = '/uploads/placeholder-image.png'
// ----------------------------------------------------------------------


export default function AddFundraisingFrom() {
     const classes = useStyles();
     const { enqueueSnackbar } = useSnackbar();

     const [thumbnial, setThumbnial] = useState(UploadPlacehoder)
     const [city, setCity] = useState([]);
     const [category, setCategory] = useState([]);
     const [content, setContent] = useState({
          city: '',
          category: '',
          amount: '',
          title: '',
          description: '',
          image: ''
     })

     // Get City
     useEffect(() => {
          api.get('get-city')
          .then(resp => 
               setCity(resp.data)
          )
          .catch((error) => alert(error))
     }, [])

     // Get Category
     useEffect(() => {
          api.get('get-category')
          .then(resp => 
               setCategory(resp.data)
          )
          .catch((error) => alert(error))
     }, [])


     // On Submit
     const onSubmit = (event) => {
          event.preventDefault();

          const data = new FormData();
          data.append("city", content.city);
          data.append("category", content.category);
          data.append("amount", content.amount);
          data.append("title", content.title);
          data.append("description", content.description);
          data.append("image", content.image);

          api.post('create-fundraiser', data)
          .then(response => {
               console.log(response)
               if (response.status === 200) {
                    EmptyForm();
                    enqueueSnackbar('New Fundraiser Added', { variant: 'success' });
               }
               else {
                    enqueueSnackbar('Please fill out all fields', { variant: 'warning' });
               }
               
          })
          .catch((error) => {
               console.log(error)
               enqueueSnackbar('Something wrong, Try again!', { variant: 'error' })
          })
     }

     // Empty Form
     const EmptyForm = () => {
          setContent({
               city: '',
               category: '',
               amount: '',
               title: '',
               description: '',
               image: ''
          });
          setThumbnial(UploadPlacehoder);
     }



     // On Change
     const handleChange = (name) => (e) => {
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
     };



     return (
     <>
          <form style={{marginTop: 5}} onSubmit={onSubmit} encType="multipart/form-data">
          <Grid container spacing={2}>

               {/* IMAGE */}
               <Grid item xs={12}>
               <FormLabel> Upload thumbnail </FormLabel>
                    <label htmlFor="input">
                         <CardMedia
                              style={{
                                   // height: 0,
                                   paddingTop: '30%',
                                   borderRadius: 10,
                                   width: 500,
                                   cursor: 'pointer',
                                   position: 'relative',
                                   marginTop: 8
                              }}
                              image={thumbnial}
                         >
                              <CancelIcon 
                                   style={{color: "#549e39", position: 'absolute', top: 10, right: 10, fontSize: 30, display: thumbnial === UploadPlacehoder ? 'none' : 'block'}} 
                                   onClick={()=> setThumbnial(UploadPlacehoder)} 
                              />
                         </CardMedia>
                    </label>
                    <input type="file" hidden accept="image/*" name="image" id="input" onChange={handleChange("image")} />
               </Grid>

               {/* City */}
               <Grid item xs={12}>
                    <FormControl variant="outlined" style={{width: '100%'}}>
                         <InputLabel id="city-label">City</InputLabel>
                         <Select
                              labelId="city-label"
                              fullWidth
                              value={content.city}
                              onChange={handleChange('city')}
                              label='City'
                              name='city'
                         >
                              {city.map((item, key) => (
                              <MenuItem key={key} value={item._id}>
                                   {item.name}
                              </MenuItem>
                              ))}
                         </Select>
                    </FormControl>
               </Grid>
               
               {/* Category */}
               <Grid item xs={12}>
                    <FormControl variant="outlined" style={{width: '100%'}}>
                         <InputLabel id="category-label">Category</InputLabel>
                         <Select
                              labelId="category-label"
                              fullWidth
                              value={content.category}
                              onChange={handleChange('category')}
                              label='Category'
                              name='category'
                         >
                              {category.map((item, key) => (
                              <MenuItem key={key} value={item._id}>
                                   {item.name}
                              </MenuItem>
                              ))}
                         </Select>
                    </FormControl>
               </Grid>

               {/* Amount */}
               <Grid item xs={12}>
                    <TextField
                         onChange={handleChange('amount')}
                         variant="outlined"
                         fullWidth
                         name="amount"
                         label="Amunt ($)"
                         type='number'
                         value={content.amount}
                    />
               </Grid>

               
               {/* Title */}
               <Grid item xs={12}>
                    <TextField
                         onChange={handleChange('title')}
                         variant="outlined"
                         fullWidth
                         name="title"
                         label="Title"
                         value={content.title}
                    />
               </Grid>
               
               {/* Description */}
               <Grid item xs={12}>
                    <TextField
                         onChange={handleChange('description')}
                         variant="outlined"
                         fullWidth
                         name="description"
                         label="Description"
                         multiline
                         rows={5}
                         value={content.description}
                    />
               </Grid>

               {/* Submit Button */}
               <Grid item xs={4}>
               <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="large"
                    className={classes.submit}
               >
               Create Fundraiser
               </Button>

               </Grid>

          </Grid>
          </form>
         

     </>
     );
}