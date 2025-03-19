import { Box, Container, Typography } from '@mui/material';
import React from 'react';
import PostForm from '../../components/post/PostForm';
import PostCard from '../../components/post/PostCard';
import avtarPic from '../../assets/male_4.png';
import postPic from '../../assets/female_avatar_2.png';

// Static data (normally this would come from an API)
const staticPosts = [
  {
    id: 1,
    author: { username: 'john_doe', avatar: avtarPic },
    content: 'Having a great day at the beach! 🌊',
    image: postPic,
    createdAt: '2025-03-18T10:00:00Z',
    likes: 12,
    likedByUser: false,
    comments: [
      {
        id: 1,
        author: 'jane_smith',
        content: 'Looks amazing!',
        createdAt: '2025-03-18T10:05:00Z',
      },
      {
        id: 2,
        author: 'bob_jones',
        content: 'Wish I was there!',
        createdAt: '2025-03-18T10:10:00Z',
      },
    ],
  },
  {
    id: 2,
    author: { username: 'jane_smith', avatar: avtarPic },
    content: 'Just finished a new painting! 🎨',
    image: postPic,
    createdAt: '2025-03-18T12:00:00Z',
    likes: 8,
    likedByUser: true,
    comments: [
      {
        id: 3,
        author: 'john_doe',
        content: 'Beautiful work!',
        createdAt: '2025-03-18T12:05:00Z',
      },
    ],
  },
];

export default function Posts() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <PostForm />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {staticPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </Box>
    </Container>
  );
}
