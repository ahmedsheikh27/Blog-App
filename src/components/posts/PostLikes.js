import React, { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { collection, addDoc, where, query, getDocs, updateDoc, doc } from 'firebase/firestore';
import { auth, firestore } from '../config/Firebasa';
import { useNavigate } from 'react-router-dom';
const PostLikes = ({ postId, initialLikes }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLikes);
const navigate = useNavigate()

useEffect(() => {
  // Check if the current user has already liked the post
  const checkIfLiked = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const likesRef = collection(firestore, 'likes');
        const q = query(likesRef, where('postId', '==', postId), where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        setIsLiked(!querySnapshot.empty);
      }
    } catch (error) {
      console.error('Error checking if liked:', error);
    }
  };

  checkIfLiked();
}, [postId]); // Add postId as a dependency

const handleLikeToggle = async () => {
  try {
    const user = auth.currentUser;

    if (!user) {
      // Handle the case where the user is not logged in
      // You can redirect them to the login page or show a message
      console.log('User not logged in');
      navigate('/SignIn')
      return;
    }

    const likesRef = collection(firestore, 'likes');
    const q = query(likesRef, where('postId', '==', postId), where('userId', '==', user.uid));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      // The user has not liked the post, add a new like
      await addDoc(likesRef, {
        postId: postId,
        userId: user.uid,
      });

      setIsLiked(true);
      setLikeCount((prevCount) => prevCount + 1);
    } else {
      // The user has already liked the post, remove the like
      const likeDoc = querySnapshot.docs[0];
      await updateDoc(doc(likesRef, likeDoc.id), { postId: null }); // Assuming postId is a field in your document

      setIsLiked(false);
      setLikeCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
    }
  } catch (error) {
    console.error('Error toggling like:', error);
  }
};

return (
  <>
  <IconButton
    color={isLiked ? 'error' : 'default'}
    onClick={handleLikeToggle}
    >
    <FavoriteIcon />
  </IconButton>
    <span>{likeCount} likes</span>
    </>
);
};  

export default PostLikes;
