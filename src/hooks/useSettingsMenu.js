import { useState } from 'react';

export const useSettingsMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const openMenu = (event) => setAnchorEl(event.currentTarget);
  const closeMenu = () => setAnchorEl(null);

  return { anchorEl, openMenu, closeMenu };
};
