import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { firestore, storage } from '../config/Firebasa'; // Import your Firebase configuration

const Addpost = () => {
  const [formData, setFormData] = useState({
    name: '',
    itemName: '',
    email: '',
    description: '',
  });
  const [file, setFile] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Upload the file to Firebase Storage (if a file is selected)
      let fileUrl = null;
      if (file) {
        const storageRef = storage.ref();
        const fileRef = storageRef.child(file.name);
        await fileRef.put(file);
        fileUrl = await fileRef.getDownloadURL();
      }

      // Add the form data and file URL to Firestore
      await firestore.collection('posts').add({
        ...formData,
        imageUrl: fileUrl, // Assuming you want to store an image URL
      });

      // Clear the form fields after successful submission
      setFormData({
        name: '',
        itemName: '',
        email: '',
        description: '',
      });
      setFile(null);

      // Optionally, display a success message to the user
      console.log('Post uploaded successfully!');
    } catch (error) {
      // Handle errors, e.g., display an error message to the user
      console.error('Error uploading post:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

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
      }}
    >
        <div
        style={{
          display: 'flex',
          flexDirection: 'row', // Change to column by default
          alignItems: 'center', // Center items by default
          width: '50%', // Take full width by default
        }}
        >

      <TextField
        sx={{
          '& > :not(style)': { width: '100%' },
          marginBottom: '16px',
          marginRight:'30px'
        }}
        id="outlined-basic"
        label="Name"
        variant="outlined"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        required
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
        value={formData.itemName}
        onChange={handleInputChange}
        required
        />
        </div>
        <div
        style={{
          display: 'flex',
          flexDirection: 'row', // Change to column by default
          alignItems: 'center', // Center items by default
          width: '50%', // Take full width by default
        }}
        >

      <TextField
        sx={{
          '& > :not(style)': { width: '100%' },
          marginBottom: '16px',
          marginRight:'30px'
        }}
        id="outlined-basic"
        label="Enter Email"
        variant="outlined"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        required
        />
      <TextField
        type="file"
        accept="image/jpg" // Set the accepted file types
        onChange={handleFileChange}
        sx={{
          '& > :not(style)': { width: '100%' },
          marginBottom: '16px',
        }}
        />
        </div>
      <TextField
        id="outlined-multiline-static"
        label="Description..."
        multiline
        rows={4}
        sx={{
          '& > :not(style)': {
            width: '100%',
            margin: '0 auto'
          },
          marginBottom: '16px',
          maxWidth:'400px'
        }}
        name="description"
        value={formData.description}
        onChange={handleInputChange}
        required
      />
      <Button
        variant="contained"
        startIcon={<CloudUploadIcon />}
        sx={{ fontWeight: 'bold' }}
        type="submit"
        onClick={handleFormSubmit}
      >
        Upload Post
      </Button>
    </Box>
  );
};

export default Addpost;
