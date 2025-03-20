import React, { useContext } from 'react';
import { AppContext } from '../Context/AppContext';
import { Container, Typography, CircularProgress, Box } from '@mui/material';

import AccountInfo from '../components/account/AccountInfo';
import PasswordUpdate from '../components/account/PasswordUpdate';
import AccountManagement from '../components/account/AccountManagement';

export default function Account() {
  const { user, logout } = useContext(AppContext);

  return (
    <Container maxWidth="md" sx={{ py: 4, mb: 8 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Account Settings
      </Typography>

      {!user ? (
        <Typography>Please log in to view account settings</Typography>
      ) : (
        <>
          <AccountInfo user={user} />
          <PasswordUpdate />
          <AccountManagement user={user} logout={logout} />
        </>
      )}
    </Container>
  );
}
