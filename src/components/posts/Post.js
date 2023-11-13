import React, { useEffect, useState } from 'react';
import { collection, getDocs, getFirestore, deleteDoc, doc } from 'firebase/firestore';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea, Typography, Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import ReactPaginate from 'react-paginate';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './Pagination.css'
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import {auth} from '../config/Firebasa'
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import Loader from '../loader/Loader'
const Post = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [deletePostId, setDeletePostId] = useState(null); // Track the post to be deleted
  const [openDialog, setOpenDialog] = useState(false);

  const handleDeleteClick = (postId) => {
    setDeletePostId(postId);
    setOpenDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (deletePostId) {
      try {
        setLoading(true)
        const db = getFirestore();
        const postRef = doc(db, 'posts', deletePostId);
        await deleteDoc(postRef);
        console.log('Post deleted successfully');
      } catch (error) {
        console.error('Error deleting post:', error);
      } finally {
        setOpenDialog(false);
        setDeletePostId(null);
        setLoading(false)
      }
    }
  };

  const handleDeleteCancel = () => {
    setOpenDialog(false);
    setDeletePostId(null);
  };



  const postsPerPage = 9;
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getFirestore();
        const usersRef = collection(db, 'posts');
        const querySnapshot = await getDocs(usersRef);
        const postsData = [];
        querySnapshot.forEach((doc) => {
          postsData.push({ id: doc.id, ...doc.data() });
        });
        setPosts(postsData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // Set loading to false when posts are fetched
      }
    };
    fetchData();

  }, []);

  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const indexOfLastPost = (currentPage + 1) * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const calculateTimeDifference = (timestamp) => {
    const now = new Date();
    const postDate = new Date(timestamp.seconds * 1000);
    const timeDifference = now - postDate;

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} ${days === 1 ? 'd' : 'd'} ago`;
    } else if (hours > 0) {
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else if (minutes > 0) {
      return `${minutes} ${minutes === 1 ? 'min' : 'min'} ago`;
    } else {
      return `${seconds} ${seconds === 1 ? 'sec' : 'sec'} ago`;
    }
  };

  return (
    <>
      {loading ? (
        // Show loader while posts are loading
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Box>
      ) : (
        <>

          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Grid container rowSpacing={1}
              sx={{
                m: 3,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {currentPosts.map((post, i) => (
                <Grid
                  key={i}
                >
                  <Card
                    style={{
                      maxWidth: 380, // Set the fixed width for the card
                      boxShadow: '0 3px 5px  grey',
                      margin: '16px', // Add margin for spacing
                    }}  >
                    <CardActionArea
                    >
                      {post.user && (
                        <Box sx={{
                          display: 'flex',
                          alignItems: 'center',
                          background: '#dee3e3',
                          padding: '5px'
                        }}>
                          <Avatar
                            src={post.user.photoURL}
                            alt={post.user.displayName}
                            sx={{
                              height: '30px',
                              width: '30px',
                              marginTop: '5px',
                              marginLeft: '5px',
                            }}
                          />
                          <Typography gutterBottom component="div" sx={{ marginLeft: '10px' }}>
                            {post.user.displayName}
                          </Typography>
                          {/* Display the timestamp below the user name */}
                          
                          <IconButton
                            aria-label="more"
                            aria-controls="post-menu"
                            aria-haspopup="true"
                            onClick={() => handleDeleteClick(post.id)} // Trigger delete dialog
                            sx={{ position: 'absolute', right: '10px' }}
                          >
                            <MoreVertIcon />
                          </IconButton>

                          {/* Menu for delete option */}
                          <Menu
                            id="post-menu"
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                          >
                            <MenuItem>Delete</MenuItem>
                          </Menu>

                   
                        </Box>

                      )}
                      <Dialog open={openDialog} onClose={handleDeleteCancel}>
                        <DialogTitle>Delete Post</DialogTitle>
                        <DialogContent>
                          <DialogContentText>
                            Are you sure you want to delete this post?
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleDeleteCancel}>Cancel</Button>
                          <Button onClick={handleDeleteConfirm} color="error">
                            Delete
                          </Button>
                        </DialogActions>
                      </Dialog>
                      <Box 
                       sx={{
                        background:'#dee3e3',
                        display:'flex',
                        justifyContent:'space-between'
                      }}>
                         <Typography variant="body2" color="text.secondary" 
                         sx={{marginLeft:'50px',
                         marginTop:'-15px'}}>
                          {calculateTimeDifference(post.timestamp)}
                        </Typography>
                          </Box>
                      <CardMedia component="img" height="280" image={post.imageUrl} alt=""
                        sx={{ width: '300px' }} />
                      <CardContent sx={{ background: '#dee3e3' }}>
                        <Typography gutterBottom variant="h6" component="div">
                          {post.itemName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {post.description}
                        </Typography>

                      </CardContent>
                      {/* <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton color="default" onClick={() => handleLikeToggle(post.id)}>
                          <FavoriteIcon color={isLiked? 'danger' : 'white'} />
                        </IconButton>
                        <Typography variant="body2">{post.likeCount} likes</Typography>
                      </Box> */}
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}



            </Grid>
          </Box>
          {posts.length > 0 && (
            <ReactPaginate
              previousLabel={'previous'}
              nextLabel={'next'}
              breakLabel={'...'}
              pageCount={Math.ceil(posts.length / postsPerPage)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageChange}
              containerClassName={'pagination'}
              activeClassName={'active'}
            />
          )}

        </>
      )}
    </>
  )
}

export default Post
