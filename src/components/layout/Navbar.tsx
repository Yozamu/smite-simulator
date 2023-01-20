import { AppBar, Box, Toolbar } from '@mui/material';
import Link from 'next/link';

const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar component="nav">
        <Toolbar>
          <Link href="/">Accueil</Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
