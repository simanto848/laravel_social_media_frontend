import { Box, Container, Typography } from '@mui/material';
import React from 'react';
import PostForm from '../../components/post/PostForm';
import PostCard from '../../components/post/PostCard';

export default function Posts() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <PostForm />
      {/* <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {staticPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </Box> */}
    </Container>
  );
}
