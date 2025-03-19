// components/posts/PostForm.jsx
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Avatar,
  TextareaAutosize,
  Button,
  IconButton,
  Box,
  Typography,
  Divider,
} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import MoodIcon from '@mui/icons-material/Mood';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CloseIcon from '@mui/icons-material/Close';

export default function PostForm() {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      console.log('New Post:', { content, image });
      setContent('');
      setImage(null);
      setIsSubmitting(false);
    }, 1500);
  };

  const handleImageUpload = () => {
    setImage('/placeholder.svg?height=400&width=600'); // Static image for demo
  };

  const removeImage = () => {
    setImage(null);
  };

  return (
    <Card sx={{ mb: 3, border: '1px solid #e0e0e0' }}>
      <form onSubmit={handleSubmit}>
        <CardContent sx={{ pt: 2, pb: 1 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Create a Post
          </Typography>
          <Divider sx={{ marginBottom: 2 }} />
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              alignItems: 'flex-start',
              mb: 1,
            }}
          >
            <Avatar src="/placeholder.svg?height=40&width=40" alt="User" />
            <Box sx={{ flex: 1 }}>
              <TextareaAutosize
                minRows={3}
                placeholder="What's on your mind?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                style={{
                  width: '100%',
                  border: 'none',
                  resize: 'none',
                  padding: 0,
                  fontSize: '1rem',
                  fontFamily: 'inherit',
                }}
              />
              {image && (
                <Box
                  sx={{
                    position: 'relative',
                    mt: 2,
                    borderRadius: 1,
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={image}
                    alt="Upload preview"
                    style={{
                      width: '100%',
                      maxHeight: 320,
                      objectFit: 'cover',
                    }}
                  />
                  <IconButton
                    onClick={removeImage}
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      bgcolor: 'rgba(0,0,0,0.5)',
                      color: 'white',
                    }}
                    size="small"
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>
              )}
            </Box>
          </Box>
        </CardContent>
        <CardActions
          sx={{
            borderTop: '1px solid #e0e0e0',
            pt: 1,
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="text"
              startIcon={<ImageIcon />}
              onClick={handleImageUpload}
            >
              Image
            </Button>
            <Button variant="text" startIcon={<MoodIcon />}>
              Feeling
            </Button>
            <Button variant="text" startIcon={<LocationOnIcon />}>
              Location
            </Button>
          </Box>
          <Button
            type="submit"
            variant="contained"
            disabled={(!content.trim() && !image) || isSubmitting}
          >
            {isSubmitting ? 'Posting...' : 'Post'}
          </Button>
        </CardActions>
      </form>
    </Card>
  );
}
