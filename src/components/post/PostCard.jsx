import React, { useState, useContext } from 'react';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Typography,
  CardMedia,
  IconButton,
  Button,
  Divider,
  TextField,
} from '@mui/material';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CloseIcon from '@mui/icons-material/Close';
import { AppContext } from '../../Context/AppContext';
import avatarImage from '../../assets/male_4.png';

export default function PostCard({ post }) {
  const { user } = useContext(AppContext);
  const [liked, setLiked] = useState(post.likedByUser);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');

  const toggleLike = () => {
    setLiked(!liked);
    setLikesCount(liked ? likesCount - 1 : likesCount + 1);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    console.log('New comment:', newComment);
    setNewComment('');
  };

  return (
    <Card sx={{ borderRadius: '8px', boxShadow: 1, overflow: 'visible' }}>
      <CardContent sx={{ p: 2 }}>
        {/* Post Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar
            src={post.author.avatar}
            alt={post.author.username}
            sx={{ mr: 1.5 }}
          />
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1" fontWeight="medium">
              {post.author.username}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              fontSize="0.8rem"
            >
              {new Date(post.createdAt).toLocaleString()}
            </Typography>
          </Box>
          <IconButton size="small">
            <MoreHorizIcon />
          </IconButton>
        </Box>

        {/* Post Content */}
        <Typography variant="body1" sx={{ mb: 2 }}>
          {post.content}
        </Typography>

        {/* Post Image */}
        {post.image && (
          <CardMedia
            component="img"
            image={post.image}
            alt="Post image"
            sx={{ borderRadius: '8px', mb: 2 }}
          />
        )}

        {/* Likes Info */}
        {likesCount > 0 && (
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
            <ThumbUpIcon
              sx={{
                fontSize: 14,
                color: 'white',
                bgcolor: '#1877f2',
                borderRadius: '50%',
                p: 0.3,
                mr: 0.5,
              }}
            />
            <Typography variant="body2" color="text.secondary">
              {likesCount}
            </Typography>
          </Box>
        )}

        <Divider sx={{ mt: 1, mb: 1 }} />

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            startIcon={
              liked ? (
                <ThumbUpIcon color="primary" />
              ) : (
                <ThumbUpAltOutlinedIcon />
              )
            }
            onClick={toggleLike}
            sx={{
              color: liked ? '#1877f2' : '#65676b',
              textTransform: 'none',
              flex: 1,
              borderRadius: 0,
            }}
          >
            Like
          </Button>
          <Button
            startIcon={<ChatBubbleOutlineOutlinedIcon />}
            onClick={() => setShowComments(!showComments)}
            sx={{
              color: '#65676b',
              textTransform: 'none',
              flex: 1,
              borderRadius: 0,
            }}
          >
            Comment
          </Button>
          <Button
            startIcon={<ShareOutlinedIcon />}
            sx={{
              color: '#65676b',
              textTransform: 'none',
              flex: 1,
              borderRadius: 0,
            }}
          >
            Share
          </Button>
        </Box>

        {/* Comments Section */}
        {showComments && (
          <Box sx={{ mt: 2 }}>
            <Divider sx={{ mb: 2 }} />

            {/* Comment List */}
            {post.comments.map((comment) => (
              <Box key={comment.id} sx={{ display: 'flex', mb: 2 }}>
                <Avatar
                  sx={{ width: 32, height: 32, mr: 1 }}
                  src={avatarImage} // Use a default avatar
                />
                <Box
                  sx={{
                    bgcolor: '#f0f2f5',
                    borderRadius: '18px',
                    px: 2,
                    py: 1,
                    maxWidth: '90%',
                  }}
                >
                  <Typography variant="subtitle2" fontWeight="bold">
                    {comment.author}
                  </Typography>
                  <Typography variant="body2">{comment.content}</Typography>
                </Box>
              </Box>
            ))}

            {/* New Comment Form */}
            <Box
              component="form"
              onSubmit={handleCommentSubmit}
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <Avatar
                sx={{ width: 32, height: 32, mr: 1 }}
                src={user?.profile_pic || avatarImage} // Use user's profile pic or default
              />
              <TextField
                placeholder="Write a comment..."
                fullWidth
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                variant="outlined"
                size="small"
                InputProps={{
                  sx: {
                    borderRadius: '20px',
                    bgcolor: '#f0f2f5',
                  },
                }}
              />
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
