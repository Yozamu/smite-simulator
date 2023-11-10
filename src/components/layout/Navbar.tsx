import styled from '@emotion/styled';
import { AppBar, Box, Button, Toolbar } from '@mui/material';
import Link from 'next/link';
import { BaseProps } from '../../types/baseProps';

type NavbarProps = BaseProps & {};

const Navbar: React.FC<NavbarProps> = (props) => {
  return (
    <Box sx={{ flexGrow: 1 }} className={props.className}>
      <AppBar component="nav" className="navbar">
        <Toolbar>
          <img src="/smite-logo.png" alt="Smite" width={116} height={35} />
          <Link href="/">
            <Button>Home</Button>
          </Link>
          <Link href="/gods">
            <Button>Gods</Button>
          </Link>
          <Link href="/items">
            <Button>Items</Button>
          </Link>
          <a className="portfolio" href="https://www.fgoumot.com/" target="_blank" rel="noreferrer">
            Portfolio
          </a>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default styled(Navbar)`
  .navbar {
    background-color: #05111e;

    img {
      padding-right: 30px;
    }

    a {
      padding: 0 10px;
      text-decoration: none;
    }

    button {
      color: var(--white);
      &:hover {
        color: var(--secondary-color);
      }
    }

    .portfolio {
      color: white;
      position: absolute;
      top: 16px;
      right: 16px;
    }
  }
`;
