import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage, auth } from '../config/Firebasa'


const Addpost = () => {
  const [state, setState] = useState({
    name: '',
    itemName: '',
    email: '',
    imageFile: null,
    description: '',
  });
  

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setState({ ...state, imageFile: file });
  };

  const uploadPost = async (e) => {
    e.preventDefault();
    const { email, name, imageFile, description, itemName } = state;
    if (!auth) {
      alert('You must logged in')
    } else {


      try {
        const db = getFirestore();
        const usersRef = collection(db, 'posts');

        // Upload the image file to Firebase Storage
        if (imageFile) {
          const imageRef = ref(storage, `images/${imageFile.name}`);
          await uploadBytes(imageRef, imageFile);
          const imageUrl = await getDownloadURL(imageRef);

          // Add the data including the image URL to Firestore
          await addDoc(usersRef, {
            name: name,
            email: email,
            description: description,
            imageUrl: imageUrl,
            itemName: itemName
          });

          console.log('Post Upload');
          console.log(state);
        } else {
          console.error('Please select an image.');
        }
      } catch (error) {
        console.error(error);
      }
    }
  }



  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '0 auto',
        padding: '16px',
        width: '500px'
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <TextField
          sx={{
            '& > :not(style)': { width: '100%' },
            marginBottom: '16px',
            marginRight: '30px',
          }}
          id="outlined-basic"
          label="Name"
          variant="outlined"
          name="name"
          required
          onChange={handleChange}
        />
        <TextField
          sx={{
            '& > :not(style)': { width: '100%' },
            marginBottom: '16px',
          }}
          id="outlined-basic"
          label="Item Name"
          variant="outlined"
          name="itemName"
          required
          onChange={handleChange}
        />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <TextField
          sx={{
            '& > :not(style)': { width: '100%' },
            marginBottom: '16px',
            marginRight: '30px',
          }}
          id="outlined-basic"
          label="Enter Email"
          variant="outlined"
          name="email"
          required
          onChange={handleChange}
        />
        <TextField
          type="file"
          accept="image/*" // Set the accepted file types
          sx={{
            '& > :not(style)': { width: '100%' },
            marginBottom: '16px',
          }}
          onChange={handleImageUpload}
        />
      </div>
      <TextField
        id="outlined-multiline-static"
        label="Description..."
        multiline
        rows={4}
        onChange={handleChange}
        sx={{
          '& > :not(style)': {
            width: '100%',
            margin: '0 auto',
          },
          marginBottom: '16px',
          maxWidth: '400px',
        }}
        name="description"
        required

      />
      <Button
        variant="contained"
        startIcon={<CloudUploadIcon />}
        sx={{ fontWeight: 'bold' }}
        type="submit"
        onClick={uploadPost}
      >
        Upload Post
      </Button>
      
    </Box>
  );
};

export default Addpost;
