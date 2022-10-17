import * as React from 'react';
import Image from 'next/image';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Link  from 'next/link';

const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

 
  return (
    <AppBar position="fixed" sx={{ bgcolor: "white" }} className="d-print-none" >
      <Container maxWidth="xl" >
        <Toolbar disableGutters sx={{ pt: '10px', pb:"10px" }} className="menu-bar">
        <Image src='/disha-logo.png' alt="logo" className='logo' width={250} height={60} margin='auto'/>
          <Box sx={{display: { xs: 'flex', md: 'none' }}} className="menu-icon">
            <IconButton
              size="large"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
               <MenuItem  onClick={handleCloseNavMenu}>
               <Link href="/"><Button onClick={handleCloseNavMenu}>
                <a className='navbar_btn'>Home </a></Button></Link>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                <Link href='/library'><Button onClick={handleCloseNavMenu}>
                <a className='navbar_btn'>Library</a></Button></Link>
                </MenuItem>
                <MenuItem  onClick={handleCloseNavMenu}>
                <Link href='/academic_resources'><Button onClick={handleCloseNavMenu}>
                <a className='navbar_btn'>Academic Resources</a></Button></Link>
                </MenuItem>
                <MenuItem  onClick={handleCloseNavMenu}>
                <Link href='/research_docs' ><Button onClick={handleCloseNavMenu} >
                <a className='navbar_btn'>Research Docs</a></Button></Link>
                </MenuItem>
                <MenuItem  onClick={handleCloseNavMenu}>                
                <Link href='/ecertificates'><Button onClick={handleCloseNavMenu}>
                <a className='navbar_btn'>Certificate</a></Button></Link>
                </MenuItem>
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' },  justifyContent:'right' }}>
          <Link href="/"><Button onClick={handleCloseNavMenu} >
                <a className='navbar_btn'>Home </a></Button></Link>
          <Link href='/library'><Button onClick={handleCloseNavMenu}>
                <a className='navbar_btn'>Library</a></Button></Link>
          <Link href='/academic_resources'><Button onClick={handleCloseNavMenu}>
                <a className='navbar_btn'>Academic Resources</a></Button></Link>
          <Link href='/research_docs'><Button onClick={handleCloseNavMenu}>
                <a className='navbar_btn'>Research Docs</a></Button></Link>
          <Link href='/ecertificates'><Button onClick={handleCloseNavMenu}>
                <a className='navbar_btn'>Certificate</a></Button></Link>
          </Box>
          
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
