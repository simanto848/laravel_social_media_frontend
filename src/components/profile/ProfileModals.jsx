import React from 'react';
import { Dialog, DialogContent } from '@mui/material';
import ProfileEditModal from './ProfileEditModal';
import ProfileImageUpload from './ProfileImageUpload';

const ProfileModals = ({
  isOwnProfile,
  openEditModal,
  handleCloseEditModal,
  profileData,
  user,
  handleProfileUpdate,
  openImageUpload,
  handleCloseImageUpload,
  profilePicUrl,
}) => {
  return (
    <>
      {isOwnProfile && (
        <>
          <ProfileEditModal
            open={openEditModal}
            onClose={handleCloseEditModal}
            profileData={profileData.profile || {}}
            userData={user}
            onUpdate={handleProfileUpdate}
          />
          <Dialog
            open={openImageUpload}
            onClose={handleCloseImageUpload}
            maxWidth="sm"
            fullWidth
          >
            <DialogContent>
              <ProfileImageUpload currentImage={profilePicUrl} />
            </DialogContent>
          </Dialog>
        </>
      )}
    </>
  );
};

export default ProfileModals;
