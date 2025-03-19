import React, { useState, useRef } from 'react';
import {
  Box,
  Paper,
  Avatar,
  TextField,
  Button,
  Divider,
  IconButton,
  Typography,
} from '@mui/material';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import VideocamIcon from '@mui/icons-material/Videocam';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import CloseIcon from '@mui/icons-material/Close';
import avatarImage from '../../assets/male_4.png';

export default function PostForm() {
  const [post, setPost] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);
  const mediaInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Post content:', post);
    console.log('Post media:', selectedMedia);
    setPost('');
    setSelectedMedia(null);
    setMediaPreview(null);
    setIsExpanded(false);
  };

  const handleMediaSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedMedia(file);
      setMediaPreview(URL.createObjectURL(file));
      setIsExpanded(true);
    }
  };

  const removeMedia = () => {
    setSelectedMedia(null);
    setMediaPreview(null);
    if (mediaInputRef.current) {
      mediaInputRef.current.value = '';
    }
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      sx={{
        p: 2,
        borderRadius: '8px',
        boxShadow: 1,
      }}
    >
      {/* Hidden file input */}
      <input
        type="file"
        accept="image/*,video/*"
        ref={mediaInputRef}
        style={{ display: 'none' }}
        onChange={handleMediaSelect}
      />

      <Box
        sx={{ display: 'flex', alignItems: 'center', mb: isExpanded ? 2 : 0 }}
      >
        <Avatar src={avatarImage} sx={{ mr: 1.5 }} />
        <TextField
          placeholder="What's on your mind?"
          fullWidth
          multiline={isExpanded}
          rows={isExpanded ? 3 : 1}
          value={post}
          onChange={(e) => setPost(e.target.value)}
          onFocus={() => setIsExpanded(true)}
          InputProps={{
            disableUnderline: true,
            sx: {
              bgcolor: '#f0f2f5',
              borderRadius: '20px',
              p: 1,
              pl: 2,
            },
          }}
          variant="standard"
        />
      </Box>

      {/* Media Preview */}
      {mediaPreview && (
        <Box sx={{ mt: 2, position: 'relative' }}>
          {selectedMedia.type.startsWith('image/') ? (
            <img
              src={mediaPreview}
              alt="Post media"
              style={{
                width: '100%',
                borderRadius: '8px',
                maxHeight: '300px',
                objectFit: 'contain',
              }}
            />
          ) : (
            <video
              src={mediaPreview}
              controls
              style={{
                width: '100%',
                borderRadius: '8px',
                maxHeight: '300px',
              }}
            />
          )}
          <IconButton
            aria-label="remove media"
            onClick={removeMedia}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              bgcolor: 'rgba(0,0,0,0.5)',
              color: 'white',
              '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      )}

      {isExpanded && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button
            type="submit"
            variant="contained"
            disabled={!post.trim() && !selectedMedia}
            sx={{
              bgcolor: '#1877f2',
              '&:hover': { bgcolor: '#166fe5' },
              borderRadius: '6px',
              textTransform: 'none',
              px: 3,
            }}
          >
            Post
          </Button>
        </Box>
      )}

      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
        <Button
          startIcon={<VideocamIcon sx={{ color: '#f3425f' }} />}
          sx={{
            color: '#65676b',
            textTransform: 'none',
            flex: 1,
            borderRadius: 0,
          }}
        >
          Live Video
        </Button>
        <Button
          startIcon={<PhotoLibraryIcon sx={{ color: '#45bd62' }} />}
          onClick={() => mediaInputRef.current.click()}
          sx={{
            color: '#65676b',
            textTransform: 'none',
            flex: 1,
            borderRadius: 0,
          }}
        >
          Photo/Video
        </Button>
        <Button
          startIcon={<InsertEmoticonIcon sx={{ color: '#f7b928' }} />}
          sx={{
            color: '#65676b',
            textTransform: 'none',
            flex: 1,
            borderRadius: 0,
            display: { xs: 'none', sm: 'flex' },
          }}
        >
          Feeling/Activity
        </Button>
      </Box>
    </Paper>
  );
}
