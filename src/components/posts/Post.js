import React, { useEffect, useState } from 'react';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CircularProgress, CardActionArea, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import ReactPaginate from 'react-paginate';
// import Postcard from './Postcard'

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(0);
  const postsPerPage = 7;

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
  const indexOfLastPost = (currentPage + 1) * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  
  return (
    <>
      {loading ? (
        // Show loader while posts are loading
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Typography variant='h3'
            sx={{
              color: 'grey',
              textAlign: 'center',
              marginTop: '10px'
            }}>
            New Posts
          </Typography>
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
                      maxWidth: 350, // Set the fixed width for the card
                      height: '400px',
                      boxShadow: '0 3px 5px  grey',
                      margin: '16px', // Add margin for spacing
                    }}  >
                    <CardActionArea
                    >
                      <CardMedia component="img" height="280" image={post.imageUrl} alt="" />
                      <CardContent 
                      sx={{
                      background:'#f3f4f7'}}>
                        <Typography gutterBottom variant="h6" component="div">
                          {post.itemName}
                        </Typography>
                        <Typography variant="p" color="text.secondary">
                          {post.description}
                        </Typography>
                       
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}



            </Grid>
          </Box>
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
        </>
      )}
    </>
  )
}

export default Post
