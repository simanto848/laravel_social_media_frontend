import React, { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  ImageList,
  ImageListItem,
  IconButton,
  Card,
  CardMedia,
  CardActions,
  Tooltip,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import { toast } from 'react-hot-toast';
import profileImageService from '../../services/profileImageService';

export default function Photos({ profileImageUpdated }) {
  const [imageItems, setImageItems] = useState([]);

  useEffect(() => {
    fetchUserImages();
  }, []);

  const fetchUserImages = async () => {
    try {
      const response = await profileImageService.getAllImage();
      if (response.status) {
        const formattedImages = response.data.map((image) => ({
          ...image,
          img: `http://localhost:8000/storage/${image.path}`,
        }));
        setImageItems(formattedImages);
      }
    } catch (error) {
      toast.error(error.message || 'Something went wrong');
    }
  };

  const handleDeleteImage = async (imageId) => {
    try {
      const response = await profileImageService.deleteProfileImage(imageId);
      if (response.status) {
        toast.success(response.message || 'Image deleted successfully');
        fetchUserImages();
      } else {
        toast.error(response.message || 'Failed to delete image');
      }
    } catch (error) {
      toast.error(error.message || 'Something went wrong');
    }
  };

  const handleSetProfileImage = async (imageId) => {
    try {
      const response = await profileImageService.updateProfileImage(imageId);
      if (response.status) {
        toast.success(
          response.message || 'Profile picture updated successfully'
        );
        profileImageUpdated(); // Trigger the reload in Profile
        fetchUserImages(); // Refresh the photo list
      } else {
        toast.error(response.message || 'Failed to set profile picture');
      }
    } catch (error) {
      toast.error(error.message || 'Something went wrong');
    }
  };

  return (
    <Box sx={{ p: 3, bgcolor: '#f5f5f5', borderRadius: 2 }}>
      <Typography
        variant="h5"
        sx={{
          mb: 3,
          fontWeight: 'bold',
          color: '#1877f2',
          textAlign: 'center',
          textTransform: 'uppercase',
          letterSpacing: 1,
        }}
      >
        Your Photos
      </Typography>

      {imageItems.length > 0 ? (
        <ImageList
          sx={{
            width: 'full',
            height: 'auto',
            gap: 16,
          }}
          cols={3}
        >
          {imageItems.map((item) => (
            <ImageListItem
              key={item.id || item.img}
              sx={{
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                },
              }}
            >
              <Card
                sx={{
                  borderRadius: 2,
                  overflow: 'hidden',
                  position: 'relative',
                  bgcolor: '#fff',
                }}
              >
                <CardMedia
                  component="img"
                  height="164"
                  image={item.img}
                  alt="User photo"
                  sx={{
                    objectFit: 'cover',
                    filter: 'brightness(95%)',
                    transition: 'filter 0.3s ease',
                    '&:hover': { filter: 'brightness(100%)' },
                  }}
                />
                <CardActions
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    bgcolor: 'rgba(0, 0, 0, 0.6)',
                    borderRadius: '0 0 8px 0',
                    p: 1,
                  }}
                >
                  <Tooltip title="Set as Profile Picture">
                    <IconButton
                      size="small"
                      onClick={() => handleSetProfileImage(item.id)}
                      sx={{ color: '#fff', '&:hover': { color: '#1877f2' } }}
                    >
                      <PersonIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Image">
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteImage(item.id)}
                      sx={{ color: '#fff', '&:hover': { color: '#f44336' } }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </CardActions>
              </Card>
            </ImageListItem>
          ))}
        </ImageList>
      ) : (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 450,
            bgcolor: '#fff',
            borderRadius: 2,
            boxShadow: 1,
          }}
        >
          <Typography
            variant="body1"
            sx={{ color: '#65676b', fontStyle: 'italic' }}
          >
            No photos available yet. Upload some memories!
          </Typography>
        </Box>
      )}
    </Box>
  );
}
