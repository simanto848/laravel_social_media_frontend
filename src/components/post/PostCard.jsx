// components/posts/PostCard.jsx
import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  Link,
  Divider,
} from '@mui/material';
import LikeButton from './LikeButton';
import Comments from './Comments';
import ImageIcon from '@mui/icons-material/Image';

const renderContentWithHashtags = (content) => {
  const hashtagRegex = /(#\w+)/g;
  const parts = content.split(hashtagRegex);
  return parts.map((part, index) =>
    hashtagRegex.test(part) ? (
      <Link
        key={index}
        href={`/hashtag/${part.substring(1)}`}
        sx={{ color: '#1DA1F2', textDecoration: 'none' }}
      >
        {part}
      </Link>
    ) : (
      <span key={index}>{part}</span>
    )
  );
};

export default function PostCard({ post }) {
  return (
    <Card
      sx={{ mb: 2, bgcolor: 'transparent', color: 'white', border: 'none' }}
    >
      <CardContent sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', gap: 2, mb: 1 }}>
          <Avatar src={post.author.avatar} alt={post.author.username} />
          <Box sx={{ flex: 1 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography
                variant="subtitle1"
                color="grey.700"
                sx={{ fontWeight: 'bold' }}
              >
                {post.author.username}
              </Typography>
              <Typography variant="caption" color="grey.500">
                {new Date(post.createdAt).toLocaleDateString('en-US', {
                  day: 'numeric',
                  month: 'short',
                })}
                {' ago'}
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ mt: 0.5 }} color="grey.700">
              {renderContentWithHashtags(post.content)}
            </Typography>
            {post.image ? (
              <Box sx={{ mt: 2, borderRadius: 2, overflow: 'hidden' }}>
                <img
                  src={post.image}
                  alt="Post"
                  style={{
                    width: '100%',
                    maxHeight: 300,
                    objectFit: 'cover',
                    aspectRatio: '16/9',
                  }}
                />
              </Box>
            ) : (
              <Box
                sx={{
                  mt: 2,
                  bgcolor: '#2a2a2a',
                  borderRadius: 2,
                  height: 200,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid #444',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    background:
                      'radial-gradient(circle, rgba(255,255,255,0.1) 1%, transparent 1%)',
                    backgroundSize: '20px 20px',
                  }}
                />
                <ImageIcon sx={{ fontSize: 40, color: 'grey.500' }} />
              </Box>
            )}
          </Box>
        </Box>
      </CardContent>
      <Divider sx={{ bgcolor: 'grey.800' }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1 }}>
        <LikeButton likes={post.likes} liked={post.likedByUser} />
        <Typography
          variant="body2"
          sx={{ display: 'flex', alignItems: 'center', color: 'grey.400' }}
        >
          <span style={{ marginRight: 4 }}>💬</span> {post.comments.length}
        </Typography>
      </Box>
      <Comments comments={post.comments} />
    </Card>
  );
}
