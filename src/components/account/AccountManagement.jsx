/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import profileService from '../../services/profileServices';

import {
  Paper,
  Typography,
  Box,
  Divider,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

const AccountManagement = ({ logout }) => {
  const navigate = useNavigate();
  const [openDeactivate, setOpenDeactivate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDeactivateAccount = async () => {
    setLoading(true);
    try {
      const response = await profileService.deactivateAccount();
      if (response.status) {
        toast.success('Account deactivated successfully');
        logout();
        navigate('/login');
      } else {
        toast.error(response.message || 'Failed to deactivate account');
      }
    } catch (error) {
      toast.error('An error occurred while deactivating account');
    } finally {
      setLoading(false);
      setOpenDeactivate(false);
    }
  };

  const handleDeleteAccount = async () => {
    setLoading(true);
    try {
      const response = await profileService.deleteAccount();
      if (response.status) {
        toast.success('Account deleted successfully');
        navigate('/login');
        logout();
      } else {
        toast.error(response.message || 'Failed to delete account');
      }
    } catch (error) {
      toast.error('An error occurred while deleting account');
    } finally {
      setLoading(false);
      setOpenDelete(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, bgcolor: '#fff8f8' }}>
      <Typography variant="h6" gutterBottom color="error">
        Account Management
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Box>
        <Typography variant="body2" gutterBottom>
          Deactivating your account will temporarily disable your profile. You
          can reactivate anytime by logging in.
        </Typography>
        <Button
          variant="outlined"
          color="warning"
          sx={{ mt: 1, mb: 2 }}
          onClick={() => setOpenDeactivate(true)}
        >
          Deactivate Account
        </Button>

        <Typography variant="body2" gutterBottom>
          Deleting your account is permanent. All your data will be removed and
          cannot be recovered.
        </Typography>
        <Button
          variant="outlined"
          color="error"
          sx={{ mt: 1 }}
          onClick={() => setOpenDelete(true)}
        >
          Delete Account Permanently
        </Button>
      </Box>

      {/* Deactivate Dialog */}
      <Dialog open={openDeactivate} onClose={() => setOpenDeactivate(false)}>
        <DialogTitle>Deactivate Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to deactivate your account? You can reactivate
            it later by logging in.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeactivate(false)} disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={handleDeactivateAccount}
            color="warning"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Deactivate'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
        <DialogTitle>Delete Account Permanently</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you absolutely sure you want to delete your account? This action
            cannot be undone and all your data will be permanently lost.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDelete(false)} disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={handleDeleteAccount}
            color="error"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Delete Permanently'}
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default AccountManagement;
