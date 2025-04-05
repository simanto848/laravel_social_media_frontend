// components/profile/ProfileTabs.jsx
import React from 'react';
import { Tabs, Tab } from '@mui/material';

const ProfileTabs = ({ activeTab, handleTabChange, tabs }) => {
  return (
    <Tabs
      value={activeTab}
      onChange={handleTabChange}
      aria-label="profile tabs"
      sx={{
        px: 2,
        '& .MuiTab-root': {
          textTransform: 'none',
          minWidth: 80,
          fontWeight: 'bold',
          mx: 1,
          fontSize: '0.95rem',
          color: '#65676b',
        },
        '& .Mui-selected': {
          color: '#1877f2',
        },
        '& .MuiTabs-indicator': {
          backgroundColor: '#1877f2',
          height: 3,
        },
      }}
    >
      {tabs.map((tab, index) => (
        <Tab key={index} label={tab.label} />
      ))}
    </Tabs>
  );
};

export default ProfileTabs;
