import { AppBar, Box, Button, Toolbar } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Navbar.module.scss';

export interface INavbar {}

const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar component="nav" className={styles.container}>
        <Toolbar>
          <Image src="/smite-logo.png" alt="Smite" width={116} height={35} />
          <Link href="/">
            <Button>Home</Button>
          </Link>
          <Link href="/gods">
            <Button>Gods</Button>
          </Link>
          <Link href="/items">
            <Button>Items</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
