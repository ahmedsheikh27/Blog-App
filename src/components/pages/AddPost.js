import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const Addpost = () => {

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
            marginBottom: '16px', // Add margin bottom for spacing
            marginRight: '50px',
          }}
          id="outlined-basic"
          label="Name"
          variant="outlined"
        />
        <TextField
          sx={{
            '& > :not(style)': { width: '100%' },
            marginBottom: '16px', // Add margin bottom for spacing
          }}
          id="outlined-basic"
          label="Item Name"
          variant="outlined"
        />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '50%', // Take full width by default
        }}
      >
        <TextField
          sx={{
            '& > :not(style)': { width: '100%' },
            marginBottom: '16px', // Add margin bottom for spacing
            marginRight: '50px',
          }}
          id="outlined-basic"
          label="Ente Email"
          variant="outlined"
        />
        <TextField
          sx={{
            '& > :not(style)': { width: '100%' },
            marginBottom: '16px', // Add margin bottom for spacing
          }}
          id="outlined-basic"
          type="file"
        />
      </div>
      <TextField
        id="outlined-multiline-static"
        label="Description..."
        multiline
        rows={4}
        sx={{
          '& > :not(style)': {
            width: '100%', // Take full width on larger screens
            margin: '0 auto', // Center the multiline field
          },
          marginBottom: '16px', // Add margin bottom for spacing
          width:'400px'
        }}
      />
        <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}
        sx={{fontWeight:'bold'}}
        >
        Upload Post
      </Button>
    </Box>
  );
}

export default Addpost;
