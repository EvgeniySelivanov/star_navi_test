import * as React from 'react';
import { Stack } from '@mui/material';
const styles = {
  fontSize: '24px',
  color: 'white',
  padding: '0px 20px',
  backgroundColor: '#e25b45',
  width: 'calc(100% - 40px)',
  height: '70px',
  justifyContent: 'flex-end',
  flexDirection: 'row',
  alignItems: 'center',
  position:'fixed'
};
const Header = () => {
  return (
    <Stack sx={styles}>
      <strong>STAR</strong> NAVI
    </Stack>
  );
};
export default Header;
