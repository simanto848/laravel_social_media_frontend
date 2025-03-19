// components/posts/Comments.jsx
import React from 'react';
import { Box, Typography, Divider } from '@mui/material';

export default function Comments({ comments }) {
  if (!comments || comments.length === 0) return null;

  return (
    <Box sx={{ px: 2, pb: 2 }}>
      <Divider sx={{ bgcolor: 'grey.800', mb: 1 }} />
      {comments.map((comment) => (
        <Box key={comment.id} sx={{ mt: 1 }}>
          <Typography
            variant="body2"
            sx={{ fontWeight: 'bold' }}
            color="grey.600"
          >
            {comment.author}
          </Typography>
          <Typography variant="body2" color="grey.500">
            {comment.content}
          </Typography>
          <Typography variant="caption" color="grey.500">
            {new Date(comment.createdAt).toLocaleString()}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
